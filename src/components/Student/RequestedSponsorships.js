import {
  Box,
  VStack,
  Text,
  HStack,
  Divider,
  Button,
  useToast,
} from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';
import { remove_sponsorship } from '../../api';

const RequestedSponsorships = ({ requests, getSponsorships }) => {
  const toast = useToast();
  const handleDelete = async sponsorship_id => {
    const res = await remove_sponsorship(sponsorship_id);
    if (res.error) {
      return toast({
        title: 'Error.',
        description: res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    toast({
      title: 'Success.',
      description: res.success,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    getSponsorships();
  };
  return (
    <VStack gap={'30px'}>
      {requests.map(request => (
        <Card key={uuid()} handleDelete={handleDelete} sponsorship={request} />
      ))}
    </VStack>
  );
};

const Card = ({ sponsorship, handleDelete }) => {
  const { _id, name, amount, description } = sponsorship;

  const onDeleteClick = () => {
    handleDelete(_id);
  };

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
      <Button onClick={onDeleteClick} mt={'20px'} colorScheme={'red'}>
        Remove
      </Button>
    </Box>
  );
};

export default RequestedSponsorships;
