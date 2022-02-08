import { graphql } from 'relay-hooks';
import { Button } from '../shared/Button';
import { Container } from '../shared/Container';
import { HomeQueryResponse } from './__generated__/HomeQuery.graphql';

export const query = graphql`
  query HomeQuery {
    me {
      username
      transactions {
        id
        date
        amount
        notes
        type
        category
      }
    }
  }
`;

interface Props {
  data: HomeQueryResponse;
}

export function Home({ data }: Props) {
  return (
    <Container>
      <div className='space-y-6'>
        <div className='text-3xl font-bold italic text-center'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 px-1'>
            Where's my money?
          </span>
        </div>

        <Button color='income' href='/transactions/new/income'>
          Nuevo Ingreso
        </Button>

        <div className='flex flex-col space-y-3'>
          {data.me?.transactions.map((transaction) => (
            <div key={transaction.id} className='p-4 bg-teal-100 rounded-lg'>
              <p>{transaction.date}</p>
              <p>{transaction.amount}</p>
              <p>{transaction.notes}</p>
              <p>{transaction.type}</p>
              <p>{transaction.category}</p>
            </div>
          ))}
        </div>

        {/* {data && data.me ? <UserInfo user={data?.me} /> : <SignedOut />} */}
      </div>
    </Container>
  );
}
