import mongoose from 'mongoose';

export interface UserType {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  hashedPassword?: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: Buffer }
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<UserType>('User', UserSchema);
