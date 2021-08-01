import { Session, User } from '@prisma/client';
import { IncomingMessage } from 'http';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse
} from 'next';
import {
  applySession,
  Session as IronSession,
  SessionOptions,
  withIronSession
} from 'next-iron-session';
import { db } from './prisma';

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

export type NextIronRequest = NextApiRequest & { session: IronSession };

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

export async function createSession(req: NextIronRequest, user: User) {
  const session = await db.session.create({
    data: { userId: user.id, expiresAt: new Date(Date.now() + SESSION_TTL) }
  });

  req.session.set(IRON_SESSION_ID_KEY, session.id);
  await req.session.save();

  return session;
}

export async function removeSession(req: IncomingMessage, session: Session) {
  const ironReq = req as unknown as NextIronRequest;

  await db.session.delete({ where: { id: session.id } });

  ironReq.session.destroy();
}

interface PrismaSession extends Session {
  user: User;
}

const sessionCache = new WeakMap<IncomingMessage, PrismaSession | null>();
export async function resolveSession({
  req,
  res
}: Pick<GetServerSidePropsContext, 'req' | 'res'>) {
  if (sessionCache.has(req)) {
    return sessionCache.get(req);
  }

  await applySession(req, res, sessionOptions);

  let session: PrismaSession | null = null;

  const ironReq = req as unknown as NextIronRequest;
  const sessionID = ironReq.session.get(IRON_SESSION_ID_KEY);

  if (sessionID) {
    session = await db.session.findFirst({
      where: {
        id: sessionID,
        expiresAt: {
          gte: new Date()
        }
      },
      include: {
        user: true
      }
    });

    if (session) {
      const shouldRefreshSession =
        Date.now() - session.expiresAt.getTime() < 0.75 * SESSION_TTL;

      if (shouldRefreshSession) {
        await db.session.update({
          where: { id: session.id },
          data: {
            expiresAt: new Date(Date.now() + SESSION_TTL)
          }
        });

        await ironReq.session.save();
      }
    }
  }

  sessionCache.set(req, session);

  return session;
}
