import React, { useEffect, useState } from "react";
import { AppBar, Badge, Toolbar, Typography } from "@material-ui/core";
import styles from "./styles/headerStyles";
import { ExitToApp, ShoppingCart } from "@material-ui/icons";
import cartService from "../cart/services/cartService";
import { isLoggedIn } from "../helpers/authService";

const Header = ({ onLogout, isAuthenticated }) => {
    const classes = styles();

    const [cartData, setCartData] = useState({});
    const [cartResponse, setCartResponse] = useState();
    const [length, setLength] = useState();

    useEffect(() => {
        try {
            if (isLoggedIn()) {
                cartService.getItemsFromCart('cart')
                    .then((res) => { setCartData(res.data) });
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleHeader = () => {
        if (isAuthenticated) {
            return (
                <>
                    <div className={classes.toolbar}>
                        <div className={classes.userSection} >
                            <div className={classes.shoppingcarticon} data-testid="cart_icon">
                                <a href='/cart' data-testid="cart_link">
                                    <Badge badgeContent={cartData.length} color="secondary" overlap="rectangular">
                                        <ShoppingCart color="secondary" />
                                    </Badge>
                                </a>
                            </div>
                            <div className={classes.userSection} data-testid="pricelist">
                                <a href={"/pricelist"} className={classes.headerLink} variant="contained" data-testid="pricelist_link">
                                    PriceList
                                </a>
                            </div>
                            <div className={classes.userSection} data-testid="bill">
                                <a href={"/bill"} className={classes.headerLink} variant="contained" data-testid="bill_link">
                                    Bill
                                </a>
                            </div>
                            <div onClick={onLogout} className={classes.logoutLink}>
                                <ExitToApp />
                                <Typography className={classes.headerLogo} variant="body1">
                                    Logout
                                </Typography>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    return (
        <>
            <AppBar className={classes.appbar} position={"sticky"} data-tesid="header">
                <Toolbar className={classes.toolbar}>
                    <div data-testid="dailyneeds">
                        <a href="/" className={classes.headerLink} variant="contained" data-testid="dailyneeds_link">
                            Daily Needs
                        </a>
                    </div>
                    <div className={classes.userSection}>
                        {handleHeader()}
                    </div>
                </Toolbar>
            </AppBar>

        </>
    );
}

export default Header;