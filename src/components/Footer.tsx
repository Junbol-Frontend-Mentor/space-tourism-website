import React from 'react';
import { Box, Text, Link } from '@chakra-ui/react';

export const Footer: React.FC = () => (
  <footer>
    <Box display="flex" flexDirection="column" alignItems="center" fontSize="0.8rem" color="lightgrey">
      <Text>
        Challenge by{' '}
        <Link href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer" color="white">
          Frontend Mentor
        </Link>
      </Text>
      <Text>
        Coded by{' '}
        <Link href="https://www.frontendmentor.io/profile/Junbol" target="_blank" rel="noopener noreferrer" color="white">
          Junier Bolívar © 2024
        </Link>
      </Text>
    </Box>
  </footer>
);


