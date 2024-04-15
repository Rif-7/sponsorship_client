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
import { useEffect, useState } from 'react';
import AllRequests from './AllRequests';
import { get_accepted_sponsorships, get_all_requests } from '../../api';
import Sponsored from './Sponsored';
import Statistics from './Statistics';

const SponsorPage = () => {
  const toast = useToast();
  const [allRequests, setAllRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    getSponsorships();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSponsorships = async () => {
    const all_requests = await get_all_requests();
    if (all_requests.error) {
      return toast({
        title: 'Error.',
        description: all_requests.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    const accepted_requests = await get_accepted_sponsorships();
    if (accepted_requests.error) {
      return toast({
        title: 'Error.',
        description: accepted_requests.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setAllRequests(all_requests.sponsorship_list);
    setAcceptedRequests(accepted_requests.sponsorship_list);
  };

  return (
    <Center>
      <Tabs position="relative" variant="unstyled">
        <TabList>
          <Tab>Your Sponsorships</Tab>
          <Tab>All Sponsorships</Tab>
          <Tab>Statistics</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
            <Sponsored
              sponsorships={acceptedRequests}
              getSponsorships={getSponsorships}
            />
          </TabPanel>
          <TabPanel>
            <AllRequests
              getSponsorships={getSponsorships}
              requests={allRequests}
            />
          </TabPanel>
          <TabPanel>
            <Statistics sponsorships={acceptedRequests} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default SponsorPage;
