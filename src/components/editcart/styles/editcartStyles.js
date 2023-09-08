import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({

    dialogRoot: {
        overflow: "hidden",
        minHeight: "30vh",
        maxHeight: "80vh",
        width: "340px",
    },
    formitems:{
        display:"flex",
        justifyContent:"space-between"
    },
    formcontainer:{
        
    },

    container: {
        display: "flex",
        flexDirection: "column"
    },
    dialogHeader: {
        fontWeight: "bold",
        padding: "10px 0px 20px 10px",
        textAlign: "center",
        width: "100%",
        position: "relative",
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column",
        padding: "1rem"
    },
    formdiv:{
        display: "flex",
        flexDirection: "row",
        padding: "1rem"
    },
    closeIcon: {
        cursor: "pointer",
        position: "absolute",
        padding:"0.35rem",
        right: "0.75rem",
        top: "0.75rem",
    },
    unit:{
        display:"flex",
        //justifyContent:"space-between",
        //padding:"1rem"
    }

}));
