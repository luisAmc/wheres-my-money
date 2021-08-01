import {
  Transaction,
  TransactionCategory,
  TransactionType
} from '@prisma/client';
import { db } from '~/utils/prisma';
import { builder } from '../builder';

export const TransactionObject = builder.objectRef<Transaction>('Transaction');

TransactionObject.implement({
  fields: (t) => ({
    id: t.exposeID('id', {}),
    type: t.exposeString('type', {}),
    date: t.expose('date', { type: 'DateTime' }),
    amount: t.exposeFloat('amount', {}),
    notes: t.exposeString('notes', {}),
    category: t.exposeString('category', {}),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' })
  })
});

builder.queryField('transactions', (t) =>
  t.field({
    type: [TransactionObject],
    resolve: (_root, _args, { user }) => {
      return db.transaction.findMany({
        where: { userId: user!.id },
        orderBy: { createdAt: 'desc' }
      });
    }
  })
);

const CreateTransactionInput = builder.inputType('CreateTransactionInput', {
  fields: (t) => ({
    type: t.string(),
    date: t.string(),
    amount: t.float({ validate: { positive: true } }),
    category: t.string(),
    notes: t.string()
  })
});

builder.mutationField('createTransaction', (t) =>
  t.field({
    type: TransactionObject,
    args: {
      input: t.arg({ type: CreateTransactionInput })
    },
    resolve: (_root, { input }, { user }) => {
      return db.transaction.create({
        data: {
          type: TransactionType[input.type],
          date: input.date,
          amount: input.amount,
          category: TransactionCategory[input.category],
          notes: input.notes,
          userId: user!.id
        }
      });
    }
  })
);
