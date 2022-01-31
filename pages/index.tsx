import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";
import WcIcon from '@mui/icons-material/Wc';

const bull = (
  <Box
    component="span"
    sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
  >
    •
  </Box>
);

function CategoryCard() {
  return (
    <Card sx={{
      padding: '1rem',
      borderRadius: "1rem",
      textAlign: 'center',
      transition: "transform 0.5s ease-in-out",
      "&:hover": {
        transform: "scale3d(1.1, 1.1, 1)",
         boxShadow:
        "0px 3px 1px -2px white,0px 2px 2px 0px #bb85fb,0px 1px 5px 0px #c595fd"
      },
    }}>
      <CardContent>
        <WcIcon sx={{
          color:'primary.light',
          fontSize: '3rem'
        }}/>
        <Typography variant="h4" component="div">
          Toilet
        </Typography>
      </CardContent>
    </Card>
  )
}

function IndexPage() {
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
      <Grid container spacing={2}>
        <Grid item sm={3}>
          <CategoryCard/>
        </Grid>
        <Grid item sm={3}>
          <CategoryCard/>
        </Grid>
        <Grid item sm={3}>
          <CategoryCard/>
        </Grid>
        <Grid item sm={3}>
          <CategoryCard/>
        </Grid>
        <Grid item sm={3}>
          <CategoryCard/>
        </Grid>
        <Grid item sm={3}>
          <CategoryCard/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default IndexPage;
