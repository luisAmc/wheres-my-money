import { gql, useMutation } from '@apollo/client';
import { useAuthRedirect } from '~/utils/useAuthRedirect';
import { Button } from '../ui/Button';
import { Link } from '../ui/Link';

type Props = {
  user: { name: string; email: string };
};

export function UserInfo({ user }: Props) {
  const authRedirect = useAuthRedirect();

  const [logout] = useMutation(
    gql`
      mutation UserInfoLogoutMutation {
        logout
      }
    `,
    {
      onCompleted() {
        authRedirect();
      }
    }
  );
  return (
    <>
      <h3 className='text-center'>
        Hola, <span className='font-semibold'>{user.name}</span>
      </h3>

      <Button href='/transactions'>Mis Transacciones</Button>

      <div>
        <Link onClick={() => logout()}>Cerrar Sesión</Link>
      </div>
    </>
  );
}
