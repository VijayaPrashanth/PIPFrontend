import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    
  footer : {
[theme.breakpoints.up('xs')]: {
                marginTop:930,
                position: "bottom",
                bottom: 0,
            },
    position:'absolute',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"black",
    color:"black"
},
container:{
  marginTop:370
},
card:{
  backgroundColor:"silver"
},
cardtypo:{
  marginTop:6,
  marginBottom:6
}
}));
