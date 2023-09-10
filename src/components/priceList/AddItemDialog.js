import { Button, Dialog, DialogActions, DialogContent, FormControl, FormLabel, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useState } from "react";
import styles from "./styles/additemdialogStyles"
import pricelistService from "./services/pricelistService";

const AddItemDialog = ({ open, handleClose }) => {

    const classes = styles();

    const [addName, setName] = useState('');
    const [addPrice, setPrice] = useState('');
    const [addUnit, setUnit] = useState('');
    const [responseForAdd, setResponseForAdd] = useState({});

    const performAdd = () => {
        const payload = {
            name: addName,
            price: parseFloat(addPrice),
            unit: addUnit
        }
        try {
            pricelistService.addItemToInventory(payload).then((res) => setResponseForAdd(res.data));
        } catch (error) {
            console.log(error);
        }
        window.location.reload();
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} data-testid="dialog">
                <div className={classes.titleAndCloseButton}>
                    <div className={classes.title} data-testid="additemstitle">
                        <Typography variant="h6">
                            Add Items
                        </Typography>
                    </div>
                    <div className={classes.closeButton} data-testid="closeButton">
                        <Close onClick={handleClose} data-testid="close_button" />
                    </div>
                </div>
                <DialogContent>
                    <FormControl>
                        <Table>
                            <TableBody>
                                <TableRow className={classes.tablerow}>
                                    <TableCell>
                                        <div data-testid="namelabel">
                                            <FormLabel>
                                                Product Name
                                            </FormLabel>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div data-testid="namefield">
                                            <TextField onChange={(e) => setName(e.target.value)} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.tablerow}>
                                    <TableCell>
                                        <div data-testid="pricelabel">
                                            <FormLabel>
                                                Price
                                            </FormLabel>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div data-testid="pricefield">
                                            <TextField onChange={(e) => setPrice(e.target.value)} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.tablerow}>
                                    <TableCell>
                                        <div data-testid="unitlabel">
                                            <FormLabel>
                                                Unit
                                            </FormLabel>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div data-testid="unitfield">
                                            <TextField onChange={(e) => setUnit(e.target.value)} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <div data-testid="addtoinventory">
                        <Button className={classes.addtoinventoryButton} onClick={performAdd} data-testid="addtoinventory_button">
                            Add to Inventory
                        </Button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddItemDialog;