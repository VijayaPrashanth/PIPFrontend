import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    
  footer : {
[theme.breakpoints.up('sm')]: {
                marginTop:930,
                position: "bottom",
                bottom: 0,
            },
    position:'absolute',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"white",
    color:"black"
}
}));
