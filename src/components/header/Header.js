import React, { useEffect, useState } from "react";
import { AppBar, Badge, Toolbar } from "@material-ui/core";
import styles from "./styles/headerStyles";
import { ShoppingCart } from "@material-ui/icons";
import cartService from "../cart/services/cartService";

const Header = () => {
    const classes = styles();

    const [cartData, setCartData] = useState({});
    const [cartResponse, setCartResponse] = useState();

    useEffect(() => {
        try {
            cartService.getItemsFromCart('cart')
                .then((res) => { setCartData(res.data); setCartResponse(res) });
        } catch (error) {
            console.error(error);
        }
        setTimeout(() => {

        }, 2000);
    }, []);

    return (
        <>
            <AppBar className={classes.appbar} position={"sticky"} data-tesid="header">
                <Toolbar className={classes.toolbar}>
                    <div data-testid="dailyneeds">
                        <a href="/" className={classes.headerLink} variant="contained" data-testid="dailyneeds_link">
                            Daily Needs
                        </a>
                    </div>
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
                    </div>
                </Toolbar>
            </AppBar>

        </>
    );
}

export default Header;