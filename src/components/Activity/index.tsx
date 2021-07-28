import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { PageHeader } from '../ui/PageHeader';
import { TransactionItem } from '../ui/TransactionItem';

export function Activity() {
  return (
    <>
      <PageHeader href='/'>Actividad</PageHeader>

      <Container title='Actividad'>
        <div className='flex flex-col space-y-6'>
          <Button href='/activity/resume'>Mes actual</Button>

          <div className='bg-white rounded-md'>
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
        </div>
      </Container>
    </>
  );
}
