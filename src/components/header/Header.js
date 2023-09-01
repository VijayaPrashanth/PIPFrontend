import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import styles from "./styles/headerStyles";

const Header = () => {
    const classes = styles();
    return(
        <>
            <AppBar className={classes.appbar} position={"sticky"}>
                <Toolbar className={classes.toolbar}>
                    <a href="/" className={classes.headerLink} variant="contained">
                    <Typography className={classes.headerLogo} variant="h5">
                        Daily Needs
                    </Typography>
                    </a>
                    <div className={classes.userSection}>
                        <a href={"/pricelist"} className={classes.headerLink} variant="contained"
                            color="black"
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