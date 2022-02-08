import { AppProps } from 'next/app';
import { RelayEnvironmentProvider } from 'relay-hooks';
import { Layout } from '~/components/Layout';
import { NProgress } from '~/components/NProgress';
import { relayEnvironment } from '~/relayEnvironment';
import '../styles.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Layout>
        <NProgress />
        <Component {...pageProps} />
      </Layout>
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
