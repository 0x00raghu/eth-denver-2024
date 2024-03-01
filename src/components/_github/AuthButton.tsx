import { useSession, signIn, signOut } from 'next-auth/react';
import { Avatar, Button, Wrap, useDisclosure } from '@chakra-ui/react';

export function AuthButton() {
  const { data: session }: any = useSession();

  if (session) {
    return (
      <>
        <Wrap spacing={4}>
          <Avatar name="Dan Abrahmov" src={session?.user?.image} />
          {session?.user?.name} <br />
          <Button onClick={() => signOut()} colorScheme="teal" variant="outline">
            Sign out
          </Button>
        </Wrap>
      </>
    );
  }
  return (
    <>
      <Wrap spacing={4}>
        {/* Not signed in? */}
        <Button onClick={() => signIn()} backgroundColor={'black'} color={'white'}>
          Connect Github
        </Button>
      </Wrap>
    </>
  );
}
