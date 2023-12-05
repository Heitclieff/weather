import React from 'react';
import { 
VStack,
Select,
Box,
} from '@chakra-ui/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AvgTable } from '../assets/table';

interface visualProps {
  data : any
  selected : string
  avg : any
  setSelected : any
}

const AverageGraph : React.FC <visualProps> = ({data  , avg,  selected , setSelected}) => {
  return (
    <VStack w='100%' bg='white' rounded={'md'}>

    <Box w="100%">
         <Box w='250px'>
              {selected &&
                 <Select value={selected} onChange={(e) => setSelected(e.target.value)}>
                      {avg &&
                           Object.keys(avg)?.map((item: any, key: number) => {
                                const variable = ['', 'mm', 'hPa', '°', '°', '°', '', 'km/h']

                                if(item == "month"){
                                     return
                                }
                                return (
                                     <option value={item}>{`${AvgTable[key]} (${item})`}</option>
                                )
                           }
                      )}
                 </Select>
              }
         </Box>
    </Box>
         <AreaChart
              width= {700}
              height={250}
              data={data}
              margin={{
                   top: 10,
                   right: 30,
                   left: 0,
                   bottom: 0
              }}
         >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey={selected} stroke="#285E61" fill="#319795" />
         </AreaChart>
</VStack>
  )
}


export default AverageGraph;