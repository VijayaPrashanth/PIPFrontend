import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({

    pricelistheading: {
        display: "flex",
        justifyContent: "space-between"
    },

    titleandcarticon:{
        display:"flex",
        justifyContent:"space-around",
        padding:"40px"
    },

    shoppingcarticon:{
        alignSelf:"flex-end",
        alignItems:"right",
        justifyContent:"flex-end"
    },

    crudhead: {
        display: "flex",
        justifyItems: "space-between"
    },
    button: {
        backgroundColor: "green"
    },
    tableheader: {
        backgroundColor: "black"
    },
    readbutton: {
        backgroundColor: "skyblue"
    },
    updatebutton: {
        backgroundColor: "orange"
    },
    deletebutton: {
        backgroundColor: "red"
    },
    tableentry:{
        display:"flex",
        justifyItems:"space-around",
        flexDirection:"row",
        alignItems:"center"
    },
    cardContent:{
        display:"flex",
        justifyItems:"space-around ",
        justifyContent:"space-evenly"
    }

}));
