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
import { accept_sponsorship } from '../../api';
import { Link } from 'react-router-dom';

const AllRequests = ({ requests, getSponsorships }) => {
  const toast = useToast();
  const onSponsorshipAccept = async sponsorship_id => {
    const res = await accept_sponsorship(sponsorship_id);
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
      {requests.map(sponsorship => (
        <Card
          key={uuid()}
          onSponsorshipAccept={onSponsorshipAccept}
          sponsorship={sponsorship}
        />
      ))}
    </VStack>
  );
};

const Card = ({ sponsorship, onSponsorshipAccept }) => {
  const { _id, name, amount, description, student } = sponsorship;

  const handleClick = () => {
    onSponsorshipAccept(_id);
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
      <HStack gap={'20px'} mb={'5px'} justify={'space-between'}>
        <VStack align={'start'}>
          <Text>By:</Text>
          <Text
            fontWeight={'bold'}
          >{`${student.firstName} ${student.lastName}`}</Text>
        </VStack>
        <VStack>
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
      <Button onClick={handleClick} mt={'20px'} colorScheme={'blue'}>
        Sponsor
      </Button>
      {student.certificate_url ? (
        <Button ml="10px" mt={'20px'} colorScheme={'blue'}>
          <Link target="_blank" to={student.certificate_url}>
            View Certificate
          </Link>
        </Button>
      ) : null}
    </Box>
  );
};

export default AllRequests;
