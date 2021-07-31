import expense from '~/pages/transactions/new/expense';
import { formatAmount } from '~/utils/transforms';
import { Doughnut } from '../ui/Doughnut';

type TransactionProps = {
  total: number;
  byCategory: [string, number][];
};

type Props = {
  incomes: TransactionProps;
  expenses: TransactionProps;
};

export function Resume({ incomes, expenses }: Props) {
  return (
    <div className='flex flex-col space-y-6'>
      <div className='flex flex-col items-center justify-center'>
        <span>Balance del periodo</span>
        <span className='text-xl font-semibold text-gray-900'>
          L. {formatAmount(incomes.total - expenses.total)}
        </span>
      </div>

      <div className='flex flex-col space-y-4 border rounded-md p-4'>
        <div>
          <div className='font-medium text-lg'>Ingresos por Categoría</div>
          <div className='flex itemx-center space-x-2 text-gray-500'>
            <span>En el periodo has recibido</span>
            <span className='font-semibold text-gray-900'>
              L. {formatAmount(incomes.total)}
            </span>
          </div>
        </div>

        {incomes.byCategory.length > 0 && (
          <div className='mx-auto w-64'>
            <Doughnut data={incomes.byCategory} />
          </div>
        )}
      </div>

      <div className='flex flex-col space-y-4 border rounded-md p-4'>
        <div>
          <div className='font-medium text-lg'>Gastos por Categoría</div>
          <div className='flex itemx-center space-x-2 text-gray-500'>
            <span>En el periodo has gastado</span>
            <span className='font-semibold text-gray-900'>
              L. {formatAmount(expenses.total)}
            </span>
          </div>
        </div>

        {expenses.byCategory.length > 0 && (
          <div className='mx-auto w-64'>
            <Doughnut data={expenses.byCategory} />
          </div>
        )}
      </div>
    </div>
  );
}
