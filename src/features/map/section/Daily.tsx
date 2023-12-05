import React, {useState} from 'react'
import { VStack } from '@chakra-ui/react'
import DailyGraph from '../visual/Daily'

interface sectionProps {
  data : any
}
const Daily : React.FC <sectionProps> = ({data}) => {
  const [selected ,setSelected] = useState<string>("tavg"); 

  return (
    <VStack w= '100%' >
      <DailyGraph data=  {data} selected={selected}/>
    </VStack>
  )
}


export default Daily;