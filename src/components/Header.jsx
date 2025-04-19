import React from 'react';
import AppBar from '@mui/material/AppBar';
import { Container, MenuItem, Select, Toolbar, Typography, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { CryptoState } from '../CryptoContext';


const useStyles = makeStyles(() => ({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: "Montserrat",
      fontWeight: "bold",
      cursor: "pointer",
    },
  }));

const Header = () => {

    const classes= useStyles();  
    const navigate = useNavigate();

    const {currency ,setCurrency} =CryptoState();

    const darkTheme= createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: "dark",
        },
        typography: {
            fontFamily: 'Montserrat, sans-serif',
            fontWeightLight: 400,
            fontWeightRegular: 600,
            fontWeightMedium: 700,
            fontWeightBold: 800,
          },
    });

  return (
    <ThemeProvider theme={darkTheme}>
    <div>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography 
                        onClick={() => navigate("/")}
                        className={classes.title}
                        variant='h6'
                        style={{ cursor: "pointer" }}>
                            Crypto Hunter
                    </Typography>
                    <Select variant="outlined"
                        style={{
                            width: 100,
                            height: 40,
                            marginRight: 15,

                        }}
                        value={currency}
                        onChange={(e)=> setCurrency(e.target.value)}
                    >
                        <MenuItem value={"USD"} >USD</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>

        </AppBar>
    </div>
    </ThemeProvider>
  )
}

export default Header