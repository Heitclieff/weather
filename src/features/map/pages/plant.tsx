import React from 'react'
import { 
VStack,
HStack,
Box,
Icon,
Text,
Image,
} from '@chakra-ui/react';
import { Plantdata } from '../assets/Plant';
import {BsCloudSunFill , BsFillCloudRainFill} from 'react-icons/bs'
import {GiWaterDrop} from 'react-icons/gi'
interface Pageprops {

}

const Plant : React.FC  <Pageprops>= () => {
  return (
    <VStack gap = {5}>
          <VStack id = 'graph' w = '100%' h = '250' bg = 'white' rounded={'md'} alignItems={'start'} p = {5} boxShadow={'2xl'}>
               <Text fontSize={'xl'} fontWeight={'semibold'}>Average Weather 1 Years</Text>
               <HStack w = '100%' h = '100%' p = {10}>
                    <Box w = '100%'  h=  '60%' display = 'flex' justifyContent={'center'} alignItems={'center'}>
                         <Text fontSize={'5xl'} fontWeight={'semibold'}>35° <Icon as = {BsCloudSunFill}/></Text>
                    </Box>
                    <Box w = '100%'  h=  '60%' display = 'flex' justifyContent={'center'} alignItems={'center'}>
                         <Text fontSize={'5xl'} fontWeight={'semibold'}>20% <Icon as = {BsFillCloudRainFill}/></Text>
                    </Box>
                    <Box w = '100%'  h=  '60%' display = 'flex' justifyContent={'center'} alignItems={'center'}>
                         <Text fontSize={'5xl'} fontWeight={'semibold'}>71%<Icon as = {GiWaterDrop}/></Text>
                    </Box>
               </HStack>
              
          </VStack>


          <VStack w = '100%' bg = 'white' rounded={'md'} p = {5} gap = {5} boxShadow={'2xl'}>
               <VStack w= '100%' gap = {0} alignItems={'start'}>
                    <Text fontSize={'xl'} fontWeight={'semibold'}>Recomended Plant</Text>
                    <Text>regions : North</Text>
               </VStack>
         

               <HStack w = '100%' gap = {2}>
                    {Plantdata[0].plant.map((item , key) => 
                    <VStack w = '100%'>
                         <Box w = '100%' h = '200px' bg = 'gray.200' rounded={'md'} overflow={'hidden'}>
                              <Image 
                                maxW = "100%"
                                maxH =  "100%"
                                w = "100%"
                                h = "100%"
                                objectFit = "cover"
                                src = {item.image}
                              />
                         </Box>
                         <Text fontWeight={'semibold'}>{item.name}</Text>
                    </VStack>
                        
                    ) }
                    
               </HStack>
          </VStack>
    </VStack>
  )
}


export default Plant;