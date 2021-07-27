import { Button } from '../ui/Button';

export function SignedOut() {
  return (
    <div className='mt-4 grid grid-cols-2 gap-4'>
      <Button href='/auth/login' variant='secondary'>
        Iniciar Sesión
      </Button>

      <Button href='/auth/signup' variant='secondary'>
        Crear Usuario
      </Button>
    </div>
  );
}
