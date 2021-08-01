import { GetServerSideProps } from 'next';
import { preloadQuery } from '~/utils/apollo';
import { Transactions, query } from '~/components/Transactions';

export const getServerSideProps: GetServerSideProps = (ctx) =>
  preloadQuery(ctx, { query });

export default Transactions;
