'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
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
import { sign_up_student } from '../../api';

export default function RegisterStudent({ handleAuth, user }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateFirstname = e => setFirstname(e.target.value);
  const updateLastname = e => setLastname(e.target.value);
  const updateInstitution = e => setInstitution(e.target.value);
  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const res = await sign_up_student(
      firstname,
      lastname,
      institution,
      email,
      password
    );
    console.log(res);
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
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading
              fontSize={'4xl'}
              textAlign={'center'}
              fontFamily={'monospace'}
            >
              Student Signup.
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

              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={firstname}
                      onChange={updateFirstname}
                      required={true}
                      minLength={1}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={lastname}
                      onChange={updateLastname}
                      required={true}
                      minLength={1}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="institution" isRequired>
                <FormLabel>Institution</FormLabel>
                <Input
                  type="text"
                  required={true}
                  minLength={1}
                  value={institution}
                  onChange={updateInstitution}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  required={true}
                  minLength={1}
                  value={email}
                  onChange={updateEmail}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    required={true}
                    minLength={6}
                    value={password}
                    onChange={updatePassword}
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
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    onClick={onSubmit}
                    type="submit"
                  >
                    Sign up
                  </Button>
                </Stack>
              </Skeleton>

              <Stack pt={6}>
                <Text align={'center'}>
                  Already a student?{' '}
                  <Link color={'blue.400'} to="/login-student">
                    Login
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
