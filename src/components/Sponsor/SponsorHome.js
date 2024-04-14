import { Box } from '@chakra-ui/react';
import SponsorNav from './SponsorNav';
import SponsorPage from './SponsorPage';
import { Navigate } from 'react-router-dom';

const SponsorHome = ({ user, logoutUser }) => {
  if (!user || !user?.company) {
    return <Navigate replace to={'/'} />;
  }

  return (
    <Box>
      <SponsorNav user={user} logoutSponsor={logoutUser} />
      <SponsorPage />
    </Box>
  );
};

export default SponsorHome;
