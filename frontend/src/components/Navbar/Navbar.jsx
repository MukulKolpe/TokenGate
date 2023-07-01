import React, { useState } from "react";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { useAuth } from "@polybase/react";
import { CgProfile } from "react-icons/cg";
import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "../../utils/avatar";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const { auth, state } = useAuth();
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <chakra.header bg={bg} w="full" h="100px" px={{ base: 6, sm: 4 }} py={5}>
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>MLH x NEAR</VisuallyHidden>
            </chakra.a>
            <Link to="/">
              <chakra.h3 fontSize="30px" fontWeight="0" ml="2" color="brand.00">
                MLH x NEAR
              </chakra.h3>
            </Link>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1} mr={5}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Link to="/explore">
                <chakra.a
                  href="/explore"
                  title="Explore"
                  display="flex"
                  alignItems="center"
                >
                  <Button variant="ghost">Explore</Button>
                </chakra.a>
              </Link>

              <chakra.a
                href="/add"
                title="Add Event"
                display="flex"
                alignItems="center"
              >
                <Link to="/add-event">
                  <Button variant="ghost">Add Event</Button>
                </Link>
              </chakra.a>
            </HStack>
            {state == null ? (
              <Button
                display="flex"
                flexDir="row"
                variant={"solid"}
                colorScheme={"teal"}
                size={"sm"}
                mr={4}
                leftIcon={<Icon as={CgProfile} boxSize={6} />}
                onClick={() => auth.signIn() && navigate("/")}
              >
                Sign In
              </Button>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    style={{
                      width: "40px",
                      height: "40px",
                    }}
                    avatarStyle="Circle"
                    {...generateRandomAvatarOptions()}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    Welcome,{" "}
                    {state.userId.slice(0, 4) + "..." + state.userId.slice(-4)}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as={Link} to="/profile">
                    Profile
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => auth.signOut()}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            )}
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <Link to="/explore">
                  <Button w="full" variant="ghost">
                    Explore
                  </Button>
                </Link>
                <Link to="/add-event">
                  <Button w="full" variant="ghost">
                    Add Event
                  </Button>
                </Link>

                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
}
