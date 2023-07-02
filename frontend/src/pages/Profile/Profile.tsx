import React, { useState, useEffect } from "react";
import { useAuth } from "@polybase/react";
import ticketmint from "../../utils/techMintEventabi.json";
import { ethers } from "ethers";
import {
  Table,
  Center,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";

let tokenTickets = [];

const Profile = () => {
  const { state } = useAuth();
  const [totalTickets, setTotalTickets] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [button, showButton] = useState(true);
  const [eventModal, setEventModal] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [eventDetails, setEventDetails] = useState([]);

  const getTicketData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x57453F282818272fAA71cFb6ca3e685a38CeC6C4",
      ticketmint,
      signer
    );
    const transaction = Number(await contract.balanceOf(state.userId));
    setTotalTickets(transaction);
    console.log(transaction);
    // console.log(totalTickets);
    for (let i = 0; i < transaction; i++) {
      const ticket = Number(
        await contract.tokenOfOwnerByIndex(state.userId, i)
      );
      const tokenURI = await contract.tokenURI(ticket);
      const mongoEventURI = await contract.getEventFromTokenId(ticket);
      setTokens([...tokens, { tokenURI, ticket, mongoEventURI }]);
      tokenTickets.push({ ticket, tokenURI, mongoEventURI });
      // console.log(tokenTickets);
      // console.log(tokenURI);
      console.log(tokens);
      // console.log(ticket.toNumber());
      showButton(false);
    }
  };

  useEffect(() => {
    const getAllEventDetails = async () => {
      // const res = await fetch(`http://localhost:5000/api/events/`);
      // const data = await res.json();
      // setEventDetails(data);
      // console.log(data);
      for (let i = 0; i < tokens.length; i++) {
        const res = await fetch(
          `http://localhost:5000/api/events/${tokens[i].mongoEventURI}`
        );
        const data = await res.json();
        setEventDetails([...eventDetails, data]);
        // console.log(data);
        // console.log(eventDetails);
      }
    };
    getAllEventDetails();
    // console.log(eventDetails);
  }, [tokens]);

  // console.log(eventDetails);
  return (
    <div>
      {button ? (
        <>
          <Center>
            <Button onClick={getTicketData} colorScheme="blue">
              View All Tickets
            </Button>
          </Center>
        </>
      ) : (
        <TableContainer>
          <Heading noOfLines={1}>
            Welcome {state.userId.slice(0, 4) + "..." + state.userId.slice(-4)}!
            You have {totalTickets} tickets!
          </Heading>
          <Table variant="simple">
            <TableCaption>All of your Tickets Minted as NFTs!!</TableCaption>
            <Thead>
              <Tr>
                <Th>Sr. No.</Th>
                <Th>EventId</Th>
                <Th>Event Name</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tokenTickets.length > 0 &&
                tokenTickets.map((token, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{token.mongoEventURI}</Td>
                    <Td>{eventDetails[0]?.title}</Td>
                    <Td>
                      <Button colorScheme="blue" onClick={onOpen}>
                        View Ticket
                      </Button>{" "}
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Ticket for event #{eventDetails[0]?._id}{" "}
              </ModalHeader>
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
        </TableContainer>
      )}
    </div>
  );
};

export default Profile;
