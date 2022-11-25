import React from 'react'

import { Typography, FormControl, Select, InputLabel, MenuItem, Grid, CircularProgress} from '@mui/material'

import PlaceDetails from '../PlaceDetails/PlaceDetails'

import styles from './List.module.css'

export default function List({ places, isLoading, selectedDiv, type, setType, rating, setRating }) {
  return (
    <div className={styles.listContainer}>
        <Typography variant='h6'>
        Restaurants, Hotels & Attractions around you
        </Typography>

        {isLoading ? (
        <div>
          <CircularProgress/>
        </div>) : (
          <>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 80}}>
                <InputLabel>Type</InputLabel>
                <Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value)
                }}
                autoWidth
                >
                <MenuItem value="restaurants">Restaurants</MenuItem>
                <MenuItem value="hotels">Hotels</MenuItem>
                <MenuItem value="attractions">
                  Attractions
                </MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                <InputLabel>Ranking</InputLabel>
                <Select
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value)
                }}
                autoWidth
                >
                <MenuItem value={0}>All</MenuItem>
                <MenuItem value={3}>Above 3.0</MenuItem>
                <MenuItem value={4}>Above 4.0</MenuItem>
                <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
              </FormControl>
            </div>
              <Grid container spacing={3}>
                {places?.map((place, i) => {
                  return(
                    <Grid item key={i} style={{width: '100%', margin: '0 20px'}}>
                      <PlaceDetails
                      place={place}
                      selectedDiv={selectedDiv}
                      id={place.location_id}
                      />
                    </Grid>
                  )
                })}
              </Grid>
          </>
        )}
    </div>
  )
}
