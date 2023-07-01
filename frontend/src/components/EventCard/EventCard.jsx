import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function EventCard({
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
  speakerApplications,
  speakers,
  attendees,
  volunteers,
  tickets,
  volunteersApplications,
  organizer,
  domain,
}) {
  const Navigate = useNavigate();
  return (
    <div>
      {isApproved && (
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
              <Avatar src={organizer.image} alt={"Author"} />
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
                <Text fontWeight={600}>{organizer.name}</Text>
                <Text color={"gray.500"}>Feb 08, 2021 </Text>
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
              onClick={() => Navigate(`/explore/${id}`)}
            >
              View Details
            </Button>
          </Box>
        </Center>
      )}
    </div>
  );
}
