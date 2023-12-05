
import { Box , Text } from '@chakra-ui/react';
import React, {useState} from 'react'
import { useRef , useEffect } from 'react';
import { mapconfig } from './assets/config';
import { useDisclosure } from '@chakra-ui/react';

import Weathermodal from './components/weathermodal';
import Weatherdrawer from './components/weatherdrawer';
import axios from 'axios'
import * as maptilersdk from '@maptiler/sdk'
import "@maptiler/sdk/dist/maptiler-sdk.css";

interface featuresProps {

}


const MapPage : React.FC <featuresProps> = () => {
  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_CONFIG_API_KEY;
  const [map ,setMap] = useState(null);
  const mapContainer = useRef(null);


  const [currentWeather , setCurrentWhether] = useState<{}>({});
  const [currentTemp , setCurrentTemp] = useState<{}>({});
  const [currentNodes ,setCurrentNodes] = useState<{}>({});

  const [isLoading , setisLoading] = useState<boolean>(true);

  const fitCenter = {
    lat : (mapconfig.bounds[1][1] + mapconfig.bounds[0][1]) / 2, 
    lng : (mapconfig.bounds[1][0] + mapconfig.bounds[0][0]) / 2
  };

  const maxBounds = [
    [mapconfig.bounds[0][0] - 1, mapconfig.bounds[0][1] - 1],
    [mapconfig.bounds[1][0] + 1, mapconfig.bounds[1][1] + 1],
  ];


  const [vector, setVector]  = useState<{}>({
      coordinates : [],
  });

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {isOpen : isModalOpen , onOpen : onModalOpen , onClose:onModalClose} = useDisclosure();
  const currentDate = new Date().toDateString();
     

  useEffect(() => {
    const map = new maptilersdk.Map({
      container: 'map',
      style: process.env.NEXT_PUBLIC_MAP_ID,
      center: fitCenter,
      zoom: 0,
      maxBounds: maxBounds, 
      isLoading : true
    });

    let hoveredStateId : any = null;
    map.on('load', function () {
      map.addSource('states', {
        type: 'geojson',
        data: 'https://storage.googleapis.com/thailandgeometry/thailandregions.json',
      });

      map.addLayer({
        id: 'state-fills',
        type: 'fill',
        source: 'states',
        layout: {},
        paint: {
          'fill-color': '#319795',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.5,
          ],
        },
      });

      map.addLayer({
        id: 'state-borders',
        type: 'line',
        source: 'states',
        layout: {},
        paint: {
          'line-color': '#319795',
          'line-width': 2,
        },
      });
      map.on('mousemove', 'state-fills', function (e) {

        if (e.features.length > 0) {
            if (hoveredStateId) {
              map.setFeatureState(
                { source: 'states', id: hoveredStateId },
                { hover: false }
              );
            }

            hoveredStateId = e.features[0].id
            map.setFeatureState(
              { source: 'states', id: hoveredStateId },
              { hover: true }
            );
          
        }
      });
      
      map.on('mouseleave', 'state-fills', function () {
        if (hoveredStateId) {
          map.setFeatureState(
            { source: 'states', id: hoveredStateId },
            { hover: false }
          );
        }
        hoveredStateId = null;
      });

      map.on('click' , 'state-fills' , function (e) {
        const target = e.features[0].properties
        const coordinates = e.features[0].geometry.coordinates;

        if(!isOpen){
          onOpen();
        }
        setCurrentNodes({city : target.name , regions : target.regions})
        setVector((prev) => ({...prev,  coordinates : coordinates[0][0]}));
      })
    });
  
  }, []);

  
  const fetchingWeatherAPI = async () => {
    if(!vector.coordinates?.length > 0){
         console.log("Not founds Any Latitudes or Longtitudes from current Selection.");
         return
    }

    const getweather = await axios.get(`https://api.agromonitoring.com/agro/1.0/weather?lat=${vector.coordinates[1]}&lon=${vector.coordinates[0]}&appid=${process.env.NEXT_PUBLIC_API_KEY}`);

    if(getweather?.data){
         const weather : any = getweather.data;
         const temp : number = parseInt(weather.main.temp - 273.15);
         const feels_like  : number = parseInt(weather.main.feels_like - 273.15);
         const temp_max :number  = parseInt(weather.main.temp_max - 273.15)
         const temp_min :number  = parseInt(weather.main.temp_min - 273.15)
         
         setCurrentWhether(getweather.data);
         setCurrentTemp({
          ...weather.main , 
          temp : temp , 
          feels_like : feels_like,
          temp_max :temp_max,
          temp_min : temp_min, 
        });
    }
  }

  useEffect(() => {
    if(isOpen){
      fetchingWeatherAPI();
    }
  },[isOpen])

  return (
      <Box w={'100%'} h= '100vh' >
          <Box w = '100%' h = '100%'ref = {mapContainer} id = "map"></Box>
            <Weatherdrawer 
            isOpen = {isOpen} 
            onOpen = {onOpen} 
            onClose = {onClose}
            onMore = {onModalOpen}
            city ={currentNodes?.city}
            vector = {vector}
            currentDate= {currentDate}
            currentTemp  = {currentTemp}
            currentWeather = {currentWeather}
            />
          
              <Weathermodal
              isOpen = {isModalOpen} 
              onOpen = {onModalOpen}
              onClose = {onModalClose}
              currentDate = {currentDate}
              currentNodes = {currentNodes}
              vector = {vector}
              currentTemp  = {currentTemp}
              currentWeather = {currentWeather}
          />
      </Box>
    
  )
}

export default MapPage

