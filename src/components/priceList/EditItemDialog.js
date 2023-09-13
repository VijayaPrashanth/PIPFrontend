import { Button, Dialog, DialogActions, DialogContent, FormControl, FormLabel, Table, TableBody, TableCell, TableRow, TextField, Typography} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useState } from "react";
import styles from "./styles/edititemdialogStyles"
import pricelistService from "./services/pricelistService";
import cartService from "../cart/services/cartService";

const EditItemDialog = ({ open, handleClose, item }) => {

    const [editname, setEditname] = useState(item.name);
    const [editprice, setEditprice] = useState(item.price);
    const [editunit, setEditunit] = useState(item.unit);
    const [editResponse, setEditresponse] = useState([]);
    const [responseFromCartForDeletion, setResponseFromCartForDeletion] = useState('');

    handleClose = () => {
        window.location.reload();
    }
    const classes = styles();
    const performEdit = async () => {
        const payload = {
            id: item.id,
            name: editname,
            price: parseFloat(editprice),
            unit: editunit
        }
        try {
            await pricelistService.updateItemInInventory(item.id, payload).then((res) => setEditresponse(res.data));
            updateByInventory(payload);
        } catch (error) {
            console.log(error);
        }
        
        window.location.reload();
    }

    const updateByInventory=async(payload)=>{
        try {
            await cartService.updateCart(payload);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} data-testid="editdialog">
                <div className={classes.titleAndCloseButton}>
                    <div className={classes.title}>
                        <Typography variant="h6">
                            EditItems
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
                                        <div data-testid="productnamelabel">
                                            <FormLabel>
                                                Product Name
                                            </FormLabel>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div data-testid="productnamefield">
                                            <TextField value={editname} onChange={(e) => { setEditname(e.target.value); console.log(e.target.value) }} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.tablerow}>
                                    <TableCell>
                                        <div data-testid="pricelabel">
                                            <FormLabel >
                                                Price
                                            </FormLabel>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div data-testid="pricefield">
                                            <TextField value={editprice} onChange={(e) => setEditprice(e.target.value)} />
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
                                            <TextField value={editunit} onChange={(e) => setEditunit(e.target.value)} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.doneButton} onClick={(e) => performEdit()} data-testid="done_button">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditItemDialog;