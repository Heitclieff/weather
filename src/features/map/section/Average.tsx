import React from 'react'
import {
Box,
VStack,
HStack,
Text,
Icon,
Grid, 
GridItem,
Divider
} from '@chakra-ui/react';

import { BsCloudSunFill } from 'react-icons/bs';
import { AvgTable } from '../assets/table';


interface sectionProps {
  data: any
}

const Average: React.FC<sectionProps> = ({ data }) => {
  return (
      <HStack w='100%' h='100%' >
          <VStack w='80%' justifyContent={'center'} alignItems={'center'} >
            <VStack>
              <Text fontSize={'6xl'} fontWeight={'semibold'}>{`${data.tavg}°`}<Icon as={BsCloudSunFill} /></Text>
              <Divider borderColor={'BlackAlpha 500'} />
              <Text>12 month</Text>
            </VStack>
          </VStack>

          <Grid w='100%' templateColumns='repeat(2,1fr)' gap={2} mt = {5}>
            {Object.keys(data)?.map((item: any, key: number) => {
                const variable = ['', '°', '°', '°', 'hPa', 'km/h', 'mm', '']
                if (item === "tavg" || item == "month") {
                  return
                }
                return (
                  <GridItem w='95%' colSpan={2}>
                    <HStack w='100%' justifyContent={'space-between'} fontSize={'lg'}>
                      <Text>{AvgTable[key]}</Text>
                      <Text>{`${data[item]} ${variable[key]}`}</Text>
                    </HStack>
                    <Divider mt={1} />
                  </GridItem>
                )


              })
            }
          </Grid>
      </HStack>
  )
}


export default Average;