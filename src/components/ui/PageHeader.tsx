import { ChevronLeftIcon } from '@heroicons/react/outline';
import { ReactNode } from 'react';
import { Link } from './Link';

type Props = {
  href?: string;
  children: ReactNode;
};

export function PageHeader({ href, children }: Props) {
  return (
    <div className='sm:max-w-2xl mx-auto flex items-center space-x-4'>
      {href && (
        <Link href={href}>
          <button className='ml-auto w-8 h-8 rounded-full flex items-center justify-center hover:bg-brand-500 transition ease-in-out'>
            <ChevronLeftIcon className='w-6 h-6 text-gray-100' />
          </button>
        </Link>
      )}

      <div className='text-gray-100 text-2xl font-medium'>{children}</div>
    </div>
  );
}
