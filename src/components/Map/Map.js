import React from 'react'
import GoogleMapReact from 'google-map-react'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useMediaQuery, Typography, Rating, Box } from '@mui/material';

import styles from './Map.module.css'

export default function Map({places, setCoordinates, setBounds, coordinates, setSelectedDiv}) {

  const isDesktop = useMediaQuery('(min-width: 600px)')

  const selectedDiv = (divId) => {
    setSelectedDiv(divId)
  }

  const MyMarker = ({place}) => <div onClick={() => {
    selectedDiv(place.location_id)
  }}>
    {
      !isDesktop ? (<LocationOnIcon style={{color: 'red'}} />) : (
        <Box sx={{
          position: 'absolute',
          width: '110px',
          borderRadius: '5px',
          backgroundColor: 'rgb(245, 245, 245)',
          border: '1px solid grey',
          padding: '2px',
          opacity: '1',
          zIndex: '1',
          '&:hover': {
            backgroundColor: 'rgb(255, 255, 255)',
            opacity: '1',
            cursor: 'pointer',
            zIndex: '999',
          },
        }} >
          <Typography variant='subtitle2' margin='2%'>{place.name}</Typography>
          <img style={{width: '100%'}} src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} alt={place.name}
          />
          <Rating size='small' value={Number(place.rating)} readOnly/>
        </Box>
      )
    }
  </div>;

  return (
    <div className={styles.mapContainer}>
          <GoogleMapReact
              bootstrapURLKeys={{ 
                key: "AIzaSyBRlKzbIv_gum9VgP09K0cnDtYiGEb_-uo",
             }}
            defaultCenter ={[0, 0]}
            center={coordinates}
            defaultZoom={14}
            onChange={(e) => {
              setCoordinates({ lat: e.center.lat, lng: e.center.lng })
              setBounds({ ne: e.bounds.ne, sw: e.bounds.sw })
            }}
          >
          {places?.filter((place) => place.latitude && place.longitude).map((place, i) => {
            return(
              <MyMarker
              lat={place.latitude}
              lng={place.longitude}
              key={i}
              place={place}
              id={place.location_id}
              >
              </MyMarker>
            )
          })}
          </GoogleMapReact>
        </div>
  )
}
