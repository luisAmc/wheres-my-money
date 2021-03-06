import mongoose from 'mongoose';
import User, { UserType } from './User';

export interface SessionType {
  _id: mongoose.Types.ObjectId;
  expiresAt: Date;
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    expiresAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User }
  },
  { timestamps: true }
);

export default mongoose.models.Session ||
  mongoose.model<SessionType>('Session', SessionSchema);
