import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { Footer } from './Footer';

// Import images
import homeBgMobile from '../assets/images/home/background-home-mobile.jpg';
import homeBgTablet from '../assets/images/home/background-home-tablet.jpg';
import homeBgDesktop from '../assets/images/home/background-home-desktop.jpg';
import destinationBgMobile from '../assets/images/destination/background-destination-mobile.jpg';
import destinationBgTablet from '../assets/images/destination/background-destination-tablet.jpg';
import destinationBgDesktop from '../assets/images/destination/background-destination-desktop.jpg';
import crewBgMobile from '../assets/images/crew/background-crew-mobile.jpg';
import crewBgTablet from '../assets/images/crew/background-crew-tablet.jpg';
import crewBgDesktop from '../assets/images/crew/background-crew-desktop.jpg';
import technologyBgMobile from '../assets/images/technology/background-technology-mobile.jpg';
import technologyBgTablet from '../assets/images/technology/background-technology-tablet.jpg';
import technologyBgDesktop from '../assets/images/technology/background-technology-desktop.jpg';

const backgroundImages: {
  //here I need to add typescript types
  mobile: { [key: string]: string };
  tablet: { [key: string]: string };
  desktop: { [key: string]: string };
} = {
  mobile: {
    '/space-tourism-website/': homeBgMobile,
    '/space-tourism-website/destination': destinationBgMobile,
    '/space-tourism-website/crew': crewBgMobile,
    '/space-tourism-website/technology': technologyBgMobile,
  },
  tablet: {
    '/space-tourism-website/': homeBgTablet,
    '/space-tourism-website/destination': destinationBgTablet,
    '/space-tourism-website/crew': crewBgTablet,
    '/space-tourism-website/technology': technologyBgTablet,
  },
  desktop: {
    '/space-tourism-website/': homeBgDesktop,
    '/space-tourism-website/destination': destinationBgDesktop,
    '/space-tourism-website/crew': crewBgDesktop,
    '/space-tourism-website/technology': technologyBgDesktop,
  },
};

export const Root: React.FC = () => {
  const location = useLocation();
  const breakpoint = useBreakpointValue({ base: 'mobile', md: 'tablet', lg: 'desktop' }) as 'mobile' | 'tablet' | 'desktop'; // Make sure to type the breakpoint value

  const getBackgroundImage = () => {
    const path = location.pathname;
    const images = backgroundImages[breakpoint];
    return `url(${images[path] || homeBgMobile})`;
  };

  return (
    <Box width="100%" minHeight="100vh" backgroundImage={getBackgroundImage()} backgroundSize="cover">
      <Header />
      <Outlet /> {/* Placeholder for nested route components */}
      <Footer /> {/* Footer added here */}
    </Box>
  );
};
