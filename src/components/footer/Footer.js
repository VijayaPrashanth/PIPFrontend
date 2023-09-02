import React,{useState} from "react";
import {AppBar,Toolbar, Typography } from "@material-ui/core";
import styles from './styles/footerStyles';
import axios from "axios";

const Footer = () => {
    const classes = styles();
    const [response,setResponse] = useState('');

    axios.get("http://localhost:8080/version").then(response=>{setResponse(response.data.CurrentVersion)}); 
    console.log(response);   
  return (
    <>
        <AppBar className={classes.footer} color="primary">
            <Toolbar>
                  <div data-testid="version">
                <Typography variant="h6" >
                    Version : {response}
                </Typography>
                </div>
            </Toolbar>
        </AppBar>

    </>
  );
};

export default Footer;