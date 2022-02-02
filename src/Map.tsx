import React from 'react'
import MapGL, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as MuiIcons from '@mui/icons-material'
import {ArrowBack} from '@mui/icons-material'
import {Button, Fab} from "@mui/material";
import Link from "next/link";

class Map extends React.PureComponent {
  state = {
    locationSet: false,
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 0.0236,
      longitude: 37.9062,
      zoom: 7
    },
    userLocation: {
      longitude: undefined,
      latitude: undefined
    }
  }
  handleViewportChange = (viewport: any) => {
    this.setState({
      viewport: {...viewport, transitionDuration: 1000}
    })
  }

  handleMapCLick = ({lngLat: [longitude, latitude]}: { lngLat: [number, number] }) => {
    this.setState({
      userLocation: {
        longitude,
        latitude
      }
    })
  }

  componentDidMount() {

  }

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const newViewport = {
        ...this.state.viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 12
      }
      const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      this.setState({
        viewport: newViewport,
        userLocation: userLocation,
        locationSet: true
      })
    })
  }

  render() {
    const icon = 'LocationOnTwoTone'
    const MarkerIcon = MuiIcons[icon];
    if (!this.state.locationSet) {
      this.setUserLocation()
    }
    return (
      <div>
        <MapGL
          {...this.state.viewport}
          mapboxApiAccessToken={'pk.eyJ1IjoibWFraW5pa2EiLCJhIjoiY2t5cG43bzlsMGJtdzJvbWQ0dDlpejYyMyJ9.3KsXUjhmbYsDpskSKNnfDQ'}
          mapStyle="mapbox://styles/mapbox/dark-v10"
          onClick={this.handleMapCLick}
          onViewportChange={this.handleViewportChange}
        >
          {
            this.state.userLocation.longitude ?
              (
                <Marker
                  longitude={this.state.userLocation.longitude}
                  latitude={this.state.userLocation.latitude as unknown as number}>
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
