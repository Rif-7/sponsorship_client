import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  TabIndicator,
  Center,
  useToast,
} from '@chakra-ui/react';
import RequestSponsorship from './RequestSponsorship';
import { useEffect, useState } from 'react';
import { get_student_requests } from '../../api';
import RequestedSponsorships from './RequestedSponsorships';
import AcceptedSponsorships from './AcceptedSponsorships';

const StudentPage = () => {
  const toast = useToast();

  const [requests, setRequests] = useState([]);
  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    getSponsorships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSponsorships = async () => {
    const res = await get_student_requests();
    if (res.error) {
      return toast({
        title: 'Error.',
        description: res.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setAccepted(res.sponsorship_list.filter(item => item.sponsor));
    setRequests(res.sponsorship_list.filter(item => !item.sponsor));
  };

  return (
    <Center>
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab>Accepted Sponsorships</Tab>
          <Tab>Pending Sponsorships</Tab>
          <Tab>Make New Request</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <AcceptedSponsorships
              getSponsorships={getSponsorships}
              accepted={accepted}
            />
          </TabPanel>
          <TabPanel>
            <RequestedSponsorships
              getSponsorships={getSponsorships}
              requests={requests}
            />
          </TabPanel>
          <TabPanel>
            <RequestSponsorship getSponsorships={getSponsorships} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default StudentPage;
