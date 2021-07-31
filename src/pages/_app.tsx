import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Layout } from '~/components/Layout';
import { NProgress } from '~/components/NProgress';
import '../styles.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <NProgress />
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
