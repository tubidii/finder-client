import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import CategoryCard from "../src/CategoryCard";
import {getInstance} from '../axios';
import {Category} from "../types";
import axios from "axios"

function IndexPage() {
  const [categories, setCategories] = useState<Category[]>()
 
  useEffect(
    () => {
      // get all categories
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      getInstance().get('categories').then(
        (response) => {
          console.log(response.data)
          setCategories(response.data)
        }
      ).catch(
        (error) => {
          console.log(error)
        }
      )
    }, []
  )

  return (
    <Box sx={{
      paddingX: '3rem'

    }}>
      <Typography
        sx={{
          paddingY: "5rem"
        }}
        variant={'h3'}
        textAlign={'center'}>
        Find Something
      </Typography>
      <Grid container spacing={4}>
        {categories?.map(
          (category,index) => {
            return (
              <Grid item sm={3} key={index}>
                <CategoryCard category={category} />
              </Grid>
            )
          }
        )}

      </Grid>
    </Box>
  );
}

export default IndexPage;
