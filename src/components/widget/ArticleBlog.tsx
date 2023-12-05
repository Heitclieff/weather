"use client";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";

interface Display {
  persons: string[];
  picture: string[];
}

const StudentCard: React.FC<{
  person: string;
  picture: string;
}> = ({ person, picture }) => {
  return (
    <Box
      display="flex"
      flex="1"
      position="relative"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginTop={{ base: "3", sm: "0" }}
    >
      <Text
        as="p"
        marginTop="2"
        color={useColorModeValue("gray.700", "gray.200")}
        fontSize="lg"
      >
        {person}
      </Text>
      <Box
        width={{ base: "100%", sm: "85%" }}
        zIndex="2"
        marginLeft={{ base: "0", sm: "5%" }}
        marginTop="5%"
      >
        <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
          <Image
            borderRadius="lg"
            src={picture}
            alt={`Image of ${person}`}
            objectFit="contain"
          />
        </Box>
      </Box>
      <Box zIndex="1" width="100%" position="absolute" height="100%">
        <Box
          bgGradient={useColorModeValue(
            "radial(orange.600 1px, transparent 1px)",
            "radial(orange.300 1px, transparent 1px)"
          )}
          backgroundSize="20px 20px"
          opacity="0.4"
          height="100%"
        />
      </Box>
    </Box>
  );
};

const Section: React.FC<Display> = ({ persons, picture }) => {
  return (
    <Container maxW={"7xl"} p="12">
      <Flex
        marginTop={{ base: "1", sm: "5" }}
        direction={{ base: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
      >
        {persons.map((person, index) => (
          <StudentCard key={index} person={person} picture={picture[index]} />
        ))}
      </Flex>
    </Container>
  );
};

const ArticleList = () => {
  return (
    <Box minHeight="80vh">
      <Heading as="h1" textAlign="center" paddingTop="50px">
        Contact Us
      </Heading>
      <Section
        persons={[
          "กิตติธัช พูลประเสริฐ 1630705216 เลขที่ 15",
          "อภิราช วรภัณฑ์พิศิษฎ์ 1630706560 เลขที่ 16",
        ]}
        picture={[
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80",
        ]}
      />

      <Section
        persons={[
          "กฤติเดช ดวงผาสุขโรจ 1630708467 เลขที่ 20",
          "โทบิ้น แฟรงค์คลิน 1630707774 เลขที่ 22",
        ]}
        picture={[
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80",
        ]}
      />
    </Box>
  );
};

export default ArticleList;
