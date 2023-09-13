import { Card, Container, IconButton, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import styles from "./styles/cartStyles.js"
import apiService from "../helpers/apiService.js";
import { useEffect, useState } from "react";
import { AddCircle, Delete, RemoveCircle, RemoveShoppingCartOutlined } from "@material-ui/icons";
import cartService from "./services/cartService.js";
import { isLoggedIn } from "../helpers/authService.js";

const Cart = () => {
    const classes = styles();
    const [response, setResponse] = useState([]);

    useEffect(() => {
        async function getItem() {
            try {
                if(isLoggedIn){await cartService.getItemsFromCart()
                    .then((res) => { setResponse(res.data) })}
            }
            catch (err) {
                console.log(err.response)
            }
        }
        getItem();
    }, []);

    const deleteItemFromCart = async (id) => {
        try {
            await cartService.deleteItemFromCart(id);
        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    }

    const onDecrement = async(item) => {
        if (item.itemsCount === 1) {
            try {
                await cartService.deleteItemFromCart(item.id);
            } catch (error) {
                console.log(error);
            }

            window.location.reload();
        }
        if (item.itemsCount > 1) {
            item.itemsCount -= 1;
            try {
                apiService.updateCartItem('cart', item.id, item.itemsCount).then((res) => setResponse(res.data));
            } catch (error) {
                console.log(error);
            }
        }
    }

    const onIncrement = (item) => {
        if (item.itemsCount + 1 <= 10) {
            item.itemsCount += 1;
            try {
                apiService.updateCartItem('cart', item.id, item.itemsCount).then((res) => setResponse(res.data));
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <Container className={classes.containerdisplay}>
                {
                    (response.length > 0) ? (
                        <Container align="center" className={classes.containerdisplay}>
                            <Table style={{ width: "45%" }}>
                                <TableBody>
                                    <Card className={classes.containerentries}>
                                        {
                                            response.map((item, index) => (

                                                <TableRow className={classes.tablerow} key={item.id}>

                                                    <TableCell data-testid="name">
                                                        <Typography variant='subtitle1' className={classes.name} data-testid="nameText">
                                                            {item.name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell data-testid="unit">
                                                        <Typography variant='subtitle1'>
                                                            {item.unit}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell >
                                                        <IconButton onClick={(e) => {
                                                            onDecrement(item);
                                                        }} data-testid="decrement_button">
                                                            <RemoveCircle />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell data-testid="itemscount" >
                                                        <Typography variant='subtitle1'>
                                                            {item.itemsCount}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell >
                                                        <IconButton onClick={(e) => {
                                                            onIncrement(item);
                                                        }} data-testid="increment_button">
                                                            <AddCircle />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell data-testid="deleteButton">
                                                        <IconButton aria-label="delete" onClick={(e) => deleteItemFromCart(item.id)} data-testid="delete_button">
                                                            <Delete />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </Card>
                                </TableBody>
                            </Table>
                        </Container>
                    ) :
                        ((<div data-testid="empty cart">
                            <Container>
                                <div className={classes.noitems}>
                                    <Card>
                                        <Typography data-testid="emptyCart">
                                            No items in cart!!!
                                        </Typography>
                                        <RemoveShoppingCartOutlined />
                                    </Card>
                                </div>
                            </Container>
                        </div>)
                        )
                }
            </Container>
        </>
    );
};

export default Cart;
