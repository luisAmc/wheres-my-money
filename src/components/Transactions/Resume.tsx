import {
  EXPENSE_CATEGORY,
  INCOME_CATEGORY
} from '~/resolvers/TransactionResolver';
import { formatAmount } from '~/utils/transforms';

type Props = {
  incomes: number;
  expenses: number;
};

export function Resume({ incomes, expenses }: Props) {
  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex flex-col space-y-4 border rounded-md p-4'>
        <div>
          <div className='font-medium text-lg'>Ingresos por Categoría</div>
          <div className='text-gray-500'>
            En el periodo has recibido L. {formatAmount(incomes)}
          </div>
        </div>

        {/* Bar */}
        <div className='flex items-center'>
          <div className='h-6 w-[30%] bg-green-300 rounded-l-full'></div>
          <div className='h-6 w-[70%] bg-green-500 rounded-r-full'></div>
        </div>

        <div className='grid grid-cols-2 gap-1 p-4'>
          {Object.values(INCOME_CATEGORY).map((incomeCategory) => (
            <div key={incomeCategory} className='flex space-x-1'>
              <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
              <span>{incomeCategory}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col space-y-4 border rounded-md p-4'>
        <div>
          <div className='font-medium text-lg'>Gastos por Categoría</div>
          <div className='text-gray-500'>
            En el periodo has gastado L. {formatAmount(expenses)}
          </div>
        </div>

        {/* Doughnut */}
        <div className='flex items-center justify-center'>
          <div className='flex items-center justify-center h-48 w-48 rounded-full bg-red-300'>
            <div className='flex h-32 w-32 rounded-full bg-white items-center justify-center'>
              <span className='flex flex-col'>
                <span className='text-center text-sm font-semibold'>
                  Este periodo
                </span>
                <span className='text-center text-xl font-semibold'>
                  L. {formatAmount(expenses)}
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-1 p-4'>
          {Object.values(EXPENSE_CATEGORY).map((expenseCategory) => (
            <div key={expenseCategory} className='flex space-x-1'>
              <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
              <span>{expenseCategory}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
