import React, { useEffect, useState } from 'react'
import {
VStack,
HStack,
Icon,
Grid,
Box,
GridItem,
Divider,
Image,
Text,
} from '@chakra-ui/react'
import { SunIcon } from '@chakra-ui/icons'
import { weatherTable } from '../assets/table'
import {BsCloudSunFill , BsCloudMoonFill   , BsFillCloudRainFill} from 'react-icons/bs'
import { FaCloudMoonRain } from "react-icons/fa";
import axios from 'axios'
import { weatherAnimation } from '../assets/table'

interface pageProps {
     city : any
     vector :any 
     currentTemp : any
     currentWeather : any
}

const Weather : React.FC <pageProps> = ({city , currentTemp , currentWeather , vector}) => {
     const [ObjectTable , setObjectTable] = useState<any[]>([]);
     const [ObjectForecast , setObjectForecast] = useState<any[]>([]);
     const [displayAssets ,setDisplayAssets] = useState<{}>({});
  
     const getForecastWeather = async () => {
          try{
               const getweather = await axios.get(`https://api.agromonitoring.com/agro/1.0/weather/forecast?lat=${vector.coordinates[1]}&lon=${vector.coordinates[0]}&appid=${process.env.NEXT_PUBLIC_API_KEY}`);     
               const dateObject = new Date(getweather.data[4].dt * 1000);
               const formattedDateTime = dateObject.toUTCString();
               
               setObjectForecast(getweather.data.slice(0,6));
          }catch(error){
               console.log("Error: failed to get Forecast from API" , error.title);
          }
       
     }

     const fidingIsNight = (time : any) => {
          const dateObject = new Date(time * 1000);
          const hours = dateObject.getHours();
     
          const formattedHour = `${hours % 12 || 12} ${hours >= 12 ? 'PM' : 'AM'}`;
          let isNight = false
 
          if(((hours % 12 || 12) > 6 && hours >= 12) || ((hours % 12 || 12) < 7 && hours <= 12)){
               isNight = true;
          }

          return [isNight , formattedHour]
     }

     const CheckCurrentWeather = () =>{ 
          const current : any = weatherAnimation?.find((doc) => doc.title === currentWeather.weather?.[0].main)
          const dateObject = new Date();
          const hours = dateObject.getHours();

          let isnight = false
     
          let selected_assets = current.assets_days;
          const raining = currentWeather.weather?.[0].main == 'Rain';

          if(hours >= 19 || hours <= 6){
               selected_assets = current.assets_night;
               isnight = true;
          }

          setDisplayAssets({
               src : selected_assets , 
               isnight : isnight  , 
               raining : raining
          });
     }

     const matchingArrayObject = () => {
  
          if(typeof(currentTemp) === "object"){
               const array_value = [
                    `${currentTemp?.temp_max}/${currentTemp?.temp_min}`,
                    `${currentTemp?.humidity} %`,
                    `${currentTemp?.pressure} mb`,
                    `${currentWeather.clouds?.all} %`,
                    `${currentWeather.wind?.speed} mph`,
                    `${currentWeather.weather?.[0].description}`
               ]
     
               weatherTable.forEach((key,index) => {
                   key['value'] =  array_value[index]
               })

          
               setObjectTable(weatherTable);
          }
     }


     const renderForecast = () => {
     
          return ObjectForecast.map((item : any, index : number) => {
               const raining = item.rain?.['3h'] > 1;
               const formatedTemp = parseInt(item.main.temp - 273.15);
          
               const [isNight ,formattedHour]= fidingIsNight(item.dt);
               return (
                    <VStack
                      key={index}
                      w='150px'
                      h='200'
                      bg='gray.100'
                      rounded={'md'}
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                         
                         <Text>
                              {formattedHour}
                              </Text>
                         <Box>
                              <Icon
                              as = {raining ? isNight ? FaCloudMoonRain :  BsFillCloudRainFill : isNight ? BsCloudMoonFill :  BsCloudSunFill}
                              boxSize={50}
                              />
                         </Box>
                         <Text fontWeight={'semibold'}>{formatedTemp+ "°"}</Text>
                    </VStack>
               )
          })
     }

     useEffect(() => {
          getForecastWeather()
     },[])

     useEffect(() => {
          CheckCurrentWeather();
     },[])
     useEffect(() => {
          if(currentWeather && currentTemp){
               matchingArrayObject();
          }
     } ,[])

  return (
     <VStack  gap = {5}>
               <HStack 
               w = '100%' 
               h = {150} 
               position={'relative'}
               rounded={'md'}   
               overflow={'hidden'}  
               justifyContent = 'center' 
               p = {7} 
               gap = {0} 
               color={'white'}
               boxShadow={'2xl'}
               
               >
                    <VStack w = '100%'  alignItems={'center'}>
                         <HStack justifyContent={'space-between'} w = '100%' >
                              <VStack>
                                   <Text 
                                   fontSize= '4xl'
                                   fontWeight={'semibold'}
                                   textAlign={'center'}>
                                      {currentTemp.temp + "°"}
                                   </Text>
                              </VStack>
                         </HStack>
                         <VStack w = '100%' alignItems={'start'} >
                              <Text fontSize={'xl'} fontWeight={'semibold'}>{city}</Text>
                         </VStack>
                    </VStack>
                    {displayAssets &&
                         <Icon 
                           as = {displayAssets.raining ? displayAssets.isnight ? FaCloudMoonRain :  BsFillCloudRainFill : displayAssets.isnight  ? BsCloudMoonFill :  BsCloudSunFill}
                           boxSize={16}
                         />
                    }
                    <Box w ='100%' h = 'auto' position={'absolute'} zIndex={-1} bg = 'gray.500' >
                              {displayAssets &&
                                <Image 
                                maxW={'100%'}
                                maxH={'100%'}
                                w={'100%'}
                                h={'100%'}
                                opacity={0.6}
                                objectFit={'cover'}
                                src = {displayAssets?.src}
                                />
                              }
                            
                         </Box>
                      
               </HStack>
               <VStack w = '100%' alignItems={'start'} pl = {3} bg ='white' rounded={'md'} p = {6} boxShadow={'2xl'}>
                    <Text>Feels Like</Text>
                    <Text 
                              fontSize= '4xl'
                              fontWeight={'semibold'}
                              textAlign={'center'}>
                                  {currentTemp.feels_like + "°"}
                              </Text>
                    <Grid w = '100%'  templateColumns='repeat(4,1fr)'  gap = {2}>
                         {ObjectTable.map((item , key) => {
                              return(
                                    <GridItem w= '100%' colSpan={2}>
                                        <HStack w = '100%' justifyContent={'space-between'} fontSize={'lg'}>
                                             <Text>{item.title}</Text>
                                             <Text>{item.value}</Text>
                                        </HStack>
                                        <Divider mt = {1}/>
                                   </GridItem>
                              )
                         })}
                    </Grid>
               </VStack>
               <VStack overflow={'auto'} id = "Dailyforecast" w = '100%'  alignItems={'start'} pl = {3} gap = {3} bg ='white' rounded={'md'} p = {6} boxShadow={'2xl'}>
                    <Text 
                    fontWeight={'semibold'}
                    fontSize={'xl'} 
                    >Dailyforecast
                    </Text>
                    <HStack  overflowX={'auto'}>
                         {renderForecast()}
                    </HStack>
                   
               </VStack>
         </VStack>
  )
}

export default Weather;
