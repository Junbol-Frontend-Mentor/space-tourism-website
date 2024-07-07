import { useState, useEffect } from 'react';
import { Flex, Box, Heading, Text, List, ListItem, Link, Divider, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import moonImage from '../assets/images/destination/image-moon.png';

interface Person {
  name: string;
  images: {
    png: string;
  };
  role: string;
  bio: string;
}

export const Crew: React.FC = () => {
  const [data, setData] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const width = useBreakpointValue({ base: '100%', md: '1100px' }) || '100%';
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' }) || 'column';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data.json`); // Corrected path for GitHub Pages

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.crew);
        setSelectedPerson(jsonData.crew[0]); // Set default satellite
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
  };

  const MotionBox = motion(Box);
  const MotionHeading = motion(Heading);

  return (
    <Flex width={width} direction={flexDirection} justifyContent="space-between" alignItems="center" minHeight="500px">
      {selectedPerson && (
        <>
          <MotionBox
            position="relative"
            width={{ base: '22rem', md: '36rem' }}
            height={{ base: '22rem', md: '36rem' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontFamily="Bellefair"
            color="black"
            fontSize="3xl"
            borderRadius="50%"
            border="5px solid hsl(200, 50%, 60%)"
            bg="black"
            mt="2rem"
            mb="3rem"
            backgroundImage={`url(${moonImage})`}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            _after={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundPosition: '-10px 20px',
              borderRadius: '50%',
              backgroundImage: `url(${selectedPerson.images.png})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              zIndex: 2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeIn' }}
          ></MotionBox>
          <Flex width="30rem" direction="column" justifyContent="center">
            <List display="flex" width="27rem" justifyContent="space-between" color="white" mb="5rem" margin="0 auto">
              {data.map((person) => (
                <ListItem key={person.name} fontSize="0.8rem">
                  <Link
                    onClick={() => handlePersonClick(person)}
                    _hover={{ textDecoration: 'none', color: 'hsl(200, 50%, 60%)' }} // Hover state styles
                    _focus={{ color: 'hsl(200, 50%, 60%)' }} // Focus state styles
                    style={{ color: selectedPerson === person ? 'hsl(200, 50%, 60%)' : 'inherit' }} // Active state styles
                  >
                    <Text fontFamily="Barlow" display="flex" flexDirection="column" width="6.10rem" textAlign="center">
                      {person.name.toUpperCase()}
                    </Text>
                  </Link>
                </ListItem>
              ))}
            </List>

            <MotionHeading
              width="100%"
              fontFamily="Bellefair"
              fontSize="3rem"
              fontWeight="500"
              color="hsl(200, 50%, 60%)"
              textAlign="center"
              mt="1.5rem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: 'easeIn' }}
            >
              {selectedPerson.name.toUpperCase()}
            </MotionHeading>
            <Text fontFamily="Barlow" fontSize="1.5rem" fontWeight="300" color="white" textAlign="center" minHeight="100px">
              {selectedPerson.role.toUpperCase()}
            </Text>
            <Divider width="20rem" border="1px solid hsl(200, 50%, 60%)" mx="auto" mb="2rem" />
            <Flex direction="column" alignItems="center" mb="0rem">
              <Text fontFamily="Barlow" fontSize="1.5rem" fontWeight="300" color="white" textAlign="center">
                BIO
              </Text>
              <Text fontFamily="Barlow" fontSize="1rem" fontWeight="400" color="white" textAlign="center">
                {selectedPerson.bio}
              </Text>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};
