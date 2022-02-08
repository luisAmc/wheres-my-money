import { Button } from '../shared/Button';

export function SignedOut() {
  return (
    <div className='mt-4 grid grid-cols-2 gap-4'>
      <Button href='/auth/login' color='secondary'>
        Iniciar Sesión
      </Button>

      <Button href='/auth/signup' color='secondary'>
        Crear Usuario
      </Button>
    </div>
  );
}
