import {
  Button,
  Flex,
  FormLabel,
  Input,
  LinkBox,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { fetch_admin_data } from '../../api';
import { Link } from 'react-router-dom';

const AdminLogin = ({ setIsLogged }) => {
  const toast = useToast();

  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    localStorage.setItem('admin', password);
    const res = await fetch_admin_data('students');
    if (res.error) {
      localStorage.removeItem('admin');
      return toast({
        title: 'Error.',
        description: res.error?.msg || res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsLogged(true);
  };

  return (
    <Flex
      className="raleway"
      bg={'gray.100'}
      direction={'column'}
      align={'center'}
      justify={'center'}
      w={'100vw'}
      h={'100vh'}
      gap={'10px'}
    >
      <FormLabel htmlFor="adminpass" fontWeight={'bold'}>
        Admin Password:
      </FormLabel>
      <Input
        onChange={e => setPassword(e.target.value)}
        value={password}
        id="adminpass"
        borderColor={'gray'}
        w={'300px'}
        type="text"
        placeholder="Enter Password here"
      />
      <Button onClick={handleLogin} colorScheme="blue">
        Submit
      </Button>
      <LinkBox textDecoration={'underline'}>
        <Link to={'/'}>Home</Link>
      </LinkBox>
    </Flex>
  );
};

export default AdminLogin;
