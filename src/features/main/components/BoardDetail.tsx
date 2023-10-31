"use client";

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import { ReactElement } from "react";

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

export default function BoardDetail() {
  return (
    <Container maxW={"5xl"} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          {/* <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Our Story
          </Text> */}
          <Heading>เลือกข้อมูลที่คุณต้องการรู้</Heading>
          <Text color={"gray.500"} fontSize={"lg"}>
            <ol>
              <li>
                แสดงข้อมูลประจำจังหวัดที่เลือก ประกอบไปด้วย สภาพอากาศประจำวัน
                ประกอบไปด้วย อุณหภูมิ ความชิ้น ปริมาณน้ำฝน แรงลม
              </li>
              <li>การพยากรณ์อากาศ</li>
              <li>พืชที่แนะนำ ระยะเวลาการเติบโต</li>
            </ol>
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          ></Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={"dashboard_pic.png"}
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
