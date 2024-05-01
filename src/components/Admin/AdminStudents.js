import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const AdminStudents = ({ items }) => {
  return (
    <TableContainer w={'1200px'} overflowY={'auto'} maxH={'500px'}>
      <Table variant="striped" colorScheme="teal">
        <TableCaption>
          {items.length === 0 ? 'No students found' : 'List of all students'}
        </TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Institution</Th>
            <Th>Certificate</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map(student => (
            <Card key={uuid()} student={student} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

const Card = ({ student }) => {
  const { id, fullname, certificate_url, email, institution } = student;

  return (
    <Tr>
      <Td>{id}</Td>
      <Td>{fullname}</Td>
      <Td>{email}</Td>
      <Td>{institution}</Td>
      <Td>
        {certificate_url ? (
          <Link target="_blank" to={certificate_url}>
            View Certificate
          </Link>
        ) : (
          <Text>No Certificate</Text>
        )}
      </Td>
    </Tr>
  );
};

export default AdminStudents;
