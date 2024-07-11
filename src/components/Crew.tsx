import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 🚩 useNavigate and useParams
import { Flex, Box, Heading, Text, List, ListItem, Link, Divider, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const moonImage = `${import.meta.env.BASE_URL}assets/images/destination/image-moon.png`;

interface Person {
  name: string;
  images: {
    png: string;
  };
  role: string;
  bio: string;
}

interface CrewProps {
  personName?: string;
}

export const Crew: React.FC<CrewProps> = ({ personName }) => {
  // 🚩 Add personName as a prop
  const [data, setData] = useState<Person[]>([]); //❓
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null); //❓
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
        setData(jsonData.crew);

        if (personName) {
          const person = jsonData.crew.find((p: Person) => p.name.toLowerCase().replace(/\s+/g, '-') === personName.toLowerCase()); //❓find((p: Person)
          setSelectedPerson(person);
        } else {
          setSelectedPerson(jsonData.crew[0]);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [personName]);

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    navigate(`/space-tourism-website/crew-page/${person.name.toLowerCase().replace(/\s+/g, '-')}`);
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
            border="5px solid hsl(220, 100%, 60%)"
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
          <Flex width="27rem" direction="column" justifyContent="center">
            <List display="flex" width="27rem" justifyContent="space-between" mb="5rem" margin="0 auto" color="white">
              {data.map((person) => (
                <ListItem key={person.name} fontSize="0.8rem">
                  <Link
                    onClick={() => handlePersonClick(person)}
                    _hover={{ color: 'hsl(220, 100%, 60%)', textDecoration: 'none' }} // 🚩 Ensure no underline on hover
                    _focus={{ color: 'hsl(220, 100%, 60%)' }}
                    color={selectedPerson === person ? 'hsl(220, 100%, 60%)' : 'inherit'} // 🚩 Active state styles
                  >
                    <Text fontFamily="Barlow" display="flex" flexDirection="column" width="6.10rem" textAlign="center">
                      {person.name.toUpperCase()}
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
              {selectedPerson.name.toUpperCase()}
            </MotionHeading>
            <Text fontFamily="Barlow" fontSize="1.5rem" fontWeight="300" color="white" textAlign="center" minHeight="100px">
              {selectedPerson.role.toUpperCase()}
            </Text>
            <Divider width="20rem" border="1px solid hsl(220, 100%, 60%)" mx="auto" mb="2rem" />
            <Flex direction="column" alignItems="center" mb="0rem">
              <Text fontFamily="Barlow" fontSize="1.5rem" fontWeight="300" color="white" textAlign="center">
                BIO
              </Text>
              <Text width="80%" fontFamily="Barlow" fontSize="1rem" fontWeight="400" color="white" textAlign="center">
                {selectedPerson.bio}
              </Text>
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};
