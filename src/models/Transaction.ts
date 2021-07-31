import mongoose from 'mongoose';
import User, { UserType } from './User';

enum TYPE {
  INCOME = 'income',
  EXPENSE = 'expense'
}

enum EXPENSE_CATEGORY {
  FOOD = 'food',
  ENTERTAINMENT = 'entertainment',
  CAR = 'car',
  HOME = 'home',
  CARD = 'card',
  OTHER = 'other'
}

enum INCOME_CATEGORY {
  PAYMENT = 'payment',
  OTHER = 'other'
}

export interface TransactionType {
  _id: mongoose.Types.ObjectId;
  id: string;
  type: TYPE;
  date: Date;
  amount: number;
  category: INCOME_CATEGORY | EXPENSE_CATEGORY;
  notes?: string;
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: TYPE, required: true },
    date: { type: Date, default: Date.now },
    amount: { type: Number, default: 0 },
    category: {
      type: String,
      enum: [
        ...Object.values(INCOME_CATEGORY),
        ...Object.values(EXPENSE_CATEGORY)
      ],
      required: true
    },
    notes: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User }
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model<TransactionType>('Transaction', TransactionSchema);
