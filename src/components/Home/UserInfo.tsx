import { useMutation } from 'react-query';
import { logout } from '~/resolvers/AuthResolver';
import { useAuthRedirect } from '~/utils/useAuthRedirect';
import { Resume } from '../Transactions/Resume';
import { Button } from '../ui/Button';
import { Link } from '../ui/Link';

type Props = {
  user: { name: string; email: string };
};

export function UserInfo({ user }: Props) {
  const authRedirect = useAuthRedirect();

  const logoutMutation = useMutation(() => logout(), {
    onSuccess: () => {
      authRedirect();
    }
  });

  return (
    <>
      <h3 className='text-center'>
        Hola, <span className='font-semibold'>{user.name}</span>
      </h3>

      <Button href='/transactions'>Mis Transacciones</Button>

      <div>
        <Link onClick={() => logoutMutation.mutateAsync()}>Cerrar Sesión</Link>
      </div>
    </>
  );
}
