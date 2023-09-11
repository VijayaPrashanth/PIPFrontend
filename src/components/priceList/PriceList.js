import React, { useEffect, useState } from 'react';
import { Button, Card, Container, IconButton, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import styles from './styles/pricelistStyle';
import AddItemDialog from './AddItemDialog';
import EditItemDialog from './EditItemDialog';
import { Delete } from '@material-ui/icons';
import pricelistService from './services/pricelistService';

const PriceList = () => {
    const classes = styles();
    const [response, setResponse] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editable, setEditable] = useState(null);
    const [displayAble,setDisplayAble] = useState(false);

    useEffect(() => {
        try {
            pricelistService.getItemsFromInventory().then((res) => setResponse(res.data));
        } catch (error) {

        }
    }, []);
    console.log(response);
    console.log(response.length);

    const openAddDialog = () => {
        setOpenAdd(true);
    }

    const closeAddDialog = () => {
        setOpenAdd(false);
    }

    const openEditDialog = () => {
        setOpenEdit(true);
    }

    const closeEditDialog = () => {
        setOpenEdit(false);
    }

    const deleteItemfromInventory = (id) => {

        try {
            pricelistService.deleteItem(id);
        }
        catch (error) {
            console.error(error);
        }
        window.location.reload();
    }
    return (
        <>
            <div className={classes.pricelistaddButtonAdjustment} data-testid="additemsbutton">
                <Button variant="contained"
                    className={classes.pricelistaddButton}
                    data-testid="add_items_Button"
                    onClick={openAddDialog}>
                    add items
                </Button>
            </div>
            <div data-testid="additemdialog" >
                <AddItemDialog open={openAdd} handleClose={closeAddDialog}/>
            </div>
            
            {editable && <EditItemDialog open={openEdit} handleClose={closeEditDialog} item={editable} />}
            {
                (response.length > 0) ?
                    (
                        <Container className={classes.containerdisplay} align="center" maxWidth="sm">
                            <Table style={{ width: "45%" }}>
                                <TableBody>
                                    <Card color='primary' className={classes.containerentries} >
                                        {
                                            response.map((item, index) => (
                                                <TableRow className={classes.tablerow}>
                                                    <TableCell>
                                                        <div data-testid="id">
                                                            <Typography variant='subtitle1' align='center'>
                                                                {item.name}
                                                            </Typography>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div data-testid="price">
                                                            <Typography variant='subtitle1'>
                                                                Rs.{item.price}
                                                            </Typography>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div data-testid="unit">
                                                            <Typography variant='subtitle1'>
                                                                {item.unit}
                                                            </Typography>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button variant="contained" className={classes.button} onClick={() => { openEditDialog(); setEditable(item) }} data-testid="edit_button">
                                                            edit
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell data-testid="delete">
                                                        <IconButton aria-label="delete" data-testid="delete_button" onClick={(e) => deleteItemfromInventory(item.id)}>
                                                            <Delete />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </Card>
                                </TableBody>
                            </Table>
                        </Container>

                    )
                    :
                    
                    (
                     <>
                                        { (displayAble) &&(<Typography variant='subtitle1' align='center' data-testid="emptyInventory">
                                            Will be updating soon.....
                                        </Typography>)}
                       </>            
                    )
            }

        </>
    );
};

export default PriceList;