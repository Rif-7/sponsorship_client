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
import { sign_up_sponsor } from '../../api';

export default function RegisterSponsor({ handleAuth, user }) {
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const updateCompany = e => setCompany(e.target.value);
  const updateContact = e => setContact(e.target.value);
  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const res = await sign_up_sponsor(company, contact, email, password);
    if (res.error) {
      setError(res.error);
    } else {
      localStorage.setItem('token', res.token);
      localStorage.setItem('accountType', 'sponsor');
      await handleAuth();
    }
    setIsLoading(true);
  };

  if (user?.email) {
    return <Navigate replace to={'/'} />;
  }

  return (
    <form onSubmit={onSubmit}>
      <Flex
        position={'relative'}
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={'gray.50'}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading
              fontSize={'4xl'}
              textAlign={'center'}
              fontFamily={'monospace'}
            >
              Sponsor Signup.
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
                    <FormLabel>Company</FormLabel>
                    <Input
                      type="text"
                      value={company}
                      onChange={updateCompany}
                      required={true}
                      minLength={1}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Contact</FormLabel>
                    <Input
                      type="text"
                      value={contact}
                      onChange={updateContact}
                      required={true}
                      minLength={1}
                    />
                  </FormControl>
                </Box>
              </HStack>
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
                  Already a sponsor?{' '}
                  <Link color={'blue.400'} to="/login-sponsor">
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
