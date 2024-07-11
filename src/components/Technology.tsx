import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 🚩 useNavigate and useParams
import { Flex, Box, Heading, Text, List, ListItem, Link, Divider, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const technologyImage = `${import.meta.env.BASE_URL}assets/images/technology/image-launch-vehicle-portrait.jpg`;

interface TechnologyItem {
  name: string;
  images: {
    portrait: string;
    landscape: string;
  };
  description: string;
}

interface TechnologyProps {
  technologyName?: string;
}

export const Technology: React.FC<TechnologyProps> = ({ technologyName }) => {
  // 🚩 Add technologyName as a prop
  const [data, setData] = useState<TechnologyItem[]>([]); //❓
  const [selectedTechnology, setSelectedTechnology] = useState<TechnologyItem | null>(null); //❓
  const navigate = useNavigate();

  const width = useBreakpointValue({ base: '100%', md: '1100px' }) || '100%';
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' }) || 'column';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data.json`); //❓

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.technology);

        if (technologyName) {
          // 🚩 Set selected technology based on the technologyName parameter
          const technology = jsonData.technology.find(
            (tech: TechnologyItem) => tech.name.toLowerCase().replace(/\s+/g, '-') === technologyName.toLowerCase()
          );
          setSelectedTechnology(technology);
        } else {
          setSelectedTechnology(jsonData.technology[0]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [technologyName]);

  const handleTechnologyClick = (technology: TechnologyItem) => {
    setSelectedTechnology(technology);
    navigate(`/space-tourism-website/technology-page/${technology.name.toLowerCase().replace(/\s+/g, '-')}`); // 🚩 Navigate to the selected technology
  };

  const MotionBox = motion(Box);
  const MotionHeading = motion(Heading);

  return (
    <Flex width={width} direction={flexDirection} justifyContent="space-between" alignItems="center" minHeight="500px">
      {selectedTechnology && (
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
            border="5px solid hsl(220, 100%, 60%)"
            bg="black"
            mt="2rem"
            mb="3rem"
            backgroundImage={`url(${technologyImage})`}
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
              backgroundImage: `url(${selectedTechnology.images.portrait})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              zIndex: 2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeIn' }}
          ></MotionBox>
          <Flex width="27rem" direction="column" justifyContent="center">
            <List display="flex" width="27rem" justifyContent="space-between" mb="5rem" margin="0 auto" color="white">
              {data.map((technology) => (
                <ListItem key={technology.name} fontSize="0.8rem">
                  <Link
                    onClick={() => handleTechnologyClick(technology)}
                    _hover={{ color: 'hsl(220, 100%, 60%)', textDecoration: 'none' }} // 🚩 Ensure no underline on hover
                    _focus={{ color: 'hsl(220, 100%, 60%)' }}
                    color={selectedTechnology === technology ? 'hsl(220, 100%, 60%)' : 'inherit'} // 🚩 Active state styles
                  >
                    <Text fontFamily="Barlow" display="flex" flexDirection="column" width="6.10rem" textAlign="center">
                      {technology.name.toUpperCase()}
                    </Text>
                  </Link>
                </ListItem>
              ))}
            </List>

            <MotionHeading
              fontFamily="Bellefair"
              fontSize="2.8rem"
              fontWeight="500"
              color="hsl(220, 100%, 60%)"
              textAlign="center"
              mt="1.5rem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: 'easeIn' }}
            >
              {selectedTechnology.name.toUpperCase()}
            </MotionHeading>
            <Text fontFamily="Barlow" fontSize="1.5rem" fontWeight="300" color="white" textAlign="center" minHeight="100px">
              {selectedTechnology.description}
            </Text>
            <Divider width="20rem" border="1px solid hsl(220, 100%, 60%)" mx="auto" mb="2rem" />
            <Flex direction="column" alignItems="center" mb="0rem">
              <Text fontFamily="Barlow" fontSize="1.5rem" fontWeight="300" color="white" textAlign="center">
                DESCRIPTION
              </Text>
              <Text width="80%" fontFamily="Barlow" fontSize="1rem" fontWeight="400" color="white" textAlign="center">
                {selectedTechnology.description}
              </Text>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};
