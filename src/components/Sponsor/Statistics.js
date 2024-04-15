import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Statistics = ({ sponsorships }) => {
  const [stats, setStatistics] = useState([]);

  useEffect(() => {
    formatStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sponsorships]);

  const formatStats = () => {
    const stats = {};
    for (let i = 0; i < sponsorships.length; i++) {
      const curr = sponsorships[i];
      if (!stats[curr.student._id]) {
        stats[curr.student._id] = {
          amount: curr.amount,
          name: `${curr.student.firstName} ${curr.student.lastName}`,
          institution: curr.student.institution,
        };
      } else {
        stats[curr.student._id].amount += curr.amount;
      }
    }
    setStatistics(stats);
  };

  return (
    <VStack gap={'10px'}>
      {Object.keys(stats).map(id => {
        return <Card stat={stats[id]} />;
      })}
    </VStack>
  );
};

const Card = ({ stat }) => {
  return (
    <Box
      bg={'blue.100'}
      w={'400px'}
      padding={'20px'}
      rounded={'md'}
      className="space-mono"
    >
      <HStack justify={'space-between'}>
        <Box>
          <Text>Name:</Text>
          <Text className="raleway" fontWeight={'bold'}>
            {stat.name}
          </Text>
        </Box>
        <Box>
          <Text>Institution:</Text>
          <Text className="raleway" fontWeight={'bold'}>
            {stat.institution}
          </Text>
        </Box>
      </HStack>
      <Box mt={'10px'}>
        <Divider />
        <Text>Total Sponsored Amount:</Text>
        <Text className="raleway" fontWeight={'bold'}>
          {stat.amount}$
        </Text>
      </Box>
    </Box>
  );
};

export default Statistics;
