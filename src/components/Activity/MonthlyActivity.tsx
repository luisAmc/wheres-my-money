import { Container } from '../ui/Container';
import { PageHeader } from '../ui/PageHeader';
import { TransactionItem } from '../ui/TransactionItem';
import { Resume } from './Resume';

export function Activity() {
  return (
    <>
      <PageHeader href='/activity'>Mes Actual</PageHeader>

      <Resume />

      <Container>
        <div className='flex flex-col space-y-4'>
          <h3 className='text-lg font-medium'>Transacciones</h3>

          <ul
            className='rounded-md border overflow-hidden mt-5 divide-y divide-gray-200 sm:mt-0'
            role='list'
          >
            <TransactionItem
              type='expense'
              name='gasto a'
              notes='notas a'
              amount={100}
            />
            <TransactionItem
              type='expense'
              name='gasto a'
              notes='notas a'
              amount={100}
            />
            <TransactionItem
              type='expense'
              name='gasto a'
              notes='notas a'
              amount={100}
            />
          </ul>
        </div>
      </Container>
    </>
  );
}
