import React, { useState, useEffect } from 'react';
import { Flex, Box, Heading, Text, List, ListItem, Link, Divider, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const Technology: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState<any>(null);

  // Ensure types match ResponsiveValue<FlexDirection>
  const width = useBreakpointValue({ base: '100%', md: '1100px' }) || '100%'; // ✅ Updated width for the input
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' }) || 'column'; // ✅ Change direction based on breakpoint

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data.json`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.technology);
        setSelectedTechnology(jsonData.technology[0]); // Set default satellite
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handleTechnologyClick = (technology: any) => {
    //❓>>> "any"
    setSelectedTechnology(technology);
  };

  const MotionBox = motion(Box); // ✅
  const MotionHeading = motion(Heading); // ✅

  return (
    <Flex width={width} direction={flexDirection} justifyContent="space-around" alignItems="center" minHeight="500px">
      {selectedTechnology && (
        <>
          <MotionBox
            width={{ base: '100%', md: '36rem' }} // Responsive width
            height={{ base: '25rem', md: '36rem' }} // Responsive height
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontFamily="Bellefair"
            color="black"
            fontSize="3xl"
            bg="white"
            mt="2rem"
            mb="3rem"
            backgroundImage={`url(${selectedTechnology.images.portrait})`} // Ensure correct syntax here
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            initial={{ opacity: 0 }} // ✅ Initial state for animation
            animate={{ opacity: 1 }} // ✅ Animate to this state
            transition={{ duration: 1, ease: 'easeIn' }} // ✅ Animation duration and easing
          ></MotionBox>
          <Flex flexDirection="column">
            <Text fontFamily="Barlow" fontSize="1.5rem" fontWeight="400" color="white" textAlign="center" mb="1rem">
              TERMINOLOGY:
            </Text>
            <Flex width="27rem" direction="column" justifyContent="center" alignItems="center" margin="0 auto">
              <List display="flex" width="24rem" justifyContent="space-between" color="white" margin="0 auto">
                {data.map((technology) => (
                  <ListItem key={technology.name}>
                    <Link
                      onClick={() => handleTechnologyClick(technology)}
                      _hover={{ textDecoration: 'none', color: 'hsl(200, 50%, 60%)' }} // Hover state styles
                      _focus={{ color: 'hsl(200, 50%, 60%)' }} // Focus state styles
                      style={{ color: selectedTechnology === technology ? 'hsl(200, 50%, 60%)' : 'inherit' }} // Active state styles
                    >
                      <Text fontFamily="Barlow" display="flex" flexDirection="row" justifyContent="center" textAlign="center">
                        {technology.name.toUpperCase()}
                      </Text>{' '}
                      {/* Ensure correct hover syntax */}
                    </Link>
                  </ListItem>
                ))}
              </List>

              <MotionHeading
                fontFamily="Bellefair"
                fontSize="4.5rem"
                fontWeight="300"
                color="hsl(0, 100%, 50%)"
                textAlign="center"
                mt="2rem"
                mb="1.5rem"
                initial={{ opacity: 0 }} // ✅ Initial state for animation
                animate={{ opacity: 1 }} // ✅ Animate to this state
                transition={{ duration: 1, ease: 'easeIn' }} // ✅ Animation duration and easing
              >
                {selectedTechnology.name.toUpperCase()}
              </MotionHeading>
              <Text
                fontFamily="Barlow"
                fontSize="1rem"
                fontWeight="300"
                color="white"
                borderRadius="10px"
                textAlign="justify"
                mb="2rem"
                minHeight="100px"
                p="1rem"
                backgroundColor="hsla(220, 90%, 30%, 0.7)"
              >
                {selectedTechnology.description}
              </Text>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};
