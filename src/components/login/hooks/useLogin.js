/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/loginStyles";

export default(onLogin)=>{
    const classes = styles();
    const [showError,setShowError] = useState(false);

    const errorMessage = ()=>{
        if(showError){
            <Typography 
            variant="body1"
            color="error"
            className={classes.loginErrorMessage}
            >
                Login failed
            </Typography>
        }
    }
    
    const handleLogin=async(values)=>{
        const {username, password}  = values;
        try {
            await onLogin(username,password);
            setShowError(false);
        } catch (error) {
            if (error.response && error.response === 401) {
                setShowError(true);
            } else {
                throw error;
            }
        }
    }

    return{
        errorMessage:errorMessage,
        handleLogin:handleLogin,
    };
};
