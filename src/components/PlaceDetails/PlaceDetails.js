import React from 'react'
import { useRef, useState } from 'react';

import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Rating, Chip} from '@mui/material'

import { Stack } from '@mui/system'

import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function PlaceDetails({ place, id, selectedDiv }) {

  const [divRef, setDivRef] = useState()
  const revealRefs = useRef([])
  revealRefs.current = []

  const addtoRefs = (el) => {
    if(el && !revealRefs.current.includes(el)){
      revealRefs.current.push(el)
      if(revealRefs.current[0].id === selectedDiv){
        setDivRef(revealRefs)
        divRef?.current[0].scrollIntoView({behavior: "smooth", block: 'center'})
      }
    }
  }

  return (
    <div id={id} ref={addtoRefs}>
      <Card elevation={6}>
      <CardMedia
        component="img"
        height="240"
        image={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
        alt={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant='subtitle'>
            Price
          </Typography>
          <Typography gutterBottom variant='subtitle'>{place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Rating size='medium' value={Number(place.rating)} readOnly/>
          <Typography gutterBottom variant='subtitle'>out of {place.num_reviews} reviews
          </Typography>
        </Box>
        <Stack direction="row" spacing={2} >
        {
          place?.cuisine?.map(({ name }) => {
            return(

                <Chip key={name} label={name}/>
            )
          })
        }
        </Stack>
        {
          place?.address && (
            <Typography color="textSecondary">
              <LocationOnIcon/> {place.address}
            </Typography>
          )
        }
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => {window.open(place.website, '_blank')}}>Web side</Button>
      </CardActions>
      </Card>
    </div>
  )
}
