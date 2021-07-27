import { IncomingMessage } from 'http';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next';
import {
  applySession,
  Session,
  SessionOptions,
  withIronSession
} from 'next-iron-session';
import SessionModel, { SessionType } from '~/models/Session';
import { UserType } from '~/models/User';

if (!process.env.COOKIE_SECRET) {
  console.warn(
    'No `COOKIE_SECRET`environment variable was set. This can cause production errors.'
  );
}

// The duration that the session will be valid for, one day in milliseconds
// We will automatically renew these sessions after 25% of the validity period.
const SESSION_TTL = 1 * 24 * 3600 * 1000;

// The key that we store the actual database ID of the session in:
export const IRON_SESSION_ID_KEY = 'sessionID';

export type NextIronRequest = NextApiRequest & { session: Session };

export type NextIronHandler = (
  req: NextIronRequest,
  res: NextApiResponse
) => void | Promise<void>;

const sessionOptions: SessionOptions = {
  password: [{ id: 1, password: process.env.COOKIE_SECRET as string }],
  cookieName: 'session.info',
  ttl: SESSION_TTL,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: true
  }
};

const withSession = (handler: NextIronHandler) =>
  withIronSession(handler, sessionOptions);

export default withSession;

export async function createSession(req: NextIronRequest, user: UserType) {
  const session = new SessionModel({
    user: user._id,
    expiresAt: Date.now() + SESSION_TTL
  });

  await session.save();

  req.session.set(IRON_SESSION_ID_KEY, session.id);
  await req.session.save();

  return session;
}

export async function removeSession(req: IncomingMessage) {
  const ironReq = req as unknown as NextIronRequest;

  const sessionID = ironReq.session.get(IRON_SESSION_ID_KEY);

  await SessionModel.deleteOne({ _id: sessionID });

  ironReq.session.destroy();
}

const sessionCache = new WeakMap<IncomingMessage, SessionType | null>();
export async function resolveSession({
  req,
  res
}: Pick<GetServerSidePropsContext, 'req' | 'res'>) {
  if (sessionCache.has(req)) {
    return sessionCache.get(req);
  }

  await applySession(req, res, sessionOptions);

  let session: SessionType | null = null;

  const ironReq = req as unknown as NextIronRequest;
  const sessionID = ironReq.session.get(IRON_SESSION_ID_KEY);

  if (sessionID) {
    session = await SessionModel.findOne({ _id: sessionID }).populate(
      'user',
      'name email'
    );

    if (session) {
      const shouldRefreshSession =
        Date.now() - session.expiresAt.getTime() < 0.75 * SESSION_TTL;

      if (shouldRefreshSession) {
        await SessionModel.updateOne(
          { _id: session._id },
          { expiresAt: new Date(Date.now() + SESSION_TTL) }
        );

        await ironReq.session.save();
      }
    }
  }

  sessionCache.set(req, session);

  return session;
}
