import { Box } from '@chakra-ui/react';
import StudentNav from './StudentNav';
import StudentPage from './StudentPage';
import { Navigate } from 'react-router-dom';

const StudentHome = ({ logoutUser, user }) => {
  if (!user || !user?.firstname) {
    return <Navigate replace to={'/'} />;
  }
  return (
    <Box w={'100vw'}>
      <StudentNav user={user} logoutStudent={logoutUser} />
      <StudentPage />
    </Box>
  );
};

export default StudentHome;
