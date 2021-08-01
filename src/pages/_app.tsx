import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import { Layout } from '~/components/Layout';
import { NProgress } from '~/components/NProgress';
import { useApollo } from '~/utils/apollo';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialClientState);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <NProgress />
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
