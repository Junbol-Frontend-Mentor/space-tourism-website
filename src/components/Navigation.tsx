import React from 'react';
import { Flex, Link as ChakraLink, Text, useBreakpointValue } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'; //✅

/*
toggleMenu is a function that doesn't take any arguments and doesn't return anything. This is represented by () => void in TypeScript.
  Breakdown:
() indicates that the function takes no arguments.
=> is the arrow syntax indicating the return type follows.
void indicates that the function does not return any value.
*/
type Props = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

const MotionFlex = motion(Flex); //✅

export const Navigation: React.FC<Props> = ({ isMenuOpen, toggleMenu }) => {
  const navLinks = [
    // navLinks is a Router-dom component.It allows to create navigation links that are aware of the router state. This is important for creating navigation items that can show an active state when their route is matched.
    { title: '01 HOME', path: '/space-tourism-website/' },
    { title: '02 DESTINATION', path: '/space-tourism-website/destination-page' },
    { title: '03 CREW', path: '/space-tourism-website/crew-page' },
    { title: '04 TECHNOLOGY', path: '/space-tourism-website/technology-page' },
  ];

  const isMobile = useBreakpointValue({ base: true, md: false }); // 🚩
  const width = useBreakpointValue({ base: '70%', md: '700px' }); // ✅ Updated width for the input
  const flexHeight = useBreakpointValue({ base: '12rem', md: '6rem' }); // ✅ Adjust height based on breakpoint
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' }); // ✅ Change direction based on breakpoint
  const position = useBreakpointValue<'absolute' | 'relative'>({ base: 'absolute', md: 'relative' }); // ✅ Adjust Flex height based on breakpoint
  const justifyContent = useBreakpointValue<'center' | 'space-around'>({ base: 'center', md: 'space-around' }); // 🚩 Center content on mobile
  const margin = useBreakpointValue({ base: '0 auto', md: '0' }); // 🟢 Set margin for centering in mobile view

  if (isMobile && !isMenuOpen) return null; // 🚩 Conditionally render based on isMobile and isMenuOpen

  return (
    <MotionFlex
      width={width}
      height={flexHeight}
      borderRadius="15px"
      direction={flexDirection}
      position={position}
      top="0"
      left="0"
      right="0"
      pt="0.5rem"
      pb="0.5rem"
      margin={margin}
      justifyContent={justifyContent} // 🚩 Center content on mobile
      zIndex="3"
      backgroundColor="hsla(220, 100%, 20%, 0.7)"
      initial={{ y: '-10rem' }} // Initial position before the animation
      animate={{ y: isMenuOpen || !isMobile ? '1rem' : '-10rem' }} // 🚩 Animate to top or hide above the screen
      transition={{ type: 'tween', duration: 0.7 }} // Smooth transition
    >
      {navLinks.map((link) => (
        <ChakraLink
          as={NavLink}
          key={link.title}
          to={link.path}
          end // 🟢 Ensure exact match for the active state
          onClick={toggleMenu}
          color="white"
          textAlign="center"
          p="2"
          // border="1px solid hsl(0, 0%, 100%)"
          _hover={{ backgroundColor: 'hsl(220, 100%, 50%)' }}
          _focus={{ color: 'hsl(220, 100%, 50%)' }} // 🟢 Focus state styles
          textDecoration="none"
          display="flex" // Ensure flex display to align text properly
          justifyContent="center" // Center align text
          alignItems="center"
          _activeLink={{
            backgroundColor: 'hsla(220, 100%, 50%, 0.7)', // 🟢 Active state styles
            color: 'white',
          }}
        >
          <Text fontFamily="Barlow" fontWeight="700" mr="0.7rem">
            {link.title.split(' ')[0]} {/* Split the title and get the number part */}
          </Text>
          <Text fontFamily="Barlow" fontWeight="500">
            {link.title.split(' ')[1]} {/* Split the title and get the text part */}
          </Text>
        </ChakraLink>
      ))}
    </MotionFlex>
  );
};

//----NOTES:
//---Using the Link router component:

/* Link Attributes:
as: is used to change the underlying component that the Link renders.
Example: as={NavLink} makes Link act like a NavLink.

key: is a React attribute used to uniquely identify elements in a list.
Helps React manage list updates efficiently.
Example: key={link.title} assigns a unique key based on the title.

to: This attribute specifies the path or URL to navigate to when the link is clicked.
Example: to={link.path} navigates to the path specified in the navLinks array. */
