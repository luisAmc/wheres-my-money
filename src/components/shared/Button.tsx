import clsx from 'clsx';
import { ButtonOrLink, Props as ButtonOrLinkProps } from './ButtonOrLink';

export interface Props extends ButtonOrLinkProps {
  color?: 'primary' | 'secondary' | 'income' | 'expense';
  variant?: 'default' | 'outlined';
}

export function Button({
  color = 'primary',
  variant = 'default',
  ...props
}: Props) {
  return (
    <ButtonOrLink
      className={clsx(
        'flex items-center justify-center px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-white focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80',
        variant === 'default' && {
          'bg-brand-500 text-white': color === 'primary',
          'bg-gray-200 text-gray-900 focus:ring-gray-500':
            color === 'secondary',
          'bg-teal-200 text-teal-900 focus:ring-teal-500': color === 'income',
          'bg-rose-200 text-rose-900 focus:ring-rose-500': color === 'expense'
        },
        variant === 'outlined' && 'hover:bg-opacity-10',
        variant === 'outlined' && {
          'border border-brand-600 text-brand-900 hover:bg-brand-500':
            color === 'primary',
          'border border-gray-500 text-gray-500 hover:bg-gray-500':
            color === 'secondary'
        }
      )}
      {...props}
    />
  );
}
