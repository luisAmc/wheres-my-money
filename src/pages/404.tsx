import { Link } from '~/components/ui/Link';
import { MoonIcon } from '@heroicons/react/outline'

export default function Custom404() {
  return (
    <div className='sm:mt-8 w-full sm:max-w-lg mx-auto sm:rounded-lg shadow-lg bg-white p-6'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>
          Página no encontrada
        </h1>

        <MoonIcon className='w-12 h-12 gray-500 my-4' />
        <div className='mb-2'>No se encontró la página buscada...</div>
        <Link href='/'>Ir al Inicio</Link>
      </div>
    </div>
  );
}
