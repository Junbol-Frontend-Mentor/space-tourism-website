import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Box, Heading, Text, Link, useBreakpointValue } from '@chakra-ui/react';
const moonImage = `${import.meta.env.BASE_URL}assets/images/destination/image-moon.png`;

export const Home: React.FC = () => {
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' }); // 🚩 Ensure the correct type
  const headingSize = useBreakpointValue({ base: '8rem', md: '10rem' }); // 🚩 Change heading size based on breakpoint

  return (
    <Flex width="80%" direction={flexDirection} alignItems="center" justifyContent="space-around" margin="0 auto" mt="10rem" mb="5rem">
      <Flex width="25rem" height="100%" direction="column" alignItems="center" justifyContent="center" mb="5rem">
        <Heading color="white" fontFamily="Barlow" fontSize="2xl" fontWeight="500">
          SO, YOU WANT TO TRAVEL TO
        </Heading>
        <Heading color="hsl(220, 50%, 60%)" fontFamily="Bellefair" fontSize={headingSize} fontWeight="500">
          SPACE
        </Heading>
        <Text color="white" fontFamily="Barlow" textAlign="justify" fontSize="1rem">
          Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it.
          Well, sit back, and relax because we’ll give you a truly out-of-this-world experience!
        </Text>
      </Flex>
      <Link
        as={RouterLink}
        to="/space-tourism-website/destination-page/moon" // 🚩 Updated link to include specific satellite (e.g., moon)
        textDecoration="none" // Removes the underline
        _hover={{ textDecoration: 'none' }} // Ensures no underline on hover
      >
        <Box
          width="15rem"
          height="15rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontFamily="Bellefair"
          color="black"
          fontSize="3xl"
          borderRadius="50%"
          mb="5rem"
          bg="white"
          _hover={{
            color: 'white',
            backgroundImage: `url(${moonImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          EXPLORE
        </Box>
      </Link>
    </Flex>
  );
};

//---NOTES about Typescript:
/* the syntax useBreakpointValue<'column' | 'row'> is an example of TypeScript's typing system. 

TypeScript Generics and Type Assertions

Generics:

The syntax <T> is used for generics in TypeScript. Generics allow you to create reusable components and functions that work with a variety of types rather than a single one.
In this case, < 'column' | 'row' > specifies that the useBreakpointValue hook will only accept a value that is either 'column' or 'row'.

Type Assertion:

useBreakpointValue<'column' | 'row'> tells TypeScript that the hook will return a value of type 'column' or 'row'.
This ensures that the values provided to the useBreakpointValue function match the expected types, avoiding runtime errors and providing better IntelliSense support in code editors. */
