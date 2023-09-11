import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
({
    loginContainer: {
        display: "flex",
        justifyContent: "center",
        padding: "80px  "
    },
    loginForm: {
        display: "flex",
        flexDirection: "column"
    },
    loginButton: {
        marginTop: "15px"
    },
    loginErrorMessage: {
        marginTop: "8px"
    },
    signUpMessage: {
        marginTop: "15px"
    },
    signUpLinkMessage: {
        textDecoration: "none"
    }
})
);
