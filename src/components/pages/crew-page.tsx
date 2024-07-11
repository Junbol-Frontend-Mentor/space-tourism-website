import React from 'react';
import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Crew } from '../Crew';

export const CrewPage: React.FC = () => {
  const { personName } = useParams<{ personName: string }>(); // 🚩 Get the personName parameter
  const width = useBreakpointValue({ base: '100%', md: '1100px' }) || '100%';
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' }) || 'column';

  return (
    <Flex width="100%" direction="column" textAlign="center" margin="0 auto" mb="2rem" mt="4rem">
      <Flex width={width} direction="row" justifyContent="left" alignItems="center" ml="1.5rem">
        <Heading color="white" fontFamily="Barlow" fontSize="2rem" fontWeight="700" mr="1rem">
          01
        </Heading>
        <Heading color="hsl(0, 100%, 50%)" fontFamily="Barlow" fontSize="2rem" fontWeight="400">
          MEET THE CREW
        </Heading>
      </Flex>
      <Crew personName={personName} /> {/* 🚩 Pass the personName to the Crew component */}
    </Flex>
  );
};
