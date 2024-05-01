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

const AdminSponsorhips = ({ items }) => {
  return (
    <TableContainer w={'1200px'} overflowY={'auto'} maxH={'500px'}>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          {items.length === 0
            ? 'No sponsorships found'
            : 'List of all sponsorships'}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Amount</Th>
            <Th>By</Th>
            <Th>Sponsor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(sponsorship => (
            <Card key={uuid()} sponsorship={sponsorship} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const Card = ({ sponsorship }) => {
  const { name, description, amount, student, sponsor } = sponsorship;

  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{description}</Td>
      <Td>{amount}</Td>
      <Td>{student.fullname}</Td>
      <Td>{sponsor ? sponsor.company : 'No sponsor yet'}</Td>
    </Tr>
  );
};

export default AdminSponsorhips;
