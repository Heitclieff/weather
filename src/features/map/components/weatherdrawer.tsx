import React, { useEffect , useState } from 'react'
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

import { WiCloudyWindy } from "react-icons/wi";
import { MdOutlineWaterDrop } from "react-icons/md";
import {BsCloudSunFill , BsFillCloudRainFill} from 'react-icons/bs'

interface containerprops {
     isOpen : any,
     onOpen : any,
     onClose : any,
     onMore : any
     city : any
     vector : any
     currentTemp : any
     currentWeather : any
     currentDate : any

}
const Weatherdrawer : React.FC <containerprops> =  ({isOpen , onOpen , onClose , city , vector , onMore ,currentTemp , currentWeather , currentDate}) => {
     return (
          <>
               <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    size={'sm'}
               >
                    <DrawerOverlay />
                    <DrawerContent bg='transparent' boxShadow={0} mr={3} mt={5}>
                         <VStack
                              w='100%'
                              h='fit-content'
                              p={2}
                              bg='white'
                              rounded={'md'}
                              pt={5}
                              pl={2}
                              display="flex"
                              boxShadow={1}
                              alignItems={'start'} >
                              <DrawerCloseButton />
                              <DrawerHeader >{city}</DrawerHeader>
                              <DrawerBody w='100%'>
                                   <HStack gap={5} justifyContent={'space-between'}>
                                        <HStack justifyContent={'center'} alignItems={'center'}>
                                             <Icon
                                                  as={BsCloudSunFill}
                                                  boxSize={16}
                                             />
                                             <VStack justifyContent={'center'}>
                                                  <Text
                                                       fontSize='2xl'
                                                       fontWeight={'semibold'}
                                                       textAlign={'center'}>
                                                       {currentTemp?.temp &&
                                                            currentTemp.temp + "°C"
                                                       }
                                                  </Text>
                                             </VStack>
                                        </HStack>

                                        <VStack w='100%' alignItems={'end'} justifyContent={'flex-end'} gap={0}>
                                             <Text fontWeight={'semibold'}>Weathers</Text>
                                             <Text >{currentDate}</Text>
                                        </VStack>
                                   </HStack>
                                   <HStack mt={6} justifyContent={'space-between'}>
                                        <HStack>
                                             <Box >
                                                  <WiCloudyWindy size={55} />
                                             </Box>
                                             <VStack alignItems={'flex-start'} pl={3}>
                                                  <Text fontWeight={'semibold'} fontSize={'xl'}>Winds</Text>
                                                  <Text>Speeds : {currentWeather.wind?.speed} mph</Text>
                                             </VStack>
                                        </HStack>

                                        <HStack>
                                             <Box >
                                                  <MdOutlineWaterDrop size={55} />
                                             </Box>
                                             <VStack alignItems={'flex-end'} pl={3}>
                                                  <Text fontWeight={'semibold'} fontSize={'xl'}>Humidity</Text>
                                                  {currentTemp?.temp &&

                                                       <Text>{currentTemp.humidity + " %"}</Text>
                                                  }
                                             </VStack>
                                        </HStack>
                                   </HStack>
                                   <Button w='100%' mt={5} colorScheme='teal' onClick={() => { onMore(); onClose() }}>View More</Button>

                              </DrawerBody>

                         </VStack>

                    </DrawerContent>
               </Drawer>
          </>
  )
}


export default Weatherdrawer;