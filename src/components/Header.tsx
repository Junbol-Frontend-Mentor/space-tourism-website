import React, { useState } from 'react';
import { Flex, Box, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import '../styles/App.css';

// Define the path to the logo in the public directory
const logoPath = `${import.meta.env.BASE_URL}assets/images/shared/nasa-logo-web-rgb.png`;

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const displayHamburger = useBreakpointValue({ base: 'block', md: 'none' });

  return (
    <Flex as="header" width="100%" justifyContent="space-between" alignItems="center" p="4">
      <Box>
        <Link to="/">
          <img src={logoPath} alt="NASA Logo" width="100px" height="100px" />
        </Link>
      </Box>
      <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Box display={displayHamburger}>
        <Box className={`hamburgerIcon ${isMenuOpen ? 'change' : ''}`} onClick={toggleMenu}>
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
        </Box>
      </Box>
    </Flex>
  );
};


