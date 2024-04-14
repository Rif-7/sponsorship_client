'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Skeleton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, Navigate } from 'react-router-dom';
import { login_student } from '../../api';

export default function LoginStudent({ handleAuth, user }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const res = await login_student(email, password);
    if (res.error) {
      setError(res.error);
    } else {
      localStorage.setItem('token', res.token);
      localStorage.setItem('accountType', 'student');
      await handleAuth();
    }
    setIsLoading(false);
  };

  if (user?.email) {
    return <Navigate replace to={'/'} />;
  }

  return (
    <form onSubmit={onSubmit}>
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
        <Stack spacing={8} w={'100%'} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading
              fontSize={'4xl'}
              textAlign={'center'}
              fontFamily={'monospace'}
            >
              Student Login.
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'white'}
            boxShadow={'lg'}
            p={8}
            position={'relative'}
          >
            <Button
              zIndex={2}
              position={'absolute'}
              rounded={'full'}
              width={'70px'}
              height={'70px'}
              top={'-15px'}
              shadow={'-3px 3px 3px gray'}
              right={'-20px'}
              fontFamily={'monospace'}
              colorScheme={'blue'}
              textDecoration={'underline'}
            >
              <Link to={'/'}>Home</Link>
            </Button>
            <Stack spacing={4}>
              {error ? (
                <Alert status="error" borderRadius={'md'}>
                  <AlertIcon />
                  {error}
                </Alert>
              ) : null}
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={updateEmail}
                  required={true}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={updatePassword}
                    required={true}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword(showPassword => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Skeleton isLoaded={!isLoading}>
                <Stack spacing={10} pt={2}>
                  <Button
                    onClick={onSubmit}
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Login
                  </Button>
                </Stack>
              </Skeleton>
              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have an account?{' '}
                  <Link color={'blue.400'} to="/signup-student">
                    Sign up
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
