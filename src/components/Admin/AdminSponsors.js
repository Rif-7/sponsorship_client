import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { v4 as uuid } from 'uuid';

const AdminSponsors = ({ items }) => {
  return (
    <TableContainer w={'1200px'} overflowY={'auto'} maxH={'500px'}>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          {items.length === 0 ? 'No sponsors found' : 'List of all sponsors'}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Company</Th>
            <Th>Email</Th>
            <Th>Contact</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(sponsor => (
            <Card key={uuid()} sponsor={sponsor} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const Card = ({ sponsor }) => {
  const { _id, company, contact, email } = sponsor;

  return (
    <Tr>
      <Td>{_id}</Td>
      <Td>{company}</Td>
      <Td>{email}</Td>
      <Td>{contact}</Td>
    </Tr>
  );
};

export default AdminSponsors;
