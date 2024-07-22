import React from 'react';
import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; // 🚩 Import useParams
import { Satellite } from '../Satellite';

export const DestinationPage: React.FC = () => {
  const { satelliteName } = useParams<{ satelliteName: string }>(); // 🚩 the satelliteName parameter is obtained from the URL using useParams.
  const width = useBreakpointValue({ base: '100%', md: '1100px' }) || '100%';
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' }) || 'column';

  return (
    <Flex width="100%" direction="column" textAlign="center" margin="0 auto" mb="2rem" mt="4rem" alignItems="center">
      <Flex width={width} direction="row" justifyContent="center" alignItems="center" ml="1.5rem">
        <Heading color="white" fontFamily="Barlow" fontSize="2rem" fontWeight="700" mr="1rem">
          01
        </Heading>
        <Heading color="hsl(0, 100%, 50%)" fontFamily="Barlow" fontSize="2rem" fontWeight="400">
          DESTINATION
        </Heading>
      </Flex>
      <Satellite satelliteName={satelliteName} /> {/* 🚩 Pass the satelliteName prop to the Satellite component. This is prop drilling */}
    </Flex>
  );
};


