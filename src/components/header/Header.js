import React from "react";
import { AppBar, Badge, Toolbar } from "@material-ui/core";
import styles from "./styles/headerStyles";
import ShoppingCartBadge from "../shoppingcartbadge/ShoppingCartBadge";
import { ShoppingCart } from "@material-ui/icons";

const Header = () => {
    const classes = styles();

    return (
        <>
            <AppBar className={classes.appbar} position={"sticky"}>
                <Toolbar className={classes.toolbar}>
                    <div data-testid="dailyneeds">
                        <a href="/" className={classes.headerLink} variant="contained" >
                            Daily Needs
                        </a>
                    </div>
                    <div className={classes.userSection} >
                        <div className={classes.shoppingcarticon} data-testid="cart">
                            <a href='/cart' target='_blank'>
                                <Badge badgeContent={1} color="secondary" overlap="rectangular">
                            <ShoppingCart color="secondary"/>
                            {/* <ShoppingCartBadge /> */}
                            </Badge>
                            </a>
                        </div>
                        <div className={classes.userSection} data-testid="pricelist">
                            <a href={"/pricelist"} className={classes.headerLink} variant="contained">
                                PriceList
                            </a>
                        </div>
                        <div className={classes.userSection} data-testid="bill">
                            <a href={"/bill"} className={classes.headerLink} variant="contained" data-testid="link">
                                Bill
                            </a>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>

        </>
    );
}

export default Header;