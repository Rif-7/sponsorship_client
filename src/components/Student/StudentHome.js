import { Box } from '@chakra-ui/react';
import StudentNav from './StudentNav';
import StudentPage from './StudentPage';

const StudentHome = ({ setUser, user }) => {
  return (
    <Box w={'100vw'}>
      <StudentNav user={user} logoutStudent={() => {}} />
      <StudentPage />
    </Box>
  );
};

export default StudentHome;
