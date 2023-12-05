import React, { useEffect , useState } from 'react'
import { 
VStack,
HStack,
Box,
Icon,
Text,
Image,
} from '@chakra-ui/react';
import axios from 'axios';
import Hourly from '../section/Hourly';
import Daily from '../section/Daily';

interface pageProps {
     vector : any
     currentDate : any
}


const Visualize : React.FC <pageProps> = ({vector , currentDate}) => {
     const [hourly , setHourly] = useState<{}>({});
     const [daily, setDaily] = useState<{}>({});
     const [prediction ,setPrediction] = useState<string>("");
  

     const getDate = () => {
          const startDate = new Date();
          const sevenDaysAgo = new Date(startDate);
          sevenDaysAgo.setDate(startDate.getDate() - 7);
          
          const startDay = startDate.getDate();
          const sevenDaysAgoDay = sevenDaysAgo.getDate();

          const startMonth = startDate.getMonth() + 1;
          const sevenDaysAgoMonth = sevenDaysAgo.getMonth() + 1;
          const startYear = startDate.getFullYear();
          const sevenDaysAgoYear = sevenDaysAgo.getFullYear();
          
          const formattedStartDate = startYear + '-' + (startMonth < 10 ? '0' : '') + startMonth + '-' + (startDay < 10 ? '0' : '') + startDay;
          const formattedSevenDaysAgo = sevenDaysAgoYear + '-' + (sevenDaysAgoMonth < 10 ? '0' : '') + sevenDaysAgoMonth + '-' + (sevenDaysAgoDay < 10 ? '0' : '') + sevenDaysAgoDay;
          
          if(!prediction){
               setPrediction(formattedSevenDaysAgo+  " to " + formattedStartDate)
          }
          return [formattedStartDate , formattedSevenDaysAgo]
     }

     const fetchingDailyWeather = async () => {
          const[formattedStartDate , formattedSevenDaysAgo] = getDate();

          let options = {
               method: 'GET',
               url: 'https://meteostat.p.rapidapi.com/point/daily',
               params: {
                 lat: vector.coordinates[1],
                 lon: vector.coordinates[0],
                 start: formattedSevenDaysAgo,
                 end: formattedStartDate,
                 alt : '184'
               },

               headers: {
                 'X-RapidAPI-Key': '8717bc28d1mshf7aaf8ea1d90295p1c29b9jsnf3bb0c2582a6',
                 'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
               }
          };

          try {
               const response = await axios.request(options);
               setDaily(response.data.data);

          } catch (error) {
               console.error(error);
          }
     }

     const convertToHourFormat = (timeString :string) => {
          const dateTime = new Date(timeString);
          const hours = dateTime.getHours();

          const period = hours >= 12 ? 'PM' : 'AM';
          const formattedHours = hours % 12 || 12;

          const formattedDateTime = `${formattedHours} ${period}`;
          return formattedDateTime;
     }

     const customizeXAxist = (response : any) => {
          const split_res =  response.map((item : any) => {
               item.time = convertToHourFormat(item.time)
               
               return item;
          })
     }

     const fetchingHourlyWeather = async () => {
          const options = {
          method: 'GET',
          url: 'https://meteostat.p.rapidapi.com/point/hourly',
          params: {
          lat: vector.coordinates[1],
          lon:  vector.coordinates[0],
          start: '2023-12-04',
          end: '2023-12-04',
          alt: '113',
          tz: 'America/Toronto'
          },
          headers: {
          'X-RapidAPI-Key': '8717bc28d1mshf7aaf8ea1d90295p1c29b9jsnf3bb0c2582a6',
          'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
          }
          };

          try {
               const response = await axios.request(options);
               customizeXAxist(response.data.data);
               setHourly(response.data.data);
          } catch (error) {
               console.error(error);
          }
     }

     useEffect(() => {
          if(!hourly.exists){
               fetchingHourlyWeather();
          }
     },[])

     useEffect(() => {
          if(!daily.exists){
               fetchingDailyWeather();
          }
     },[])

  return (
    <VStack gap = {5}>
          <VStack id = "weather" w = '100%' bg = 'white' rounded={'md'} boxShadow={'2xl'} p = {5}>
               <Text fontSize={'xl'} fontWeight={'semibold'}>Hourly Forecast</Text>
               <Text>{currentDate}</Text>
                    {hourly?.length > 0 &&
                         <Hourly data= {hourly} currentDate= {currentDate}/>
                    }
          </VStack>
          <VStack id = "plant"  w = '100%' bg = 'white' rounded={'md'} boxShadow={'2xl'} p = {5}>
          <Text fontSize={'xl'} fontWeight={'semibold'}>Compare Daily Forecast</Text> 
          <Text>{prediction}</Text>
               {daily?.length > 0 &&
                    <Daily data = {daily}/>
               }
          </VStack>
    </VStack>
  )
}

export default Visualize;
