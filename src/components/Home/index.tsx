import { Container } from '../ui/Container';
import { SignedOut } from './SignedOut';
import { UserInfo } from './UserInfo';

export function Home({ data }) {
  return (
    <Container>
      <div className='space-y-6'>
        <div className='text-3xl font-bold italic text-center'>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 px-1'>
            Where's my money?
          </span>
        </div>

        {data && data.me ? <UserInfo user={data?.me} /> : <SignedOut />}
      </div>
    </Container>
  );
}
