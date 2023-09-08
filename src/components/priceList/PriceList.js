import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, Grid, TextField, Typography } from "@material-ui/core";
import styles from './styles/pricelistStyle';
import apiService from '../helpers/apiService';

const PriceList = () => {
    const classes = styles();
    const [response, setResponse] = useState([]);
    const initialQuantities = response.map(() => 1);
    const [quantities, setQuantities] = useState(initialQuantities);
    const [quantity, setQuantity] = useState(0);
    const [cartres, setCartres] = useState([]);

    const handleIncrement = (index) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] < 15) {
            newQuantities[index] += 1;
            setQuantities(newQuantities);
        }
    };

    const handleDecrement = (index) => {
        const newQuantities = [...quantities];
        if (newQuantities[index] > 1) {
            newQuantities[index] -= 1;
            console.log(newQuantities[index]);
            setQuantities(newQuantities);
        }
    };

    const handleQuantity = (num, quantity) => {
        if (num < 0 && quantity > 0 && quantity - num >= 0)
            return quantity - num;
    }
    const addItem = (item, quantity) => {
        //console.log("quantity for adding to the cart : " + quantity);
        const payload = {
            id: item.id,
            name: item.name,
            quantity: quantity,
            unit: item.unit
        };
        //console.log("data to be added to cart : \n" + data.id, data.name, data.quantity, data.unit);
        apiService.add('cart/add', payload).then((res) => setCartres(res.payload));
        //console.log("response for added item : ");
        //console.log(cartres);
    }

    useEffect(() => {
        async function read() {
            await apiService.version('inventory')
                .then((res) => setResponse(res.data)).catch((err) => console.log(err));
        }
        read();
    }, []);

    return (
        <>
            <div data-testid="test">
                <div className={classes.titleandcarticon}>
                    <div data-testid="pricelist" className={classes.pricelistheading}>
                        <Typography variant="h5">
                            PriceList
                        </Typography>
                    </div>
                </div>
                <div>
                    <Container>
                        {
                            response.map((item, index) => (
                                <Container maxWidth="xs">
                                    <Box color="blue">
                                        <Card color='primary'>
                                            <Grid container spacing={8} data-testid="pricetableAction" justifyContent='center'>
                                                <Grid item>
                                                    <Grid container spacing={12}>
                                                        {/* <Grid item>
                                                    <Typography variant='subtitle1' data-testid="pricetableId">
                                                        {item.id}
                                                    </Typography>
                                                    </Grid> */}
                                                        <Grid item>
                                                            <div className={classes.pricelistheading}>
                                                                <Grid container spacing={6}>
                                                                    <Grid item>
                                                                        <div data-testid="id">
                                                                            <Typography variant='subtitle1'>
                                                                                {item.name}
                                                                            </Typography>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Grid container spacing={4}>
                                                                            <Grid item>
                                                                                <div data-testid="price">
                                                                                    <Typography variant='subtitle1'>
                                                                                        {item.price}
                                                                                    </Typography>
                                                                                </div>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <div data-testid="unit">
                                                                                    <Typography variant='subtitle1'>
                                                                                        {item.unit}
                                                                                    </Typography>
                                                                                </div>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Grid container spacing={5}>
                                                        <Grid item data-testid="quantity">
                                                            <TextField
                                                                type="number"
                                                                defaultValue="0"
                                                                label="Quantity"
                                                                value={handleQuantity}
                                                                onChange={(e) => { setQuantity(e.target.value); handleQuantity(e.target.value); }}
                                                                inputProps={{ step: "1", min: "-1", max: "15" }}
                                                            />
                                                            <div>
                                                                {/* <Button size="small" variant="outlined" onClick={handleDecrement(index)}>
                                                            -
                                                        </Button>
                                                        <span>{quantity}</span>
                                                        
                                                        <Button size="small" variant="outlined" onClick={handleIncrement(index)}>
                                                            +
                                                        </Button> */}
                                                            </div>
                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant="contained" className={classes.button} onClick={() => addItem(item, quantity)} data-testid="addButton">
                                                                add
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </Card>
                                    </Box>
                                </Container>

                            ))}

                    </Container>
                </div>
            </div>
        </>
    );
};

export default PriceList;