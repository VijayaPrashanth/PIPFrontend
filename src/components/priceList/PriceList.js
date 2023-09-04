import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core";
import styles from './styles/pricelistStyle';
import apiService from '../helpers/apiService';

const PriceList=()=>{
    const classes = styles();
    const [response, setResponse] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    useEffect(() => {
        async function read() {
            await apiService.version('inventory')
                .then((res) => { setResponse(res.data) })
                .catch((err) => console.log(err));
        }
        read();
    }, []);
    console.log(response);
    return(
        <>
        <div data-testid="test">
            <div data-testid="pricelist" className={classes.pricelistheading}>
                <Typography variant="h5">
                    PriceList
                </Typography>
            </div>

            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table" data-testid="table">
                        <TableHead className={classes.tableheader}>
                            <TableRow>
                                <TableCell align='center'>
                                    <Typography variant='h6' className={classes.thtext}>
                                        ID
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography variant='h6' className={classes.thtext}>
                                        NAME
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography variant='h6' className={classes.thtext}>
                                        PRICE
                                    </Typography>
                                </TableCell>
                                <TableCell align='center' >
                                    <Typography variant='h6' className={classes.thtext}>
                                        ACTIONS
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className={classes.tablebody}>
                            {
                                response.map((item) => (
                                    <TableRow>
                                        <TableCell align='center'>
                                            <Typography variant='subtitle1'>
                                                {item.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant='subtitle1'>
                                                {item.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align='center'>
                                            <Typography variant='subtitle1'>
                                                {item.price}
                                            </Typography>
                                        </TableCell>
                                        <TableCell width="30%" align='center' >
                                            <Grid container spacing={5}>
                                                <Grid item>
                                                    <TextField
                                                    type="number"
                                                    label="Seats"
                                                    defaultValue="1"
                                                    inputProps={{ step: "1", min: "1", max: "15" }}
                                                />
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" className={classes.button} onClick={handleOpenDialog}>
                                                        add
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            
                                            {/* <Grid container spacing={1}>

                                                <Grid item>
                                                    <Button variant="contained" className={classes.readbutton}>
                                                        read
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" className={classes.updatebutton}>
                                                        update
                                                    </Button>
                                                </Grid>
                                                <Grid item>
                                                    <Button variant="contained" className={classes.deletebutton}>
                                                        delete
                                                    </Button>
                                                </Grid>
                                            </Grid> */}
                                        </TableCell>
                                    </TableRow>
                                ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            </div>
        </>
    );
};

export default PriceList;