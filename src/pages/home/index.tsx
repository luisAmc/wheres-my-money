import { GetServerSideProps } from 'next';
import { useQuery } from 'relay-hooks';
import { Home, query } from '~/components/Home';
import { HomeQuery } from '~/components/Home/__generated__/HomeQuery.graphql';
import { authenticatedRoute } from '~/utils/redirects';

export const getServerSideProps: GetServerSideProps = authenticatedRoute;

export default function HomePage() {
  const { data, isLoading } = useQuery<HomeQuery>(query);

  if (isLoading || !data) {
    return <p>Cargando...</p>;
  }

  return <Home data={data} />;
}
