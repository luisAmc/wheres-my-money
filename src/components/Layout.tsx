import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className='w-full mx-auto min-h-screen bg-brand-100 overflow-hidden'>
      <div className='bg-brand-400 w-full h-44'></div>

      <div className='relative -mt-44 sm:px-12 sm:p-8'>{children}</div>
    </div>
  );
}
