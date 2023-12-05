import React, { useEffect, useState } from 'react'
import { Box, Select, VStack , Text ,HStack } from '@chakra-ui/react'
import HourlyGraph from '../visual/Hourly'

interface sectionProps {
     data : any
     currentDate : string
}
const Hourly : React.FC <sectionProps> = ({data , currentDate}) => {
     const [selected ,setSelected] = useState<string>("temp"); 

  return (
     <VStack w= '100%' >
          <HStack w = '100%' justifyContent={'space-between'}>
               <Select  onChange={(e) => setSelected(e.target.value)}>
                    {data.length > 0 &&
                         Object.keys(data[0]).map((item:string ,key:number) => {
                              if(item === "time" || item == "snow" || item == "wpgt" || item === "tsun"){
                                   return
                              }
                              return (
                                   <option key = {key} value={item}>{item}</option>
                              )
                         })
                    }
               </Select>
          </HStack>
          <HourlyGraph data= {data} selected = {selected}/>
     </VStack>
  )
}

export default Hourly;
