import { Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
          certificate: curr.student?.certificate_url,
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
        return <Card key={uuidv4()} stat={stats[id]} />;
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
      {stat.certificate ? (
        <Button
          className="space"
          fontWeight={'thin'}
          alignSelf={'center'}
          mt={'15px'}
          colorScheme="blue"
        >
          <Link target="_blank" to={stat.certificate}>
            View Certificate
          </Link>
        </Button>
      ) : null}
    </Box>
  );
};

export default Statistics;
