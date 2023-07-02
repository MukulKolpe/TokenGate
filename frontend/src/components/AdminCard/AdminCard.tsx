import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
  Button,
} from "@chakra-ui/react";
import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "../../utils/avatar";
import { useNavigate } from "react-router-dom";

export default function AdminCard({
  id,
  title,
  description,
  isApproved,
  time,
  date,
  image,
  mode,
  location,
  price,
  tickets,
  organizer,
  organizer_email,
  domain,
}) {
  const Navigate = useNavigate();

  // const handleClick = () => {
  //   Navigate(`/events/${id}`);
  // }

  const approveEvent = async () => {
    const response = await fetch(
      `http://localhost:5000/api/events/approval/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          title: title,
          description: description,
          isApproved: true,
          time: time,
          date: date,
          image: image,
          mode: mode,
          location: location,
          price: price,
          tickets: tickets,
          email: organizer_email,
          domain: domain,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      {!isApproved && (
        <Center py={6}>
          <Box
            maxW={"445px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            overflow={"hidden"}
          >
            <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6}>
              <Image
                src={
                  image
                    ? image
                    : "https://www.travelperk.com/wp-content/uploads/alexandre-pellaes-6vAjp0pscX0-unsplash-1-1-720x480.jpg"
                }
                layout={"fit"}
                h={"210px"}
                w={"full"}
              />
            </Box>
            <Stack>
              <Text
                color={"green.500"}
                textTransform={"uppercase"}
                fontWeight={800}
                fontSize={"sm"}
                letterSpacing={1.1}
              >
                {domain}
              </Text>
              <Heading
                color={useColorModeValue("gray.700", "white")}
                fontSize={"2xl"}
                fontFamily={"body"}
              >
                {title}
              </Heading>
              <Text color={"gray.500"}>
                {description.substring(0, 200) + "..."}
              </Text>
            </Stack>
            <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
              <Avatar
                size={"sm"}
                style={{
                  width: "40px",
                  height: "40px",
                }}
                avatarStyle="Circle"
                {...generateRandomAvatarOptions()}
              />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>
                  {organizer.slice(0, 4) + "..." + organizer.slice(-4)}
                </Text>
                <Text fontWeight={600} color={"gray.500"}>
                  {date.substring(0, 10)}
                </Text>
              </Stack>
              <Stack>
                <Text ml={8} color={"green.400"} px={10} fontWeight={"bold"}>
                  {mode}
                </Text>
              </Stack>
            </Stack>
            <Button
              w={"full"}
              mt={8}
              colorScheme="teal"
              variant="outline"
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
                variant: "solid",
              }}
              onClick={() => {
                approveEvent();
                Navigate(`/explore/`);
              }}
            >
              Approve
            </Button>
          </Box>
        </Center>
      )}
    </div>
  );
}
