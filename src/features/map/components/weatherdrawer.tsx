import React from 'react'
import {
Drawer , 
DrawerOverlay,
DrawerContent,
DrawerCloseButton,
DrawerHeader,
DrawerBody,
Input,
DrawerFooter,
Button,
VStack,
HStack,
Icon,
Text,
Box,
} from '@chakra-ui/react'
import { SunIcon } from '@chakra-ui/icons'

interface containerprops {
     isOpen : any,
     onOpen : any,
     onClose : any,
     onMore : any
     weather : any

}
const Weatherdrawer : React.FC <containerprops> =  ({isOpen , onOpen , onClose , weather , onMore}) => {
  return (
     <>
     <Drawer
       isOpen={isOpen}
       placement='right'
       onClose={onClose}
       size={'sm'}
     >
       <DrawerOverlay />
       <DrawerContent bg = 'transparent' boxShadow={0} mr = {3} mt = {5}>
          <VStack 
          w = '100%'
          h= 'fit-content' 
          p = {2} 
          bg= 'white' 
          rounded={'md'} 
          pt ={5} 
          pl = {2} 
          display = "flex" 
          boxShadow={1}
          alignItems={'start'} >
               <DrawerCloseButton />
               <DrawerHeader >{weather}</DrawerHeader>
               <DrawerBody w = '100%'>
               <HStack gap = {5} justifyContent={'space-between'}>
                    <HStack>
                         <Icon 
                         as = {SunIcon}
                         boxSize={16}
                         color = "yellow.400"
                         />
                         <VStack>
                              <Text 
                              fontSize= '2xl'
                              fontWeight={'semibold'}
                              textAlign={'center'}>
                                   35°C
                              </Text>
                         </VStack>
                    </HStack>
                   
                    <VStack w = '100%' alignItems={'end'} justifyContent={'flex-end'} gap= {0}>
                         <Text fontWeight={'semibold'}>Weathers</Text>
                         <Text >Mondays 21:00</Text>
                    </VStack>
               </HStack>
               <HStack mt = {6}>
                    {['wind','rain','moisture'].map((item) =>
                         <Box w = '100%' h= '90px' bg=  'gray.200' rounded={'md'} display= 'flex' alignItems={'center'} justifyContent={'center'}>
                         <Text>{item}</Text>
                         </Box>
                    )}
               </HStack>
               <Text textAlign={'center'} mt = {5} textDecoration={'underline'} cursor={'pointer'} onClick={() => {onMore(); onClose()}}>view more</Text>
               </DrawerBody>
               
          </VStack>
         
       </DrawerContent>
     </Drawer>
   </>
  )
}


export default Weatherdrawer;