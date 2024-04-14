import { Box, VStack, Text, HStack, Divider } from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';

const RequestedSponsorships = ({ requests }) => {
  return (
    <VStack gap={'30px'}>
      {requests.map(request => (
        <Card key={uuid()} sponsorship={request} />
      ))}
    </VStack>
  );
};

const Card = props => {
  const { name, amount, description } = props.sponsorship;
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
      <HStack gap={'20px'} justify={'space-between'}>
        <VStack align={'start'}>
          <Text>Name:</Text>
          <Text fontWeight={'bold'}>{name}</Text>
        </VStack>
        <VStack align={'start'}>
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

export default RequestedSponsorships;
