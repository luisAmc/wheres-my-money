import { GetServerSidePropsContext } from 'next';
import { resolveSession } from '~/utils/sessions';

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await resolveSession(ctx);

  if (session) {
    return {
      props: {
        data: {
          me: {
            name: session.user.name,
            email: session.user.email
          }
        }
      }
    };
  }

  return { props: {} };
}

export { Home as default } from '~/components/Home';
