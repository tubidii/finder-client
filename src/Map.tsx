import React, {useEffect, useState} from 'react'
import MapGL, {Marker} from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import * as MuiIcons from '@mui/icons-material'
import {ArrowBack} from '@mui/icons-material'
import {Button} from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/router";
import {getInstance} from "../axios";
import {Location} from "../types";
import UtilityModal from "./UtilityModal";


type ViewPort = {
  width?: string | number,
  height?: string | number,
  latitude?: number,
  longitude?: number,
  zoom?: number,
  transitionDuration?: number
}

type UserLocation = {
  longitude: number,
  latitude: number
}

const Map = () => {
  const [viewPort, setViewPort] = useState<ViewPort>({
          width: "100vw",
          height: "100vh",
          latitude: 0.0236,
          longitude: 37.9062,
          zoom: 10
        });
  const [currentLocation, setCurrentLocation] = useState<UserLocation>()
  const [location, setLocation] = useState<Location>()
  const [locations, setLocations] = useState<Location[]>()
  const {query} = useRouter();
  const categoryId = query.id;

  useEffect(
    () => {
      // if the category Id has not loading don't show anything
      if (categoryId == undefined) return
      navigator.geolocation.getCurrentPosition(position => {
        position.coords.latitude
        const newViewPort = {
          ...viewPort,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 12
        }
        const userLocation: UserLocation = {
          latitude: position.coords.latitude as number,
          longitude: position.coords.longitude as number,
        }

        // prepare search parameters
        const searchParams = new URLSearchParams();
        searchParams.append("lat", userLocation.latitude.toString())
        searchParams.append("long", userLocation.longitude.toString())
        searchParams.append("rad", "100")
        searchParams.append("cat", categoryId as string)

        // get all categories
        getInstance().get(`locfinder/?${searchParams.toString()}`).then(
          (response) => {
            console.log(response.data)
            setLocations(response.data)
          }
        ).catch(
          (error) => {
            console.error(error.response);
          }
        )
        setViewPort(newViewPort)
        setCurrentLocation(userLocation)

      })
    }, [categoryId]
  )


  const icon = 'LocationOnTwoTone'
  const MarkerIcon = MuiIcons[icon];
  return (
    <div>
      <MapGL
        {...viewPort}
        mapboxApiAccessToken={'pk.eyJ1IjoibWFraW5pa2EiLCJhIjoiY2t5cG43bzlsMGJtdzJvbWQ0dDlpejYyMyJ9.3KsXUjhmbYsDpskSKNnfDQ'}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        onViewportChange={(viewPort: ViewPort) => {
          setViewPort({
            ...viewPort,
            transitionDuration: 100
          })
        }}
      >
        {
          currentLocation &&
          <Marker longitude={currentLocation.longitude}
                  latitude={currentLocation.latitude}>
            <MarkerIcon sx={{fontSize: '3rem', color: 'primary.light'}}/>
          </Marker>
        }
        {
          locations?.map(
            (location) => {
              // @ts-ignore
              const MarkerIcon = MuiIcons[location.category.icon];
              return (
                <Marker
                  onClick={()=>setLocation(location)}
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
      <UtilityModal location={location} handleClose={()=>setLocation(undefined)} />
    </div>
  )
}


export default Map
