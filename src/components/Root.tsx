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
    '/space-tourism-website': homeBgMobile, // 🟢 Added to ensure the root path is covered
    '/space-tourism-website/': homeBgMobile, // 🟢 Added to ensure the root path is covered
    '/space-tourism-website/destination-page': destinationBgMobile,
    '/space-tourism-website/destination-page/moon': destinationBgMobile,
    '/space-tourism-website/destination-page/mars': destinationBgMobile,
    '/space-tourism-website/destination-page/europa': destinationBgMobile,
    '/space-tourism-website/destination-page/titan': destinationBgMobile,
    '/space-tourism-website/crew-page': crewBgMobile,
    '/space-tourism-website/crew-page/douglas-hurley': crewBgMobile,
    '/space-tourism-website/crew-page/mark-shuttleworth': crewBgMobile,
    '/space-tourism-website/crew-page/victor-glover': crewBgMobile,
    '/space-tourism-website/crew-page/anousheh-ansari': crewBgMobile,
    '/space-tourism-website/technology-page': technologyBgMobile,
    '/space-tourism-website/technology-page/launch-vehicle': technologyBgMobile,
    '/space-tourism-website/technology-page/spaceport': technologyBgMobile,
    '/space-tourism-website/technology-page/space-capsule': technologyBgMobile,
    '/': homeBgMobile, // 🟢 Added to ensure the base path is covered
  },
  tablet: {
    '/space-tourism-website': homeBgTablet, // 🟢 Added to ensure the root path is covered
    '/space-tourism-website/': homeBgTablet, // 🟢 Added to ensure the root path is covered
    '/space-tourism-website/destination-page': destinationBgTablet,
    '/space-tourism-website/destination-page/moon': destinationBgTablet,
    '/space-tourism-website/destination-page/mars': destinationBgTablet,
    '/space-tourism-website/destination-page/europa': destinationBgTablet,
    '/space-tourism-website/destination-page/titan': destinationBgTablet,
    '/space-tourism-website/crew-page': crewBgTablet,
    '/space-tourism-website/crew-page/douglas-hurley': crewBgTablet,
    '/space-tourism-website/crew-page/mark-shuttleworth': crewBgTablet,
    '/space-tourism-website/crew-page/victor-glover': crewBgTablet,
    '/space-tourism-website/crew-page/anousheh-ansari': crewBgTablet,
    '/space-tourism-website/technology-page': technologyBgTablet,
    '/space-tourism-website/technology-page/launch-vehicle': technologyBgTablet,
    '/space-tourism-website/technology-page/spaceport': technologyBgTablet,
    '/space-tourism-website/technology-page/space-capsule': technologyBgTablet,
    '/': homeBgTablet, // 🟢 Added to ensure the base path is covered
  },
  desktop: {
    '/space-tourism-website': homeBgDesktop, // 🟢 Added to ensure the root path is covered
    '/space-tourism-website/': homeBgDesktop, // 🟢 Added to ensure the root path is covered
    '/space-tourism-website/destination-page': destinationBgDesktop,
    '/space-tourism-website/destination-page/moon': destinationBgDesktop,
    '/space-tourism-website/destination-page/mars': destinationBgDesktop,
    '/space-tourism-website/destination-page/europa': destinationBgDesktop,
    '/space-tourism-website/destination-page/titan': destinationBgDesktop,
    '/space-tourism-website/crew-page': crewBgDesktop,
    '/space-tourism-website/crew-page/douglas-hurley': crewBgDesktop,
    '/space-tourism-website/crew-page/mark-shuttleworth': crewBgDesktop,
    '/space-tourism-website/crew-page/victor-glover': crewBgDesktop,
    '/space-tourism-website/crew-page/anousheh-ansari': crewBgDesktop,
    '/space-tourism-website/technology-page': technologyBgDesktop,
    '/space-tourism-website/technology-page/launch-vehicle': technologyBgDesktop,
    '/space-tourism-website/technology-page/spaceport': technologyBgDesktop,
    '/space-tourism-website/technology-page/space-capsule': technologyBgDesktop,
    '/': homeBgDesktop, // 🟢 Added to ensure the base path is covered
  },
};

export const Root: React.FC = () => {
  const location = useLocation();
  const breakpoint = useBreakpointValue({ base: 'mobile', md: 'tablet', lg: 'desktop' }) as 'mobile' | 'tablet' | 'desktop';

  const getBackgroundImage = () => {
    const path = location.pathname;
    const images = backgroundImages[breakpoint];
    return `url(${images[path] || homeBgMobile})`;
  };

  return (
    <Box
      width="100%"
      minHeight="100vh"
      backgroundImage={getBackgroundImage()}
      backgroundSize="cover"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Header />
      <Box width="100%" maxWidth="1100px" margin="0 auto">
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
