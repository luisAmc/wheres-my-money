import { IncomingMessage, OutgoingMessage } from 'http';

export interface Context {
  req: IncomingMessage;
  res: OutgoingMessage;
  user?: User | null;
  session?: Session | null;
}
