import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({

    pricelistcontent: {
        display: "flex",
        justifyContent: "space-evenly"
    },
    pricelistheading: {
        display: "flex",
        justifyContent: "space-between"
    },

    titleandcarticon: {
        display: "flex",
        justifyContent: "space-around",
        padding: "40px"
    },

    shoppingcarticon: {
        alignSelf: "flex-end",
        alignItems: "right",
        justifyContent: "flex-end"
    },

    crudhead: {
        display: "flex",
        justifyItems: "space-between"
    },
    button: {
        backgroundColor: "goldenrod",
        marginBottom: 10,
        marginTop: 10
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
    tableentry: {
        display: "flex",
        justifyItems: "space-around",
        flexDirection: "row",
        alignItems: "center"
    },
    cardContent: {
        display: "flex",
        justifyItems: "space-around ",
        justifyContent: "space-evenly"
    },
    containerdisplay: {
        marginTop: 60
    },
    containerentries: {
        backgroundColor: "antiquewhite",
        marginTop: 15
    },
    pricelistaddButton: {
        backgroundColor: "skyblue",
        marginRight: 20
    },
    pricelistaddButtonAdjustment: {
        marginTop: 15,
        marginLeft: 950
    },
    tablerow: {
        '& td, & th': {
            borderBottom: 'none'
        }
    }


}));
