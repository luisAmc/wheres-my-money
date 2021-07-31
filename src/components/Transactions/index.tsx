import { useQuery } from 'react-query';
import { TransactionType } from '~/models/Transaction';
import { getTransactions } from '~/resolvers/TransactionResolver';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Empty } from '../ui/Empty';
import { PageHeader } from '../ui/PageHeader';
import { TransactionItem } from '../ui/TransactionItem';

export function Activity() {
  const { data } = useQuery('transactions', () =>
    getTransactions()
  );

  return (
    <>
      <PageHeader href='/'>Inicio</PageHeader>

      <Container title='Transacciones'>
        <div className='flex flex-col space-y-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-1'>
            <Button variant='income' href='/transactions/new/income'>
              Ingreso
            </Button>
            <Button variant='expense' color='' href='/transactions/new/expense'>
              Egreso
            </Button>
          </div>

          {data &&
            (data.length === 0 ? (
              <Empty />
            ) : (
              <div className='bg-white rounded-md'>
                <ul
                  className='rounded-md border overflow-hidden mt-5 divide-y divide-gray-200 sm:mt-0'
                  role='list'
                >
                  {data.map((transaction: TransactionType) => (
                    <TransactionItem
                      key={`${transaction._id}`}
                      type={transaction.type}
                      category={transaction.category}
                      notes={transaction.notes}
                      amount={transaction.amount}
                    />
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </Container>
    </>
  );
}
