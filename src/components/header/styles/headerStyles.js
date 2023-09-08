import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  headerLink: {
    color: theme.palette.primary.contrastText,
    margin: "0 0.75rem",
    display: "flex",
    justifyContent: "center",
    textDecoration: "none",
    alignItems: "center",
  },

  headerLogo: {
    marginLeft: "0.20em"
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  appbar: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "black"
  },
  shoppingcarticon: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    color:"white"
  }

}));
