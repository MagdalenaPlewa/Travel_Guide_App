import React from "react";
import { useState, useEffect } from "react";

import { CssBaseline, Grid } from "@mui/material";

import Header from "./components/Header/Header";
import Map from "./components/Map/Map";
import List from "./components/List/List";

import { getPlacesDetails } from "./components/api";

function App() {
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState()
  const [coordinates, setCoordinates] = useState({})
  const [bounds, setBounds] = useState(null)
  const [selectedDiv, setSelectedDiv] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState('0')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude} }) => {
      setCoordinates({lat: latitude, lng: longitude})
    })
  }, [])

  useEffect(() => {
    const filterPlaces = places.filter((place) => 
      place.rating > rating
    )
    setFilteredPlaces(filterPlaces)
  }, [rating])

  useEffect(() => {
    if(bounds){
      setIsLoading(true)

      getPlacesDetails(type, bounds)
      .then((data) => {
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
        setFilteredPlaces([])
        setRating('0')
        setIsLoading(false)
      })
    }

  }, [type, bounds])

  return (
    <>
    <CssBaseline />
      <Header
      setCoordinates={setCoordinates}
      />
      <Grid container>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            places={filteredPlaces?.length ? filteredPlaces : places}
            selectedDiv={selectedDiv}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces?.length ? filteredPlaces : places}
            setSelectedDiv={setSelectedDiv}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
