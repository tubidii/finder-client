import React from 'react'
import MapGL, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as MuiIcons from '@mui/icons-material'
import {ArrowBack} from '@mui/icons-material'
import {Button, Fab} from "@mui/material";
import Link from "next/link";

const Map = () => {
  const [viewPort,setViewPort] = useState<{}>({
      width: "100vw",
      height: "100vh",
      latitude: 0.0236,
      longitude: 37.9062,
      zoom: 7
  });
  const [userLocation,setUserLocation] = useState<{}>({
    longitude: undefined,
    latitude: undefined
  });
  const [locationSet,setLocationSet] = useState<bool>(false);
  
  handleViewportChange = (viewport: any) => {
    setViewPort({
      ...viewport, transitionDuration: 1000
    })
  }

  handleMapCLick = ({lngLat: [longitude, latitude]}: { lngLat: [number, number] }) => {
    setUserLocation({
        longitude,
        latitude
    })
  }

  
  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setViewPort({
        ...viewPort,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12
      });
      setLocationSet(true)
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    })
  }

  render() {
    const icon = 'LocationOnTwoTone'
    const MarkerIcon = MuiIcons[icon];
    if (!locationSet) {
      this.setUserLocation()
    }
    return (
      <div>
        <MapGL
          {...viewPort}
          mapboxApiAccessToken={'pk.eyJ1IjoibWFraW5pa2EiLCJhIjoiY2t5cG43bzlsMGJtdzJvbWQ0dDlpejYyMyJ9.3KsXUjhmbYsDpskSKNnfDQ'}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          onClick={this.handleMapCLick}
          onViewportChange={this.handleViewportChange}
        >
          {
            userLocation.longitude ?
              (
                <Marker
                  longitude={userLocation.longitude}
                  latitude={userLocation.latitude as unknown as number}>
                  <MarkerIcon sx={{fontSize: '3rem', color: 'primary.light'}}/>
                </Marker>
              )
              : null
          }
        </MapGL>
        <Link href={'/'}>
          <Button
            startIcon={<ArrowBack/>}
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
}

export default Map
