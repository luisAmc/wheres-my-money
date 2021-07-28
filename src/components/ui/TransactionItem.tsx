import { CurrencyDollarIcon } from '@heroicons/react/outline';

interface Props {
  type: string;
  name: string;
  notes?: string;
  amount: number;
}

export function TransactionItem({ type, name, notes, amount }: Props) {
  return (
    <li>
      <div className='flex p-4 hover:bg-gray-100'>
        <div className='flex-1 flex items-center space-x-2'>
          <CurrencyDollarIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-green-500' />

          <div>
            <span>{name}</span>
            <div className='text-gray-500'>{notes}</div>
          </div>
        </div>

        <div className='flex items-center justify-center'>{amount}</div>
      </div>
    </li>
  );
}
