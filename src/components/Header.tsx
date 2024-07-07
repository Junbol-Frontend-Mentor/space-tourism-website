import React from 'react';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import '../styles/App.css';

// Define the path to the logo in the public directory
const logoPath = `${import.meta.env.BASE_URL}assets/images/shared/nasa-logo-web-rgb.png`;

export const Header: React.FC = () => {
  return (
    <Flex as="header" width="100%" justifyContent="space-between" alignItems="center" p="4">
      <Box>
        <Link to="/">
          <img src={logoPath} alt="NASA Logo" width="50" height="50" />
        </Link>
      </Box>
      <Navigation isMenuOpen={false} toggleMenu={() => {}} />
    </Flex>
  );
};

