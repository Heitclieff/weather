import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface visualProps {
     data : any
     selected : string
}

const HourlyGraph: React.FC <visualProps> = ({data , selected}) => {
  return (
       <AreaChart
            width={700}
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
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={selected} stroke="#285E61" fill="#319795" />
       </AreaChart>
  )
}


export default HourlyGraph;
