import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";

import AdminCard from "../../components/AdminCard/AdminCard";

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch("http://localhost:5000/api/events");
      const data = await response.json();
      setEvents(data);
    };

    getEvents();
  }, []);

  const checkUser = (e) => {
    e.preventDefault();
    if (password === "root") {
      setChecked(true);
    }
  };

  return (
    <div>
      {!checked ? (
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
        >
          <Stack
            spacing={4}
            w={"full"}
            maxW={"md"}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"lg"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Enter Admin Security Key
            </Heading>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={checkUser}
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      ) : (
        <Grid templateColumns="repeat(4, 1fr)" gap={4} minW={100} m={8}>
          {events.map((event) => (
            <AdminCard
              key={event._id}
              id={event._id}
              title={event.title}
              description={event.description}
              isApproved={event.isApproved}
              time={event.time}
              date={event.date}
              image={event.image}
              mode={event.mode}
              location={event.location}
              price={event.price}
              tickets={event.tickets}
              organizer_email={event.organizer_email}
              domain={event.domain}
            />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Admin;
