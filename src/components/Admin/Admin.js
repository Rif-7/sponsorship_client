import { useEffect, useState } from 'react';
import AdminLogin from './AdminLogin';
import { fetch_admin_data } from '../../api';
import {
  Button,
  Center,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from '@chakra-ui/react';
import AdminStudents from './AdminStudents';
import AdminSponsors from './AdminSponsors';
import AdminSponsorhips from './AdminSponsorships';

const Admin = () => {
  const toast = useToast();
  const [isLogged, setIsLogged] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [students, setStudents] = useState([]);
  const [sponsorships, setSponsorships] = useState([]);

  useEffect(() => {
    const adminPass = localStorage.getItem('admin');
    if (!adminPass) return;
    setIsLogged(true);
  }, []);

  useEffect(() => {
    const adminPass = localStorage.getItem('admin');
    if (!adminPass) {
      return;
    }

    fetchAndSetData('sponsors', setSponsors);
    fetchAndSetData('students', setStudents);
    fetchAndSetData('sponsorships', setSponsorships);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  const fetchAndSetData = async (dataname, setter) => {
    const res = await fetch_admin_data(dataname);
    if (res.error) {
      return toast({
        title: 'Error.',
        description: res.error?.msg || res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setter(res[dataname]);
  };

  const logoutAdmin = () => {
    localStorage.removeItem('admin');
    setIsLogged(false);
  };

  if (!isLogged) {
    return <AdminLogin setIsLogged={setIsLogged} />;
  }

  return (
    <Center>
      <Tabs position="relative" variant="unstyled">
        <Text
          m={'20px'}
          fontSize={'xx-large'}
          className="raleway"
          fontWeight={'semi-bold'}
          textAlign={'center'}
        >
          Admin
          <Button onClick={logoutAdmin} colorScheme="red" ml={'20px'}>
            Logout
          </Button>
        </Text>
        <TabList>
          <Tab>Students</Tab>
          <Tab>Sponsors</Tab>
          <Tab>Sponsorships</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <AdminStudents items={students} />
          </TabPanel>
          <TabPanel>
            <AdminSponsors items={sponsors} />
          </TabPanel>
          <TabPanel>
            <AdminSponsorhips items={sponsorships} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default Admin;
