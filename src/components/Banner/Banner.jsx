import { Container, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import React from 'react'

const useStyles= makeStyles(()=>({
  banner: {
    backgroundImage: "url('/banner.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  bannerContent : {
    height: 400,
    display: "flex",
    // flexDirection: "column",
    // paddingTop: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  tagline: {
    display: "flex",
    // height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  
}));

const Banner = () => {
  const classes= useStyles();

  return <div className={classes.banner}>
    <Container className={classes.bannerContent}>
      <div className={classes.tagLine}>
        <Typography
          variant='h2'
          style={{
            fontWeight: "bold",
            marginBottom: 15,
            fontFamily: "Montserrat",
          }}
        >
          Crypto Hunter
        </Typography>
        <Typography
          variant='subtitle2'
          style={{
            color: "darkgrey",
            textTransform: "capitalize",
            fontFamily: "Montserrat",
          }}
        >
          Get all the Info regarding your favourite Crypto Currrency
        </Typography>

      </div>
    </Container>

  </div>
  
}

export default Banner