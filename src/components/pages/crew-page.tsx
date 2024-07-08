import React from 'react';
import { Flex, Box, Heading, Text, List, ListItem, Link, Divider, useBreakpointValue } from '@chakra-ui/react';
import { Crew } from '../Crew';

export const CrewPage: React.FC = () => {
  const width = useBreakpointValue({ base: '100%', md: '1100px' }) || '100%'; // ✅ Updated width for the input
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' }) || 'column'; // ✅ Change direction based on
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
      <Crew />
    </Flex>
  );
};
