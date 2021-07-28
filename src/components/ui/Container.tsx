import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  size?: 'lg' | 'xl' | '2xl' | '3xl';
}

export function Container({ title, action, children, size = '2xl' }: Props) {
  return (
    <div
      className={clsx(
        'sm:mt-8 w-full mx-auto sm:rounded-xl shadow-lg bg-white dark:bg-gray-800 p-6',
        {
          'sm:max-w-lg': size === 'lg',
          'sm:max-w-xl': size === 'xl',
          'sm:max-w-2xl': size === '2xl',
          'sm:max-w-3xl': size === '3xl'
        }
      )}
    >
      {(title || action) && (
        <div className='flex items-center justify-between mb-4'>
          {title && (
            <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
              {title}
            </h1>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
