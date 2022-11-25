import * as React from 'react';

import { useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import PlacesAutocomplete, { getLatLng } from 'react-places-autocomplete';
import { getGeocode } from 'use-places-autocomplete';

import styles from './Header.module.css'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar({ setCoordinates }) {

  const [address, setAddress] = useState("")
  const [mouseEnter, setMouseEnter] = useState(false)

  const handleChange = (value) => {
    setAddress(value)
  }

  const handleSelect = async (value) => {
    setAddress(value)
    const result = await getGeocode({address})
    const {lat, lng} = await getLatLng(result[0])
    setCoordinates({lat, lng})
  }

  const handleClick = async (address) => {
    handleChange(address)
    const result = await getGeocode({address})
    const {lat, lng} = await getLatLng(result[0])
    setCoordinates({lat, lng})
    setMouseEnter(false)
  }

  const searchChangeHandler = () => {
    setMouseEnter(true)
  }

  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="fixed" >
        <Toolbar className={styles.appBar}>
        <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block' } }}
          >
            Travel Guide
          </Typography>
          <Box className={styles.exploreBox}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography
            variant="h8"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }

          }
          >
            Explore new place
          </Typography>
          <Search onChange={searchChangeHandler}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <PlacesAutocomplete value={address} onChange={handleChange} onSelect={handleSelect}>

              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                return(
                <>
                  <div>
                    <StyledInputBase
                      {...getInputProps({
                      placeholder: 'Search...'
                      })}
                    />
                  </div>
                  <div className={ mouseEnter ?  `${styles.suggestionContainer}` : `${styles.suggestionContainer_invisible}` }>
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, i) => {

                      const style = suggestion.active ? {background: "#72448f", cursor: "pointe", margin: '5px 0', fontSize: '12px'} : {      display: "block", color: "#000000", cursor: "pointer", margin: '5px 0', fontSize: '12px'}

                      return(
                        <div className={styles.suggestiovDiv} key={i} 
                        {...getSuggestionItemProps(suggestions, {style})} onClick={() => {
                          handleClick(suggestion.description)
                        }}>
                          {suggestion.description}
                        </div>
                      )
                    })

                    }
                  </div>
                </>
                )
              }}
            </PlacesAutocomplete>
          </Search>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
