import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    titleAndCloseButton: {
        display: "flex",
        justifyContent: "space-between"
    },
    title: {
        margin: "5px",
        marginLeft: 30
    },
    closeButton: {
        margin: "8px",
        marginRight: 30
    },
    addtoinventoryButton: {
        backgroundColor: "royalblue",
        color: "white"
    },
    labelandtext: {
        display: "flex"
    },
    tablerow: {
        '& td, & th': {
            borderBottom: 'none'
        }
    }
}));