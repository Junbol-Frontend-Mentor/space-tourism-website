import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import { Footer } from './Footer';

// Define paths to the images in the public directory
const homeBgMobile = `${import.meta.env.BASE_URL}assets/images/home/background-home-mobile.jpg`;
const homeBgTablet = `${import.meta.env.BASE_URL}assets/images/home/background-home-tablet.jpg`;
const homeBgDesktop = `${import.meta.env.BASE_URL}assets/images/home/background-home-desktop.jpg`;
const destinationBgMobile = `${import.meta.env.BASE_URL}assets/images/destination/background-destination-mobile.jpg`;
const destinationBgTablet = `${import.meta.env.BASE_URL}assets/images/destination/background-destination-tablet.jpg`;
const destinationBgDesktop = `${import.meta.env.BASE_URL}assets/images/destination/background-destination-desktop.jpg`;
const crewBgMobile = `${import.meta.env.BASE_URL}assets/images/crew/background-crew-mobile.jpg`;
const crewBgTablet = `${import.meta.env.BASE_URL}assets/images/crew/background-crew-tablet.jpg`;
const crewBgDesktop = `${import.meta.env.BASE_URL}assets/images/crew/background-crew-desktop.jpg`;
const technologyBgMobile = `${import.meta.env.BASE_URL}assets/images/technology/background-technology-mobile.jpg`;
const technologyBgTablet = `${import.meta.env.BASE_URL}assets/images/technology/background-technology-tablet.jpg`;
const technologyBgDesktop = `${import.meta.env.BASE_URL}assets/images/technology/background-technology-desktop.jpg`;

const backgroundImages: {
  // TypeScript types for breakpoint images
  mobile: { [key: string]: string };
  tablet: { [key: string]: string };
  desktop: { [key: string]: string };
} = {
  mobile: {
    '/space-tourism-website/': homeBgMobile,
    '/space-tourism-website/destination-page': destinationBgMobile,
    '/space-tourism-website/crew-page': crewBgMobile,
    '/space-tourism-website/technology-page': technologyBgMobile,
  },
  tablet: {
    '/space-tourism-website/': homeBgTablet,
    '/space-tourism-website/destination-page': destinationBgTablet,
    '/space-tourism-website/crew-page': crewBgTablet,
    '/space-tourism-website/technology-page': technologyBgTablet,
  },
  desktop: {
    '/space-tourism-website/': homeBgDesktop,
    '/space-tourism-website/destination-page': destinationBgDesktop,
    '/space-tourism-website/crew-page': crewBgDesktop,
    '/space-tourism-website/technology-page': technologyBgDesktop,
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
