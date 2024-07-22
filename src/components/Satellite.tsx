import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex, Box, Heading, Text, List, ListItem, Link, Divider, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import '../styles/App.css'; // Ensure this import is correct based on your file structure

// Define the interface for the SatelliteProps which will be passed down to this component
interface SatelliteProps {
  //The name SatelliteProps is the name of the interface. By convention, interfaces often have names that describe their purpose or the type of objects they represent.
  satelliteName?: string; // Optional satelliteName prop
}
/* In TypeScript, an interface is a way to define the shape of an object. It specifies what properties an object should have, and what types those properties should be. Interfaces are not functions; they don't execute code but rather describe the structure that objects should follow.'interface' is a keyword in TypeScript used to define a contract for the shape of an object. It tells TypeScript what properties an object must or may have. 
satelliteName is a property of the interface.
The ? indicates that satelliteName is optional. This means objects that implement this interface may or may not have a satelliteName property.
string specifies the type of the satelliteName property. If satelliteName is present in an object, it must be a string.
 */

// Define the interface for a SatelliteItem, which represents the structure of a satellite object
interface SatelliteItem {
  name: string; // Name of the satellite
  images: {
    png: string; // URL to the PNG image
    webm: string; // URL to the WEBM video
  };
  description: string; // Description of the satellite
  distance: string; // Distance of the satellite
  travel: string; // Travel time to the satellite
}

export const Satellite: React.FC<SatelliteProps> = ({ satelliteName }) => {
  /*   SatelliteProps ensures that the Satellite component can receive an optional satelliteName prop.
If the satelliteName prop is passed, it must be a string; otherwise, it's perfectly fine for the prop to be absent. */
  const [data, setData] = useState<SatelliteItem[]>([]); // State to store the array of satellite items using the Typscript interface <SatelliteItem[]> and receiving an array as an argument
  const [selectedSatellite, setSelectedSatellite] = useState<SatelliteItem | null>(null); // State to store the currently selected satellite but given a null value by default
  const navigate = useNavigate(); // This hook allows you to programmatically navigate users to different routes in your application.
  /* The useNavigate hook provides a way to navigate programmatically within a React application. This means you can change the current URL and navigate to different parts of your application based on events, such as button clicks or other user interactions, without using a traditional anchor (<a>) tag or Link component. */

  // Responsive design hooks from Chakra UI
  const width = useBreakpointValue({ base: '100%', md: '1100px' }) || '100%';
  const flexDirection = useBreakpointValue<'column' | 'row'>({ base: 'column', md: 'row' }) || 'column';

  // useEffect to fetch data when the component mounts or when satelliteName changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data.json`); // Fetch data from data.json from the path given in the vite.config.ts:   base: '/space-tourism-website/',

        if (!response.ok) {
          throw new Error('Network response was not ok'); // Throw error if response is not OK
        }
        const jsonData = await response.json(); // Parse the JSON data
        setData(jsonData.destinations); // Set the fetched data to state

        // If a satelliteName is provided in the URL, find the corresponding satellite and set it as selected
        if (satelliteName) {
          const satellite = jsonData.destinations.find((sat: SatelliteItem) => sat.name.toLowerCase() === satelliteName.toLowerCase());
          setSelectedSatellite(satellite);
        } else {
          // If no satelliteName is provided, select the first satellite by default
          setSelectedSatellite(jsonData.destinations[0]);
        }
      } catch (error) {
        console.error('Error:', error); // Log any errors
      }
    };

    fetchData(); // Call the fetchData function

    // Re-run this effect whenever satelliteName changes
  }, [satelliteName]);

  // Function to handle clicks on a satellite, updating the selected satellite and navigating to its route
  const handleSatelliteClick = (satellite: SatelliteItem) => {
    setSelectedSatellite(satellite); // Update the selected satellite
    navigate(`/space-tourism-website/destination-page/${satellite.name.toLowerCase()}`); // Navigate to the selected satellite's route using the useNavigateI() hook
  };

  // Define colors for each satellite for UI purposes
  const satelliteColors: { [key: string]: string } = {
    MOON: 'hsl(0, 2%, 45%)',
    MARS: 'hsl(22, 60%, 50%)',
    EUROPA: 'hsl(215, 50%, 80%)',
    TITAN: 'hsl(30, 60%, 70%)',
  };

  // Define motion components for animations using framer-motion
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
            <video src={selectedSatellite.images.webm} autoPlay loop muted className="video-background" />
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

//Note about why the creation of those javascript files when running : npm run build:


