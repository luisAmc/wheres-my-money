import * as Types from '../../../__generated__/schema.generated';

export type CreateTransactionFormVariables = Types.Exact<{
  input: Types.CreateTransactionInput;
}>;


export type CreateTransactionForm = (
  { __typename?: 'Mutation' }
  & { createTransaction: (
    { __typename?: 'Transaction' }
    & Pick<Types.Transaction, 'id' | 'type' | 'date' | 'amount' | 'category' | 'notes'>
  ) }
);
