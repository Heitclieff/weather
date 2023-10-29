
import { Box } from '@chakra-ui/react';
import React, {useState} from 'react'
import { useRef , useEffect } from 'react';
import { mapconfig } from './assets/config';
import { useDisclosure } from '@chakra-ui/react';

import Weathermodal from './components/weathermodal';
import Weatherdrawer from './components/weatherdrawer';
import * as maptilersdk from '@maptiler/sdk'
import "@maptiler/sdk/dist/maptiler-sdk.css";


interface featuresProps {

}


const MapPage : React.FC <featuresProps> = () => {

  maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_CONFIG_API_KEY;
  const [map ,setMap] = useState(null);
  const mapContainer = useRef(null);

  const fitCenter = {
    lat : (mapconfig.bounds[1][1] + mapconfig.bounds[0][1]) / 2, 
    lng : (mapconfig.bounds[1][0] + mapconfig.bounds[0][0]) / 2
  };

  const maxBounds = [
    [mapconfig.bounds[0][0] - 1, mapconfig.bounds[0][1] - 1],
    [mapconfig.bounds[1][0] + 1, mapconfig.bounds[1][1] + 1],
  ];

  const [isLoading , setisLoading] = useState<boolean>(true);
  const [city ,setCity] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {isOpen : isModalOpen , onOpen : onModalOpen , onClose:onModalClose} = useDisclosure();


  useEffect(() => {
    const map = new maptilersdk.Map({
      container: 'map',
      style: process.env.NEXT_PUBLIC_MAP_ID,
      center: fitCenter,
      zoom: 0,
      maxBounds: maxBounds, 
      isLoading : true
    });

    let hoveredStateId = null;
    map.on('load', function () {
      map.addSource('states', {
        type: 'geojson',
        data: 'https://storage.googleapis.com/thailandgeometry/thailandapi.json',
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
        if(!isOpen){
          onOpen();
        }
        setCity(target.name)
      })
    });
  
  }, []);
  
  return (
      <Box w={'100%'} h= '100vh' >
          <Box w = '100%' h = '100%'ref = {mapContainer} id = "map"></Box>
          <Weatherdrawer 
          isOpen = {isOpen} 
          onOpen = {onOpen} 
          onClose = {onClose}
          onMore = {onModalOpen}
          weather={city}
          />
          <Weathermodal
              isOpen = {isModalOpen} 
              onOpen = {onModalOpen}
              onClose = {onModalClose}
              weather={city}
          />
          
      </Box>
    
  )
}

export default MapPage

