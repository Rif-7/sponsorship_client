import {
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { request_sponsorship } from '../../api';

const RequestSponsorship = ({ getSponsorships }) => {
  const toast = useToast();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoading(true);
    const res = await request_sponsorship(name, amount, description);
    if (res.error) {
      toast({
        title: 'Error.',
        description: res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success.',
        description: res.success,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setName('');
      setAmount('');
      setDescription('');
    }
    getSponsorships();
    setIsLoading(false);
  };

  return (
    <VStack gap={'15px'} padding={'20px'}>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          type="text"
          required={true}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Amount</FormLabel>
        <Input
          value={amount}
          onChange={e => setAmount(e.target.value)}
          type="number"
          required={true}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Description/Tags</FormLabel>
        <Input
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          required={true}
        />
      </FormControl>
      <Button
        onClick={onSubmit}
        isLoading={isLoading}
        type="submit"
        colorScheme="green"
        variant={'outline'}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default RequestSponsorship;
