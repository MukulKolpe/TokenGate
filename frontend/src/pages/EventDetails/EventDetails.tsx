import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  Link,
  List,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Transaction, ethers } from "ethers";
import { useAuth } from "@polybase/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { useState, useEffect } from "react";
import ticketmint from "../../utils/techMintEventabi.json";

export default function Simple() {
  const [event, setEvent] = useState({});
  const [title, setTitle] = useState("");
  const [orgemail, setOrgemail] = useState("");

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const { state } = useAuth();
  const [tokenUri, setTokenUri] = useState(
    "https://ipfs.io/ipfs/QmWJgUgGuNyqjVeEVZnF7WDijHQTmnp2pKvVgQg5PCFivU"
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [haveTicket, setHaveTicket] = useState(false);
  const [remainingSeats, setRemainingSeats] = useState(0);

  useEffect(() => {
    const eventId = window.location.pathname.split("/")[2];
    const getEvent = async () => {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventId}`
      );
      const data = await response.json();

      setEvent(data);
      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
      setImage(data.image);

      setLat(data.latitude);
      setLng(data.longitude);

      console.log(data.latitude, data.longitude);
    };
    getEvent();
    getRemainingTickets();
  }, [
    event.price,
    event.title,
    event.description,
    event.image,
    remainingSeats,
  ]);

  const rolloutTicket = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xb3BCe2124d7ecA01aa484E4109B78E56d5aBF343",
      ticketmint,
      signer
    );
    const transaction = await contract.startTicketSale(
      event._id,
      event.tickets
    );
    console.log(transaction);
  };

  const mintTicket = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xb3BCe2124d7ecA01aa484E4109B78E56d5aBF343",
      ticketmint,
      signer
    );
    const transaction = await contract.safeMint(
      state.userId,
      tokenUri,
      event._id
    );

    if (transaction.data.length > 0) {
      setHaveTicket(true);
    }
    getRemainingTickets();
  };

  const getRemainingTickets = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0xb3BCe2124d7ecA01aa484E4109B78E56d5aBF343",
      ticketmint,
      signer
    );
    const transaction = await contract.getRemainingSeats(event._id);
    console.log(transaction);
    const remainingTickets = transaction.toString();
    console.log(remainingTickets);
    setRemainingSeats(remainingTickets);
    return remainingTickets;
  };

  const [url, setUrl] = useState("");
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex flexDirection="column">
          <Image
            rounded={"md"}
            alt={"product image"}
            src={
              "https://www.travelperk.com/wp-content/uploads/alexandre-pellaes-6vAjp0pscX0-unsplash-1-1-720x480.jpg"
            }
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
            marginBottom={"30px"}
          />

          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${
              import.meta.env.VITE_GOOGLE_MAPS_API_KEY
            }&q=${lat},${lng}`}
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0, borderRadius: "5px" }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {event.title}
            </Heading>
            <Text
              fontSize={"2xl"}
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              letterSpacing={1.1}
            >
              {event.domain}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"lg"}>{event.description}</Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Time & Venue
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                <List spacing={2}>
                  <ListItem>Location</ListItem>
                  <ListItem>Date & Time</ListItem> <ListItem>Mode</ListItem>
                  <ListItem>Tickets Left</ListItem>
                </List>
                <List spacing={2}>
                  <ListItem>{event.location}</ListItem>
                  // give space between date and time by splitting the string
                  <ListItem>{event.date?.replace("T", " ")}</ListItem>
                  <ListItem>{event.mode}</ListItem>
                  <ListItem>{remainingSeats}</ListItem>
                </List>
              </SimpleGrid>
            </Box>
            <Box></Box>
          </Stack>

          {event.organizer === state.userId ? (
            <Button
              rounded={"none"}
              w={"md"}
              ml={16}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={rolloutTicket}
            >
              Rollout Tickets
            </Button>
          ) : !haveTicket ? (
            <Button
              rounded={"none"}
              w={"md"}
              ml={16}
              size={"lg"}
              py={"7"}
              bg={useColorModeValue("gray.900", "gray.50")}
              color={useColorModeValue("white", "gray.900")}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              onClick={mintTicket}
            >
              Buy Ticket ₹{event.price}
            </Button>
          ) : (
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  rounded={"none"}
                  w={"md"}
                  ml={16}
                  size={"lg"}
                  py={"7"}
                  bg={useColorModeValue("gray.900", "gray.50")}
                  color={useColorModeValue("white", "gray.900")}
                  textTransform={"uppercase"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                  onClick={onOpen}
                >
                  View your Ticket
                </Button>
                <span style={{ marginTop: "10px" }}>You are already in!</span>
              </div>

              <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Ticket for event #{event._id}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Image src="https://ipfs.io/ipfs/Qme1E49DEyeGRmT2CDeSCZRcNiLyeAQiDq7SAxDHACiivi/" />
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          )}
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
