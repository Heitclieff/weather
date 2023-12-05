import React from 'react'
import { AreaChart, Area, LineChart , Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

interface visualProps {
     data : any
     selected : string
}

const DailyGraph :  React.FC <visualProps>= ({data, selected}) => {

  return (
       <AreaChart
            width={700}
            height={300}
            data={data}
            margin={{
                 top: 10,
                 right: 30,
                 left: 0,
                 bottom: 0
            }}
       >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" label={{fontSize : 12}} style={{ fontSize: 14 }}/>
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey={selected} stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="tmin" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="tmax" stackId="1" stroke="#ffc658" fill="#ffc658" />
       </AreaChart>
  )
}

export default DailyGraph;
