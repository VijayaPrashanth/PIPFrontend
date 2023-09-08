import { Button, Card, Container, Grid, Typography } from "@material-ui/core";
import styles from "./styles/cartStyles.js"
import apiService from "../helpers/apiService.js";
import { useEffect, useState } from "react";
import EditCart from "../editcart/EditCart.js";
import { RemoveShoppingCartOutlined } from "@material-ui/icons";
import ShoppingCartBadge from "../shoppingcartbadge/ShoppingCartBadge.js";

const Cart = () => {
    const classes = styles();
    const [response, setResponse] = useState([]);
    

    useEffect(() => {
        async function read() {
            await apiService.getCart('cart').then((res) => { setResponse(res.data) }).catch((err)=>(console.log(err)));
            
        }
        read();
    }, []);

    <ShoppingCartBadge size={response.length} />
    console.log("response from cart on reloading : ");
    console.log(response);

    const deleteItemFromCart = (id) => {
        apiService.deleteItem('/cart', id).then((res) => console.log(res));
        window.location.reload();
    }

    const [itemIndex, setItemIndex] = useState(0);

    const checkIndex = (getIndex, itemEditable) => {
        //setUpdate(true);
        setItemIndex(getIndex);
        console.log("Index of the editing item : " + getIndex);
        console.log("Item to be edited : ");
        console.log(itemEditable);
        console.log("edited:");
        console.log(itemEdited);


    };

    const [update, setUpdate] = useState(false);
    const [itemEdited, setItem] = useState({});
    return (
        <>
            {
                (response.length > 0) ? (
                    <div data-testid="cart">
                        <div className={classes.titleandcarticon}>
                            <div data-testid="pricelist" className={classes.pricelistheading}>
                                <Typography variant="h5">
                                    Cart
                                </Typography>
                            </div>
                        </div>
                        <div >
                            <EditCart open={update} handleClose={update} item={itemEdited} index={itemIndex} editResponse={response} />

                                        {
                                            response.map((item, index) => (
                                                <Container maxWidth="xs">

                                                
                                                <Card>
                                                    <Grid container justifyContent="center" spacing={5}>
                                                        <Grid item>
                                                            <Typography variant='subtitle1'>
                                                                {item.name}
                                                            </Typography>
                                                        </Grid>
                                                            <Grid item>
                                                                <Grid container spacing={2}>
                                                                    <Grid item>
                                                                        <Typography variant='subtitle1'>
                                                                            {item.quantity}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Typography variant='subtitle1'>
                                                                            {item.unit}
                                                                        </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                    </Grid>
                                                    
                                                    <Grid container spacing={3} data-testid="edit" justifyContent="center">
                                                        <Grid item>
                                                            <Button variant="contained" 
                                                            className={classes.updatebutton} 
                                                            onClick={(e) => { 
                                                                setUpdate(true); 
                                                                setItem(item); 
                                                                checkIndex(index, item);
                                                                 }}>
                                                                edit
                                                            </Button>
                                                            

                                                        </Grid>
                                                        <Grid item>
                                                            <Button variant="contained" className={classes.deletebutton} onClick={(e) => deleteItemFromCart(item.id)} data-testid="delete">
                                                                delete
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                                </Container>
                                            ))}

                    </div>
                    </div >
                ) :
(<div data-testid="empty cart">
    <Container>
        <div className={classes.noitems}>
            <Card>

                <Typography>
                    No items in cart!!!
                </Typography>
                <RemoveShoppingCartOutlined/>
            </Card>
        </div>


    </Container>

</div>
)
            }
        </>
    );
};

export default Cart;