import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styles from "./styles/headerStyles";

const Header = () => {
    const classes = styles();
    return(
        <>
            <AppBar className={classes.appbar} position={"sticky"}>
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.headerLogo} variant="h5">
                        Daily Needs
                    </Typography>
                    <div className={classes.userSection}>
                        <a href={"/pricelist"} className={classes.headerLink} variant="contained"
                            color="primary"
                        >
                            <Typography>PriceList</Typography>
                        </a>
                        <a href={"/bill"} className={classes.headerLink} variant="contained"
                            >
                                <Typography>Bill</Typography>
                        </a>
                    </div>
                </Toolbar>  
            </AppBar>
            
          </>
    );
}

export default Header;