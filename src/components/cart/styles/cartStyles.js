import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({

    pricelistheading: {
        display: "flex",
        justifyContent: "space-between"
    },

    titleandcarticon:{
        display:"flex",
        flexWrap:"wrap",
        alignContent:"flex-end",
        justifyContent:"space-evenly",
        padding:"40px"
    },

    shoppingcarticon:{
        alignSelf:"flex-end",
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
    thtext: {
        color: "white",
        alignContent: "center"
    },
    updatebutton: {
        backgroundColor: "orange",
        marginBottom:25
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
    tablecell:{
        alignSelf:"center",
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center",

    },
    noitems:{
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center"
    }

}));
