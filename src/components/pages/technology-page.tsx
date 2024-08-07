import React from 'react';
import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom'; // 🚩 Import useParams
import { Technology } from '../Technology';

export const TechnologyPage: React.FC = () => {
  const { technologyName } = useParams<{ technologyName: string }>(); // 🚩 Get the technologyName parameter
  const width = useBreakpointValue({ base: '100%', md: '1100px' }) || '100%';
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' }) || 'column';

  return (
    <Flex width="100%" direction="column" textAlign="center" margin="0 auto" mb="2rem" mt="4rem">
      <Flex width={width} direction="row" justifyContent="left" alignItems="center" ml="1.5rem">
        <Heading color="white" fontFamily="Barlow" fontSize="2rem" fontWeight="700" mr="1rem">
          03
        </Heading>
        <Heading color="hsl(0, 100%, 50%)" fontFamily="Barlow" fontSize="2rem" fontWeight="400">
          TECHNOLOGY
        </Heading>
      </Flex>
      <Technology technologyName={technologyName} /> {/* 🚩 Pass the technologyName to the Technology component */}
    </Flex>
  );
};

