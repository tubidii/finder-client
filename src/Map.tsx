import React from 'react'
import MapGL, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as MuiIcons from '@mui/icons-material'
import {ArrowBack} from '@mui/icons-material'
import {Button} from "@mui/material";
import Link from "next/link";
import {Location} from '../types'
import {getInstance} from "../axios";
import {withRouter} from "next/router";

class Map extends React.PureComponent {
  state = {
    locationSet: false,
    viewport: {
      width: "100vw",
      height: "100vh",
      latitude: 0.0236,
      longitude: 37.9062,
      zoom: 15
    },
    userLocation: {
      longitude: undefined,
      latitude: undefined
    },
    locations: []
  }
  handleViewportChange = (viewport: any) => {
    this.setState({
      viewport: {...viewport, transitionDuration: 1000}
    })
  }

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const newViewport = {
        ...this.state.viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 9
      }
      const userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }

      console.log(userLocation)

      const searchParams = new URLSearchParams();
      searchParams.append("lat", userLocation.latitude.toString() )
      searchParams.append("long", userLocation.longitude.toString() )
      searchParams.append("rad", "20")
      // @ts-ignore
      searchParams.append("cat", this.props.router.query.id)
      // @ts-ignore
      if (this.props.router.query.id == undefined) return

      // get all categories
      getInstance().get(`locfinder/?${searchParams.toString()}`,).then(
        (response) => {
          // setLocations(response.data)
          console.log(response.data)
          this.setState({
            locations: response.data
          })
        }
      ).catch(
        (error) => {
          const res = error.response;
          console.error(res);
        }
      )
      this.setState({
        viewport: newViewport,
        userLocation: userLocation,
        locationSet: true
      })
    })
  }

  componentDidMount() {
    this.setUserLocation()
  }

  render() {
    const icon = 'LocationOnTwoTone'
    const MarkerIcon = MuiIcons[icon];
    return (
      <div>
        <MapGL
          {...this.state.viewport}
          mapboxApiAccessToken={'pk.eyJ1IjoibWFraW5pa2EiLCJhIjoiY2t5cG43bzlsMGJtdzJvbWQ0dDlpejYyMyJ9.3KsXUjhmbYsDpskSKNnfDQ'}
          mapStyle="mapbox://styles/mapbox/dark-v10"
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
          {
            this.state.locations.map(
              (location: Location,index) => {
                console.log(location)
                // @ts-ignore
                const MarkerIcon = MuiIcons[location.category.icon as string];
                return (
                  <Marker
                    key={index}
                    longitude={location.longitude}
                    latitude={location.latitude}>
                    <MarkerIcon sx={{fontSize: '3rem', color: 'primary.light'}}/>
                  </Marker>
                )
              }
            )
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

export default withRouter(Map)
