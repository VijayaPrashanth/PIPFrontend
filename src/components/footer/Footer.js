import React, { useEffect, useState } from "react";
import { AppBar, Card, Toolbar, Typography } from "@material-ui/core";
import styles from './styles/footerStyles';
import footerService from "./services/footerService";

const Footer = () => {
  const classes = styles();
  const [response, setResponse] = useState('');

  useEffect(() => {
    try {
      footerService.getVersion().then((res)=>setResponse(res));
    } catch (error) {
      console.error(error);
    }
      
  }, []);

  return (
    <>
      <AppBar className={classes.footer} >
        <Toolbar>
          <div>
            <Card className={classes.card} data-testid="version" >
              <Typography variant="h5" >
                Version : {response.CurrentVersion}
              </Typography>
            </Card>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;