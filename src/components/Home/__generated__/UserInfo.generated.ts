import * as Types from '../../../__generated__/schema.generated';

export type UserInfoLogoutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UserInfoLogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'logout'>
);
