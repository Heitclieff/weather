'use client'

import React from 'react'
import { Wrapper } from '@googlemaps/react-wrapper'

interface featuresProps {

}

const MapPage : React.FC <featuresProps> = () => {

  return (
    <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <div>Hello</div>
    </Wrapper>
    
  )
}

const Mapbeta = () =>{
  return(
    <div>Maps</div>
  )
}

export default MapPage