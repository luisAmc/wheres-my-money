import { SparklesIcon } from '@heroicons/react/outline';

export function Empty() {
  return (
    <div className='flex flex-col justify-center items-center space-y-2 text-gray-500 my-12'>
      <SparklesIcon className='h-12 w-12' />
      <div className='font-semibold'>No hay nada aquí todavía.</div>
    </div>
  );
}
