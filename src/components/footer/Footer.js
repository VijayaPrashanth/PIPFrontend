import React from "react";
import {AppBar,Toolbar, Typography } from "@material-ui/core";
import styles from './styles/footerStyles';

const Footer = () => {
    const classes = styles();
  return (
    <>
        <AppBar className={classes.footer} color="primary">
            <Toolbar>
                <Typography variant="body3">
                    Version : 
                </Typography>
            </Toolbar>
        </AppBar>

    </>
  );
};

export default Footer;