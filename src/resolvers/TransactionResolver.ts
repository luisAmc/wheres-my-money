import axios from '~/utils/axios';

export enum TRANSACTION_TYPE {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export enum EXPENSE_CATEGORY {
  FOOD = 'food',
  ENTERTAINMENT = 'entertainment',
  CAR = 'car',
  HOME = 'home',
  CARD = 'card',
  OTHER = 'other'
}

export enum INCOME_CATEGORY {
  PAYMENT = 'payment',
  OTHER = 'other'
}

export type TransactionInput = {
  type: TRANSACTION_TYPE;
  date: Date;
  amount: number;
  category: INCOME_CATEGORY | EXPENSE_CATEGORY;
  notes?: string;
};

export async function createTransaction(input: TransactionInput) {
  return await axios.post('/transactions', input);
}

export async function getTransactions() {
  const response = await axios.get('/transactions');
  return response.data;
}
