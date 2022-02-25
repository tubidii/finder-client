import React from 'react'
import MapGL, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as MuiIcons from '@mui/icons-material'
import { ArrowBack } from '@mui/icons-material'
import { Button, Fab } from "@mui/material";
import Link from "next/link";
import { useState } from 'react'

const Map = () => {
  const icon = 'LocationOnTwoTone'
  const MarkerIcon = MuiIcons[icon];
  navigator.geolocation.getCurrentPosition(
    position => {
      console.log(position)
    })
    return (
      <div>
        <MapGL
          {...{
            width: "100vw",
            height: "100vh",
            latitude: 0.0236,
            longitude: 37.9062,
            zoom: 7
          }}
          mapboxApiAccessToken={'pk.eyJ1IjoibWFraW5pa2EiLCJhIjoiY2t5cG43bzlsMGJtdzJvbWQ0dDlpejYyMyJ9.3KsXUjhmbYsDpskSKNnfDQ'}
          mapStyle="mapbox://styles/mapbox/dark-v10"

        >

          <Marker
            longitude={-1.1486878318771425}
            latitude={37.109204711754714}>
            <MarkerIcon sx={{ fontSize: '3rem', color: 'primary.light' }} />
          </Marker>

        </MapGL>
        <Link href={'/'}>
          <Button
            startIcon={<ArrowBack />}
            sx={{
              position: 'absolute',
              left: "3rem",
              top: "2rem"
            }}
            variant={'contained'}
            color="secondary"
            aria-label="edit">
            BACK
          </Button>

        </Link>
      </div>
    )
  }


export default Map
