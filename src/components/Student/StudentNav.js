'use client';

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  Center,
} from '@chakra-ui/react';

export default function StudentNav({ user, logoutStudent }) {
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box className="merriweather">{`Hello, ${user.firstname}`}</Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    name={`${user.firstname} ${user.lastname}`}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      name={`${user.firstname} ${user.lastname}`}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{`${user.firstname} ${user.lastname}`}</p>
                  </Center>
                  <Center>
                    <p>{`${user.institution}`}</p>
                  </Center>
                  <Center>
                    <p>{`${user.email}`}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem
                    _hover={{
                      bg: 'red.400',
                      color: 'white',
                    }}
                    onClick={logoutStudent}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
