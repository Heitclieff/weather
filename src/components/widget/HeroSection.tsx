"use client";

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Stack direction={{ base: "column", md: "row" }}>
      <Flex p={10} pt={40} flex={1} align={"flex-start"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              ร่วมหาไอเดียปลูกพืช จากข้อมูลสภาพอากาศ
            </Text>
            <br />{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            ด้วยข้อมูล API จากดาวเทียม
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              rounded={"full"}
              colorScheme="teal"
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Dashboard
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={"Banner.png"}
          width={660}
          height={600}
        />
      </Flex>
    </Stack>
  );
}
