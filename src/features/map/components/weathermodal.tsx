import React, {useEffect, useRef , useState} from 'react'
import {
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
Button,
VStack,
HStack,
Icon,
Grid,
Box,
GridItem,
Divider,
Image,
Text,
useTab,
Tabs,
Tab,
TabList,
TabPanels,
TabPanel,
useTabsContext,
} from '@chakra-ui/react'

import { useMultiStyleConfig } from '@chakra-ui/react'
import { SunIcon } from '@chakra-ui/icons'
import { weatherTable } from '../assets/table'
import {PiPlant} from 'react-icons/pi'
import {BiWorld} from 'react-icons/bi'

import Weather from '../pages/weather'
import Plant from '../pages/plant'
import Visualize from '../pages/visualize'
interface containerProps {
     isOpen :any
     onOpen : any,
     onClose : any
     weather : any
}

const Weathermodal: React.FC  <containerProps>= ({isOpen , onClose , onOpen ,weather}) => {

     const [Tabtitle ,setTabtitle] = useState<string>('Weather');

     const CustomTab = React.forwardRef((props, ref) => {

     const tabProps = useTab({ ...props, ref })
     const isSelected = !!tabProps['aria-selected']

     const styles = useMultiStyleConfig('Tabs', tabProps)

     return (
          <Button __css={styles.tab} {...tabProps} bg = {isSelected ? 'gray.300' : ''} rounded={'md'}>
            <Box as='span'>
              
            </Box>
            {tabProps.children}
          </Button>
        )

     })
     

     useEffect(() => {
          setTabtitle("Weather");
     } , [])

  return (
     <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
     <ModalOverlay />
     <Tabs variant={'unstyled'}>
     <ModalContent bg = 'transparent' boxShadow={0} gap = {3}>
          <HStack bg = 'gray.100'  rounded={'xl'} display={'flex'}  alignItems={'center'} >
               <ModalHeader>
                    <Text w = '120px'>
                         {Tabtitle}
                    </Text>
                  
               </ModalHeader>
               <ModalCloseButton mt = {2}  />
               <Tab _selected={{ color: 'white', bg: 'teal.400' }} rounded={'md'} h = {8} w=  {9} onClick={() => setTabtitle ('Weather')}>
                    <Icon
                    as = {SunIcon}
                    />
               </Tab>
               <Tab  _selected={{ color: 'white', bg: 'teal.400' }} rounded={'md'} h = {8} w=  {9} onClick={() => setTabtitle ('Plant')}>    
               <Icon
                    as = {PiPlant}
                    />
               </Tab>
               <Tab  _selected={{ color: 'white', bg: 'teal.400' }} rounded={'md'} h = {8} w=  {9} onClick={() => setTabtitle ('Visualization')}>    
               <Icon
                    as = {BiWorld}
                    />
               </Tab>        
          </HStack>
       <ModalBody   p = {0}>
         
       <TabPanels >
               <TabPanel p = {1}>
                    <Weather weather={weather}/>
               </TabPanel>
               <TabPanel>
                    <Plant/>
               </TabPanel>
               <TabPanel>
                    <Visualize/>
               </TabPanel>
          </TabPanels>
         
       </ModalBody>
       <ModalFooter>
       </ModalFooter>
     </ModalContent>
     </Tabs>
   </Modal>
  )
}


export default Weathermodal