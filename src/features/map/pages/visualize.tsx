import React from 'react'
import { 
VStack,
HStack,
Box,
Icon,
Text,
Image,
} from '@chakra-ui/react';
interface pageProps {

}

const Visualize : React.FC <pageProps> = () => {
  return (
    <VStack gap = {5}>
          <VStack id = "weather" w = '100%' bg = 'white' rounded={'md'} boxShadow={'2xl'} p = {5} gap = {5}>
               <Text fontSize={'xl'} fontWeight={'semibold'}>Weather Visualize</Text>
               <Box>
                    <Image src = "https://www.researchgate.net/profile/Prem-Rangsiwanichpong/publication/323770731/figure/fig5/AS:631499397292032@1527572597278/figure-fig5_Q320.jpg"/>
               </Box>
          </VStack>
          <VStack id = "plant"  w = '100%' bg = 'white' rounded={'md'} boxShadow={'2xl'} p = {5}>
          <Text fontSize={'xl'} fontWeight={'semibold'}>Plant Growing Rate</Text>
               <Box>
                    <Image src = "https://www.researchgate.net/publication/232709084/figure/fig1/AS:300596172214272@1448679120049/Average-plant-growth.png"/>
               </Box>
          </VStack>
    </VStack>
  )
}

export default Visualize;
