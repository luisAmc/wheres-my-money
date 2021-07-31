import { TrendingDownIcon, TrendingUpIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { formatAmount, formatDate } from '~/utils/transforms';

type Type = 'income' | 'expense';

type Category =
  | 'payment'
  | 'food'
  | 'entertainment'
  | 'car'
  | 'home'
  | 'card'
  | 'other';

interface Props {
  type: Type;
  category: Category;
  notes?: string;
  amount: number;
  date: Date;
}

export function getCategoryTagLabel(category: Category) {
  switch (category) {
    case 'payment':
      return 'Pago';
    case 'food':
      return 'Comida';
    case 'entertainment':
      return 'Entretenimiento';
    case 'car':
      return 'Carro';
    case 'home':
      return 'Casa';
    case 'card':
      return 'Tarjeta';
    case 'other':
      return 'Otro';
  }
}

function CategoryTag({ category }: { category: Category }) {
  return (
    <span
      className={clsx(
        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
        {
          'bg-teal-100 text-teal-800': category === 'payment',
          'bg-yellow-100 text-yellow-800': category === 'food',
          'bg-purple-100 text-purple-800': category === 'entertainment',
          'bg-rose-100 text-rose-800': category === 'car',
          'bg-blue-100 text-blue-800': category === 'home',
          'bg-cyan-100 text-cyan-800': category === 'card',
          'bg-gray-100 text-gray-800': category === 'other'
        }
      )}
    >
      {getCategoryTagLabel(category)}
    </span>
  );
}

export function TransactionItem({
  type,
  category,
  notes,
  amount,
  date
}: Props) {
  return (
    <li>
      <div className='flex p-4 hover:bg-gray-100'>
        <div className='flex-1 flex items-center space-x-2'>
          {type === 'income' ? (
            <TrendingUpIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-teal-500' />
          ) : (
            <TrendingDownIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-rose-500' />
          )}

          <div>
            <CategoryTag category={category} />
            {notes && <div className='text-gray-500'>{notes}</div>}
            <div className='text-sm text-gray-400'>{formatDate(date)}</div>
          </div>
        </div>

        <div className='flex items-center justify-center ml-2'>
          {formatAmount(amount)}
        </div>
      </div>
    </li>
  );
}
