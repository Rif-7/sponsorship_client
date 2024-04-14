import { Box, VStack, Text, HStack, Divider } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';

const Sponsored = ({ sponsorships, getSponsorships }) => {
  console.log(sponsorships);
  return (
    <VStack gap={'30px'}>
      {sponsorships.map(sponsorship => (
        <Card key={uuid()} sponsorship={sponsorship} />
      ))}
    </VStack>
  );
};

const Card = ({ sponsorship }) => {
  const { name, amount, description, student } = sponsorship;

  return (
    <Box
      bg={'blue.100'}
      color={'black'}
      minW={'400px'}
      boxShadow={'xl'}
      padding={'20px'}
      borderRadius={'md'}
      className="raleway"
    >
      <HStack gap={'20px'} mb={'5px'} justify={'space-between'}>
        <VStack align={'start'}>
          <Text>By:</Text>
          <Text
            fontWeight={'bold'}
          >{`${student.firstName} ${student.lastName}`}</Text>
        </VStack>
        <VStack align={'start'}>
          <Text>Institution:</Text>
          <Text fontWeight={'bold'}>{student.institution}</Text>
        </VStack>
      </HStack>
      <Divider />
      <HStack mt={'5px'} gap={'20px'} justify={'space-between'}>
        <VStack align={'start'}>
          <Text>Name:</Text>
          <Text fontWeight={'bold'}>{name}</Text>
        </VStack>
        <VStack>
          <Text>Amount:</Text>
          <Text fontWeight={'bold'}>{amount}$</Text>
        </VStack>
      </HStack>
      <VStack mt={'10px'} align={'start'}>
        <Divider />
        <Text>Description:</Text>
        <Text fontWeight={'bold'}>{description}</Text>
      </VStack>
    </Box>
  );
};

export default Sponsored;
