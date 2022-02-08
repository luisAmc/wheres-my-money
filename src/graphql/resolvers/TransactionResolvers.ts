import { TransactionCategory, TransactionType } from '@prisma/client';
import { db } from '~/utils/prisma';
import { builder } from '../builder';

builder.prismaObject('Transaction', {
  findUnique: (transaction) => ({ id: transaction.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    date: t.expose('date', { type: 'DateTime' }),
    amount: t.exposeFloat('amount'),
    notes: t.exposeString('notes', { nullable: true }),
    type: t.exposeString('type'),
    category: t.exposeString('category')
  })
});

const NewTransactionInput = builder.inputType('NewTransactionInput', {
  fields: (t) => ({
    date: t.field({ type: 'DateTime' }),
    amount: t.float(),
    notes: t.string(),
    type: t.string(),
    category: t.string()
  })
});

builder.mutationField('newTransaction', (t) =>
  t.prismaField({
    type: 'Transaction',
    args: { input: t.arg({ type: NewTransactionInput }) },
    resolve: async (query, _parent, { input }, { session }) => {
      return db.transaction.create({
        ...query,
        data: {
          date: input.date,
          amount: input.amount,
          notes: input.notes,
          type: TransactionType[input.type as keyof typeof TransactionType],
          category:
            TransactionCategory[
              input.category as keyof typeof TransactionCategory
            ],
          userId: session!.userId
        }
      });
    }
  })
);
