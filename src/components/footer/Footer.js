import React,{useEffect, useState} from "react";
import {AppBar,Toolbar, Typography } from "@material-ui/core";
import styles from './styles/footerStyles';
import apiService from "../helpers/apiService";

const Footer = () => {
    const classes = styles();
    const [response,setResponse] = useState('');

    useEffect(()=>{
      async function version(){
        const version = await apiService.version('version');
        setResponse(version.data);        
      }
      version();
    },[]);
  console.log(response);
     
       
  return (
    <>
        <AppBar className={classes.footer} color="primary">
            <Toolbar>
                  <div data-testid="version">
                <Typography variant="h6" >
                    Version : {response.CurrentVersion}
                </Typography>
                </div>
            </Toolbar>
        </AppBar>

    </>
  );
};

export default Footer;