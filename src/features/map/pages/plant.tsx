'use client'
import React, {useEffect , useState} from 'react'
import { 
VStack,
HStack,
Box,
Icon,
Text,
Grid,
GridItem,
Divider,
Image,
Select,
Button,
Tabs ,
TabList,
TabPanels,
TabPanel,
Tab,
} from '@chakra-ui/react';
import { Plantdata } from '../assets/Plant';
import {BsCloudSunFill , BsFillCloudRainFill} from 'react-icons/bs'
import {GiWaterDrop} from 'react-icons/gi'
import { Vtweather } from '../assets/virtualdata';
import { AvgTable } from '../assets/table';
import axios from 'axios';
import { FaChartLine } from "react-icons/fa6";
import { CoordinatesRegions } from '../assets/table';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Section
import Average from '../section/Average';
import AverageGraph from '../visual/Average';

interface Pageprops {
     vector : any
     currentNodes : any
}

const Plant : React.FC  <Pageprops>= ({vector , currentNodes}) => {
     const [tabIndex, setTabIndex] = useState(0)
     const [avgWeather ,setAvgWeather] = useState<{}>({});
     const [historical, setHistortical] = useState<any[]>([]);
     const [selected , setSelected] = useState<string>("tavg");
     const [SelectedPlant ,setSelectedPlant] = useState<[]>([]);


     const getonCallWeather = async (params:any) => {
          const options = {
               method: 'GET',
               url: 'https://meteostat.p.rapidapi.com/point/normals',
               params: {
                 lat: params.coordinates[1],
                 lon: params.coordinates[0],
                 alt: '26',
                 start: '1961',
                 end: '1990'
               },
               headers: {
                 'X-RapidAPI-Key': '8717bc28d1mshf7aaf8ea1d90295p1c29b9jsnf3bb0c2582a6',
                 'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
               }
          };

          try {
               const response = await axios.request(options);
      
               return response;
          } catch (error) {
               console.error(error);
          }
     }

     const requestWeaher = async () => {
          if(vector){
            let response = await getonCallWeather(vector);

             if(!response?.data.data.length > 0){
                    const regions = CoordinatesRegions.find((doc) => doc.regions === currentNodes.regions);
                    response = await getonCallWeather(regions)
             }
             findingAverageWeather(response.data.data) 
             const customize_response = customizeVirtualize(response.data.data)
             setHistortical(customize_response);
          }
     }


     const customizeVirtualize = (response : any) => {
          const monthlist : any = ["Jan" ,'Feb' , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"]

          const customize = response.map((item : any , i : number) => {
               item.month = monthlist[i]
               return item;
          })
          
          return customize;
     }

     const matchingPlantwithRegions = () => {
          if(!currentNodes.regions){
               return
          }
          const regions_plant = Plantdata.find((doc) => doc.region === currentNodes.regions);
          
          if(regions_plant){
               setSelectedPlant(regions_plant);
          }
     }

     const findingAverageWeather = (response: any) => {
          let sumlist : any = []
          let res_obj : any = {};
        
          for (let i = 0 ; i < response.length; i++){
               for (const k in response[i]) {  
                    if(typeof(response[i][k]) === 'string'){
                         continue;
                    }
                    if(!res_obj[k]){
                         let insert_response = response[i][k];
                         res_obj =  {...res_obj , [k] : insert_response};
                    }else{
                         let obj_sum =  res_obj[k] + Number(response[i][k]);
                         res_obj[k] = parseInt(obj_sum);
                    }
               }

               sumlist = [res_obj];
          }

          const avg_list = sumlist.map((item : any) => {
               for (const key in item) {
                 item[key] = parseInt(item[key] / response.length);
               }
               return item;
          });
          setAvgWeather(avg_list[0]);
     }

     useEffect(() => {
          if(vector){
               requestWeaher();
          }
     } , [])


     useEffect (() => {
          matchingPlantwithRegions();
     },[])

  return (
    <VStack gap = {5}>
          <VStack id = 'graph' w = '100%' h = {400} bg = 'white' rounded={'md'} alignItems={'start'} p = {5} boxShadow={'2xl'}>
               <HStack w= '100%' justifyContent={'space-between'}>
                    <Text fontSize={'xl'} fontWeight={'semibold'}>Average Weather 1 Years</Text>
                    <Button 
                    size = 'sm'
                    w={6}
                    variant={tabIndex == 1 ? 'solid' : "outline"}
                    colorScheme={tabIndex == 1 ? 'teal' : 'gray'}
                    onClick={() => setTabIndex(tabIndex == 0 ? 1 : 0)}>
                         <Icon
                         as = {FaChartLine}
                         boxSize={"15px"}
                         />
                    </Button>
               </HStack>
               <Tabs w=  '100%' index={tabIndex} >
                    <TabPanels>
                           <TabPanel>
                                {avgWeather &&
                                   <Average data={avgWeather} />
                                }
                           </TabPanel>
                           <TabPanel >
                                {historical.length > 0 &&
                                   <Box w = '100%' display={'flex'} alignItems={'center'} justifyContent={'center'}> 
                                        <AverageGraph 
                                        data= {historical} 
                                        selected= {selected}
                                        setSelected={setSelected}
                                        avg = {avgWeather}
                                        />
                                   </Box>                     
                                }
                           </TabPanel>
               </TabPanels>
               </Tabs>
          </VStack>
            <VStack w = '100%' bg = 'white' rounded={'md'} p = {5} gap = {5} boxShadow={'2xl'}>
               <VStack w= '100%' gap = {0} alignItems={'start'}>
                    <Text fontSize={'xl'} fontWeight={'semibold'}>Recomended Plant</Text>
                    <Text>regions : {currentNodes?.regions}</Text>
               </VStack>
         

               <HStack w = '100%' gap = {2}>
                    {SelectedPlant &&
                         SelectedPlant.plant?.map((item:any , key:number) =>{
                              return(
                              <VStack w = '100%' key = {key}>
                                   <Box w = '100%' h = '200px' bg = 'gray.200' rounded={'md'} overflow={'hidden'}>
                                        <Image 
                                        maxW = "100%"
                                        maxH =  "100%"
                                        w = "100%"
                                        h = "100%"
                                        objectFit = "cover"
                                        src = {item.image}
                                        />
                                   </Box>
                                   <Text fontWeight={'semibold'}>{item.name}</Text>
                              </VStack>
                              )
                         } )
                    }
               </HStack>
          </VStack>
    </VStack>
  )
}


export default Plant;