import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    
  footer : {
[theme.breakpoints.up('sm')]: {
                marginTop:900,
                marginBottom: 0,
                position: "absolute",
                bottom: 0,
            },
    position:'absolute',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"grey"
}
}));
