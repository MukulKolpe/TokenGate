import React, { useState, useEffect, useRef } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  InputLeftElement,
  useToast,
  VisuallyHidden,
  Stack,
  Icon,
  chakra,
  Text,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import FileBase64 from "react-file-base64";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";

const obj = {
  title: "",
  description: "",
  mode: "",
  domain: "",
  datetime: "",
  location: "",
  tickets: 0,
  prize: 0,
  lat: 0,
  lng: 0,
};
console.log(obj);

const Form1 = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState("");

  obj.title = title;
  obj.description = description;
  obj.mode = mode;

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Add Event Details
      </Heading>
      <FormControl isRequired>
        <FormLabel htmlFor="title" fontWeight={"normal"}>
          Event Title
        </FormLabel>
        <Input
          id="title"
          placeholder="Title..."
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormControl>
      <FormControl mr="5%" mt="2%" isRequired>
        <FormLabel htmlFor="description" fontWeight={"normal"}>
          Description
        </FormLabel>
        <Textarea
          placeholder="Event Description..."
          rows={3}
          shadow="sm"
          focusBorderColor="brand.400"
          fontSize={{
            sm: "sm",
          }}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormHelperText>
          Brief description for the event. URLs are hyperlinked.
        </FormHelperText>
      </FormControl>
      <FormControl as={GridItem} colSpan={[6, 3]} mt="2%">
        <FormLabel
          htmlFor="country"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Mode
        </FormLabel>
        <Select
          id="mode"
          name="mode"
          autoComplete="mode"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={(e) => setMode(e.target.value)}
        >
          <option>Online</option>
          <option>In-Person</option>
        </Select>
      </FormControl>
    </>
  );
};

const Form2 = () => {
  const [domain, setDomain] = useState("");
  const [datetime, setDatetime] = useState("");
  const [location, setLocation] = useState("");
  const [eventBanner, setEventBanner] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const inputRef = useRef();

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();
    if (place) {
      console.log(place.formatted_address);
      setLocation(place.formatted_address);
      setLat(place.geometry.location.lat());
      setLng(place.geometry.location.lng());
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    }
  };

  obj.domain = domain;
  obj.datetime = datetime;
  obj.location = location;
  obj.eventBanner = eventBanner;
  obj.lat = lat;
  obj.lng = lng;

  console.log(lat, lng);

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Add Event Details
      </Heading>
      <FormControl as={GridItem} colSpan={[6, 3]} mt="2%">
        <FormLabel
          htmlFor="domain"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Domain
        </FormLabel>
        <Select
          id="domain"
          name="domain"
          autoComplete="domain"
          placeholder="Select option"
          focusBorderColor="brand.400"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          onChange={(e) => setDomain(e.target.value)}
        >
          <option>Tech</option>
          <option>Literature</option>
          <option>Art</option>
          <option>Music</option>
          <option>Dance</option>
          <option>Sports</option>
          <option>Other</option>
        </Select>
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="datetime-local" fontWeight={"normal"}>
          Date and Time
        </FormLabel>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="datetime-local"
          id="datetime-local"
          onChange={(e) => setDatetime(e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="location" fontWeight={"normal"}>
          Location
        </FormLabel>
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          libraries={["places"]}
        >
          <StandaloneSearchBox
            onLoad={(ref) => (inputRef.current = ref)}
            onPlacesChanged={handlePlaceChanged}
          >
            <Input type="text" id="location" placeholder="Set Location..." />
          </StandaloneSearchBox>
        </LoadScript>
      </FormControl>
      <FormControl mt="2%">
        <FormLabel
          fontSize="sm"
          fontWeight={"normal"}
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Event Banner
        </FormLabel>

        <Flex
          mt={1}
          justify="center"
          px={6}
          pt={5}
          pb={6}
          borderWidth={2}
          _dark={{
            color: "gray.500",
          }}
          borderStyle="dashed"
          rounded="md"
        >
          <Stack spacing={1} textAlign="center">
            <FileBase64
              id="banners"
              type="file"
              multiple={false}
              onDone={({ base64 }) => setEventBanner(base64)}
            >
              <Icon
                mx="auto"
                boxSize={12}
                color="gray.400"
                _dark={{
                  color: "gray.500",
                }}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Icon>
              <Flex
                fontSize="sm"
                color="gray.600"
                _dark={{
                  color: "gray.400",
                }}
                alignItems="baseline"
              >
                <chakra.label
                  htmlFor="file-upload"
                  cursor="pointer"
                  rounded="md"
                  fontSize="md"
                  color="brand.600"
                  _dark={{
                    color: "brand.200",
                  }}
                  pos="relative"
                  _hover={{
                    color: "brand.400",
                    _dark: {
                      color: "brand.300",
                    },
                  }}
                >
                  <span>Upload a file</span>
                  <VisuallyHidden>
                    <input id="file-upload" name="file-upload" type="file" />
                  </VisuallyHidden>
                </chakra.label>
                <Text pl={1}>or drag and drop</Text>
              </Flex>
              <Text
                fontSize="xs"
                color="gray.500"
                _dark={{
                  color: "gray.50",
                }}
              >
                PNG, JPG, GIF up to 10MB
              </Text>
            </FileBase64>
          </Stack>
        </Flex>
      </FormControl>
    </>
  );
};

const Form3 = () => {
  const [tickets, setTickets] = useState(0);
  const [price, setPrice] = useState(0);

  obj.tickets = parseInt(tickets);
  obj.price = parseInt(price);

  console.log(obj);

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Add Event Details
      </Heading>
      <FormControl mt="2%" isRequired>
        <FormLabel htmlFor="tickets" fontWeight={"normal"}>
          Total no. of Tickets to issue
        </FormLabel>

        <Input
          id="tickets"
          placeholder="No. of Tickets..."
          min={1}
          onChange={(e) => setTickets(e.target.value)}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="prize" fontWeight={"normal"}>
          Prize of each Ticket
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children="₹"
          />
          <Input
            placeholder="Enter amount"
            onChange={(e) => setPrice(e.target.value)}
          />
          <InputRightElement>
            <CheckIcon color="green.500" />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
};

export default function multistep() {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [id, setId] = useState("");

  useEffect(() => {}, []);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="teal"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);

                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="teal"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={async () => {
                  let events = await fetch(
                    `http://localhost:5000/api/events/add`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        title: obj.title,
                        description: obj.description,
                        mode: obj.mode,
                        location: obj.location,
                        date: obj.datetime,
                        organizer: id,
                        price: obj.price,
                        tickets: obj.tickets,
                        domain: obj.domain,
                        image: obj.eventBanner,
                        latitude: obj.lat,
                        longitude: obj.lng,
                      }),
                    }
                  );
                  console.log(events.json());
                  toast({
                    title: "Event Details Submitted.",
                    description: "We've created your account for you.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                  setSubmitted(true);
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
