import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({

    pricelistheading: {
        display: "flex",
        justifyContent: "center"
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
    thtext: {
        color: "white",
        alignContent: "center"
    },
    tablebody: {
        backgroundColor: "peach"
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
    }

}));
