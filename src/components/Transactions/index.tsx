import { useState } from 'react';
import { useQuery } from 'react-query';
import { TransactionType } from '~/models/Transaction';
import { getTransactions } from '~/resolvers/TransactionResolver';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { DateRangePicker } from '../ui/DateRangePicker';
import { Empty } from '../ui/Empty';
import { Loading } from '../ui/Loading';
import { PageHeader } from '../ui/PageHeader';
import { TransactionItem } from '../ui/TransactionItem';
import { Resume } from './Resume';

export function Activity() {
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const { data, isLoading } = useQuery(['transactions', dateRange], () =>
    getTransactions(dateRange)
  );

  return (
    <>
      <PageHeader href='/'>Inicio</PageHeader>

      <Container title='Transacciones'>
        <div className='flex flex-col space-y-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-1'>
            <Button color='income' href='/transactions/new/income'>
              Ingreso
            </Button>
            <Button color='expense' href='/transactions/new/expense'>
              Egreso
            </Button>
          </div>

          <DateRangePicker
            onChange={(range) =>
              setDateRange({
                start: range.start,
                end: range.end
              })
            }
          />

          {data && <Resume incomes={data?.incomes} expenses={data?.expenses} />}
        </div>
      </Container>

      <Container>
        {isLoading && <Loading />}

        {data &&
          (data.transactions?.length === 0 ? (
            <Empty />
          ) : (
            <div className='bg-white rounded-md flex flex-col space-y-4'>
              <div className='font-medium text-lg'>
                Transacciones del periodo
              </div>

              <ul
                className='rounded-md border overflow-hidden mt-5 divide-y divide-gray-200 sm:mt-0'
                role='list'
              >
                {data.transactions?.map((transaction: TransactionType) => (
                  <TransactionItem
                    key={`${transaction._id}`}
                    type={transaction.type}
                    category={transaction.category}
                    notes={transaction.notes}
                    amount={transaction.amount}
                    date={transaction.date}
                  />
                ))}
              </ul>
            </div>
          ))}
      </Container>
    </>
  );
}
