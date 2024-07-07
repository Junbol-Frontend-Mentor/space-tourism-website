import React, { useState } from 'react';
import { Flex, Box, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../assets/images/shared/nasa-logo-web-rgb.png';
import { Navigation } from './Navigation';
import '../styles/App.css'; // Import the updated CSS

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const displayHamburger = useBreakpointValue({ base: 'block', md: 'none' }); // 🚩

  return (
    <Flex justifyContent="space-between" alignItems="center" mb="2rem">
      <Link to="/space-tourism-website/">
        <Box width="100px" height="100px" mt="2.5rem">
          <img src={Logo} alt="Logo" />
        </Box>
      </Link>
      <Navigation isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Box display={displayHamburger}>
        {' '}
        {/* 🚩 */}
        <Box className={`hamburgerIcon ${isMenuOpen ? 'change' : ''}`} onClick={toggleMenu}>
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
        </Box>
      </Box>
    </Flex>
  );
};
