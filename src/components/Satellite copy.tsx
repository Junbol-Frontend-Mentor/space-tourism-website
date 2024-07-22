import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 🚩 useNavigate and useParams
import { Flex, Box, Heading, Text, List, ListItem, Link, Divider, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import '../styles/App.css'; // Ensure this import is correct based on your file structure

interface SatelliteProps {
  satelliteName?: string;
}

interface SatelliteItem {
  name: string;
  images: {
    png: string;
    webm: string;
  };
  description: string;
  distance: string;
  travel: string;
}

export const Satellite: React.FC<SatelliteProps> = ({ satelliteName }) => { //this satelliteName prop is passed by the navigation-page using prop drilling
  const [data, setData] = useState<SatelliteItem[]>([]); // 🚩 Use SatelliteItem[] for type safety
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteItem | null>(null); // 🚩 Use SatelliteItem | null for type safety
  const navigate = useNavigate();

  const width = useBreakpointValue({ base: '100%', md: '1100px' }) || '100%';
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' }) || 'column';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data.json`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.destinations);

        if (satelliteName) {
          const satellite = jsonData.destinations.find((sat: SatelliteItem) => sat.name.toLowerCase() === satelliteName.toLowerCase());
          setSelectedSatellite(satellite);
        } else {
          setSelectedSatellite(jsonData.destinations[0]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [satelliteName]);

  const handleSatelliteClick = (satellite: SatelliteItem) => {
    setSelectedSatellite(satellite);
    navigate(`/space-tourism-website/destination-page/${satellite.name.toLowerCase()}`);
  };

  const satelliteColors: { [key: string]: string } = {
    MOON: 'hsl(0, 2%, 45%)',
    MARS: 'hsl(22, 60%, 50%)',
    EUROPA: 'hsl(215, 50%, 80%)',
    TITAN: 'hsl(30, 60%, 70%)',
  };

  const MotionBox = motion(Box);
  const MotionHeading = motion(Heading);

  return (
    <Flex width={width} direction={flexDirection} justifyContent="space-around" alignItems="center" minHeight="500px">
      {selectedSatellite && (
        <>
          <MotionBox
            width={{ base: '20rem', md: '36rem' }}
            height={{ base: '20rem', md: '36rem' }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontFamily="Bellefair"
            bg="transparent"
            fontSize="3xl"
            borderRadius="50%"
            mt="2rem"
            p="0rem"
            mb="3rem"
            position="relative"
            overflow="hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeIn' }}
          >
            <video
              src={selectedSatellite.images.webm}
              autoPlay
              loop
              muted
              className="video-background" // Use the CSS class here
            />
          </MotionBox>
          <Flex width="24rem" direction="column" justifyContent="center">
            <List display="flex" width="25rem" justifyContent="space-around" mb="5rem" margin="0 auto" color="white">
              {data.map((satellite) => (
                <ListItem key={satellite.name}>
                  <Link
                    onClick={() => handleSatelliteClick(satellite)}
                    _hover={{ color: 'hsl(220, 50%, 60%)', textDecoration: 'none' }}
                    _focus={{ color: 'cyan' }}
                    color={selectedSatellite === satellite ? satelliteColors[satellite.name.toUpperCase()] : 'inherit'}
                  >
                    <Text fontFamily="Barlow">{satellite.name.toUpperCase()}</Text>
                  </Link>
                </ListItem>
              ))}
            </List>

            <MotionHeading
              fontFamily="Bellefair"
              fontSize="6rem"
              fontWeight="300"
              color={satelliteColors[selectedSatellite.name.toUpperCase()] || 'hsl(0,0%,100%)'}
              textAlign="center"
              mb="1.5rem"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: 'easeIn' }}
            >
              {selectedSatellite.name.toUpperCase()}
            </MotionHeading>
            <Text fontFamily="Barlow" fontSize="1.2rem" fontWeight="300" color="white" textAlign="justify" mb="2rem" minHeight="100px">
              {selectedSatellite.description}
            </Text>
            <Divider width="20rem" border="1px solid" borderColor="white" mx="auto" mb="2rem" />
            <Flex fontFamily="Barlow" direction="column" alignItems="center" mb="2rem">
              <Text fontFamily="Barlow" fontSize="1.5rem" fontWeight="300" color="white" textAlign="center">
                AVG. DISTANCE
              </Text>
              <Text fontFamily="Bellefair" fontSize="2.5rem" fontWeight="600" color="white" textAlign="center">
                {selectedSatellite.distance}
              </Text>
            </Flex>
            <Flex direction="column" alignItems="center">
              <Text fontFamily="Barlow" fontSize="1.5rem" fontWeight="300" color="white" textAlign="center">
                EST. TRAVEL TIME
              </Text>
              <Text fontFamily="Bellefair" fontSize="2.5rem" fontWeight="600" color="white" textAlign="center">
                {selectedSatellite.travel}
              </Text>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};
