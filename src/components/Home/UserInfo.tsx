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
      <h3>Hola, {user.name}</h3>

      <Button href='/transactions'>Ver mi actividad</Button>

      <div>
        <Link onClick={() => logoutMutation.mutateAsync()}>Cerrar Sesión</Link>
      </div>
    </>
  );
}
