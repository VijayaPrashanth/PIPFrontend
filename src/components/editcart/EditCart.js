import { Button, Dialog, DialogActions, DialogContent, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import styles from "./styles/editcartStyles"
import {useState } from "react";
import apiService from "../helpers/apiService";

const EditCart = ({ open, handleClose, item, index, editResponse }) => {


    const [response, setResponse] = useState([]);
    //const[openDialog,setOpenDialog] = useState(true);
    const classes = styles();
    handleClose = () => {
        //setOpenDialog(false);
        window.location.reload();
    }
    const customBackdropStyles = {
        backgroundColor: "rgba(3, 3, 3, 0.2)",
    };

    const [quantity, setQuantity] = useState(item?item.quantity:1);
    const [unitValue, setUnitValue] = useState(item?item.unit:'KG');

    const handleDoneButton = () => {
        
        editCartItems(item.id, item.name);
        window.location.reload();
    }

    const editCartItems = (idValue, nameValue) => {
        const data = {
            id: idValue,
            name: nameValue,
            quantity: quantity,
            unit: unitValue
        };

         apiService.add('cart/add', data).then((res) => setResponse(res.data));

    }


    return (
        <>   
        <Dialog open={open} onClose={handleClose} fullWidth classes={{
                paper: classes.dialogRoot
            }} BackdropProps={{
                style: customBackdropStyles
                    }} data-testId="dialogbox">
                <div className={classes.dialogHeader} >
                    <div>
                        <Typography variant="h6" data-testid="edit cart items text">
                            Edit Cart Items
                        </Typography>
                    </div>
                    <div>
                        <Close className={classes.closeIcon} onClick={handleClose} data-testid="closeButton" />
                    </div>

                </div>
                <DialogContent className={classes.dialogContent}>
                    <div className={classes.formdiv}>
                        <FormControl>
                            <div className={classes.container}>
                                <div className={classes.formitems}>
                                    <Grid container spacing={4} data-testId="quantity">
                                        <Grid item>
                                            <FormLabel>
                                                Quantity
                                            </FormLabel>
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                type="number"
                                                defaultValue="1"
                                                label="Quantity"
                                                onChange={(e) => setQuantity(e.target.value)}
                                                inputProps={{ step: "1", min: "1", max: "15" }}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className={classes.formitems}>
                                    <Grid container spacing={4} className={classes.unit} data-testId="unit">
                                        <Grid item>
                                            <FormLabel>
                                                Unit
                                            </FormLabel>
                                        </Grid>
                                        <Grid item>
                                            <Select
                                                label="UNIT"
                                                autoWidth
                                                labelId="demo-select-small-label"
                                                onChange={(e) => setUnitValue(e.target.value)}
                                            >
                                                <MenuItem value='KG'>KG</MenuItem>
                                                <MenuItem value='GRAM'>GRAM</MenuItem>
                                            </Select>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="medium" onClick={(e) => handleDoneButton()} data-testId="done button">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditCart;