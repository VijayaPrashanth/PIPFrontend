import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import styles from './styles/homeStyles';
import cartService from '../cart/services/cartService';
import pricelistService from '../priceList/services/pricelistService';

const Home = ({isAuthenticated}) => {
    const classes = styles();
    const [responseFromInventory, setResponseFromInventory] = useState([]);
    const [itemsCount, setItemsCount] = useState(0);
    const [cartres, setCartres] = useState([]);

    useEffect(() => {
       async function initialget(){ try {
            await pricelistService.getItemsFromInventory().then((res) => setResponseFromInventory(res.data));
        } catch (error) {
            console.log(error);
        }}
        initialget();
    }, []);

    
    const addItem = (inventoryItem, quantityFromInventory) => {
        const payload = {
            id: inventoryItem.id,
            inventory: inventoryItem,
            name: inventoryItem.name,
            itemsCount: quantityFromInventory,
            unit: inventoryItem.unit
        };
        try {
            cartService.updateCart(payload).then((res) => setCartres(res.data));
        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    }
    
    return (
        <>
            <div data-testid="home">
                <Container className={classes.containerdisplay} align="center" >
                    <Table style={{ width: "40%" }}>
                        <TableBody>
                            <Card color='primary' className={classes.containerentries} >
                                {
                                    responseFromInventory.map((item, index) => (
                                        <TableRow className={classes.tablerow} key={item.id}>
                                            <TableCell>
                                                <div data-testid="name">
                                                    <Typography variant='subtitle1' align='center'>
                                                        {item.name}
                                                    </Typography>
                                                </div>
                                            </TableCell>
                                            <TableCell data-testid="price">
                                                <Typography variant='subtitle1'>
                                                    Rs.{item.price}
                                                </Typography>
                                            </TableCell>
                                            <TableCell data-testid="unit">
                                                <Typography variant='subtitle1'>
                                                    {item.unit}
                                                </Typography>
                                            </TableCell>
                                            <TableCell data-testid="itemscount">
                                                <TextField
                                                    type="number"
                                                    defaultValue="0"
                                                    onChange={(e) => setItemsCount(e.target.value)}
                                                    inputProps={{ step: "1", min: "0", max: "15" }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="contained"
                                                    className={classes.button}
                                                    onClick={() => addItem(item, itemsCount)}
                                                    data-testid="addButton">
                                                    add
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </Card>
                        </TableBody>
                    </Table>
                </Container >
            </div >
        </>
    );
};

export default Home;