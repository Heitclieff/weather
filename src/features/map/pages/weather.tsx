import React from 'react'
import {
VStack,
HStack,
Icon,
Grid,
Box,
GridItem,
Divider,
Image,
Text,
} from '@chakra-ui/react'
import { SunIcon } from '@chakra-ui/icons'
import { weatherTable } from '../assets/table'
import {BsCloudSunFill , BsFillCloudRainFill} from 'react-icons/bs'
interface pageProps {
     weather : any
}

const Weather : React.FC <pageProps> = ({weather}) => {
  return (
     <VStack  gap = {5}>
               <HStack 
               w = '100%' 
               h = {150} 
               position={'relative'}
               rounded={'md'}   
               overflow={'hidden'}  
               justifyContent = 'center' 
               p = {7} 
               gap = {0} 
               color={'white'}
               boxShadow={'2xl'}
               
               >
                    <VStack w = '100%'  alignItems={'center'}>
                         <HStack justifyContent={'space-between'} w = '100%' >
                              <VStack>
                                   <Text 
                                   fontSize= '4xl'
                                   fontWeight={'semibold'}
                                   textAlign={'center'}>
                                        35°
                                   </Text>
                              </VStack>
                         </HStack>
                         <VStack w = '100%' alignItems={'start'} >
                              <Text fontSize={'xl'} fontWeight={'semibold'}>{weather}</Text>
                         </VStack>
                    </VStack>
       
                    <Icon 
                         as = {BsCloudSunFill}
                         boxSize={16}
                         />
                    <Box w ='100%' h = 'auto' position={'absolute'} zIndex={-1} bg = 'gray.500' >
                              <Image 
                              maxW={'100%'}
                              maxH={'100%'}
                              w={'100%'}
                              h={'100%'}
                              opacity={0.6}
                              objectFit={'cover'}
                              src = 'https://media.tenor.com/6-AAOY8JyU8AAAAC/sunny-day-sky.gif'/>
                         </Box>
                      
               </HStack>
               <VStack w = '100%' alignItems={'start'} pl = {3} bg ='white' rounded={'md'} p = {6} boxShadow={'2xl'}>
                    <Text>Feels Like</Text>
                    <Text 
                              fontSize= '4xl'
                              fontWeight={'semibold'}
                              textAlign={'center'}>
                                   40°
                              </Text>
                    <Grid w = '100%'  templateColumns='repeat(4,1fr)' gap = {2}>
                         {weatherTable.map((item , key) => {
                              return(
                                    <GridItem w= '95%' colSpan={2}>
                                        <HStack w = '100%' justifyContent={'space-between'} fontSize={'lg'}>
                                             <Text>{item.title}</Text>
                                             <Text>{item.value}</Text>
                                        </HStack>
                                        <Divider mt = {1}/>
                                   </GridItem>
                              )
                         })}
                    </Grid>
               </VStack>
               <VStack id = "Dailyforecast" w = '100%'  alignItems={'start'} pl = {3} gap = {3} bg ='white' rounded={'md'} p = {6} boxShadow={'2xl'}>
                    <Text 
                    fontWeight={'semibold'}
                    fontSize={'xl'}
                    
                    >Dailyforecast
                    </Text>
                    <HStack w = '100%'>
                         {[0,0,0,0].map((item ,index) => {
                              return(
                                   <Box 
                                   w = '100%' 
                                   h = '200' 
                                   bg = 'gray.100' 
                                   rounded={'md'} 
                                   display={'flex'}
                                   justifyContent={'center'}
                                   alignItems={'center'}>
                                        <Text>Days</Text>
                                   </Box>
                              )
                         })}
                    </HStack>
                   
               </VStack>
         </VStack>
  )
}

export default Weather;
