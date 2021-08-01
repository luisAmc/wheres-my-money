import * as Types from '../../../__generated__/schema.generated';

export type TransactionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: Array<(
    { __typename?: 'Transaction' }
    & Pick<Types.Transaction, 'id' | 'type' | 'date' | 'amount' | 'category' | 'notes'>
  )> }
);
