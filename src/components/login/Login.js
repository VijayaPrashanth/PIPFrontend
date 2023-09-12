import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import FormikTextField from "../formik/FormikTextField";
import { formSchema, initialValues } from "./services/loginFormService";
import styles from "./styles/loginStyles";
import useLogin from "./hooks/useLogin";
import { Navigate, useNavigate } from "react-router-dom";

const Login = ({onLogin,isAuthenticated}) => {
    const classes = styles();
    const { errorMessage, handleLogin } = useLogin(onLogin);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            console.log("login page");
            navigate("/");
        } 
    }
    );

    return (
        <div className={classes.loginContainer}>
            <Formik 
            initialValues={initialValues} 
            onSubmit={handleLogin} validationSchema={formSchema} >
                <Form className={classes.loginForm}>
                    <FormikTextField
                        data-testid="username"
                        required
                        margin="dense"
                        name="username"
                        label="Username"
                        >
                    </FormikTextField>
                    <FormikTextField
                        data-testid="password"
                        required
                        type="password"
                        margin="dense"
                        name="password"
                        label="Password"
                        >
                    </FormikTextField>
                    {
                        errorMessage()
                    }
                    <Button data-testid="loginButton"
                        variant="contained"
                        type="submit"
                        color="secondary"
                        className={classes.loginButton}>
                        Login
                    </Button>
                </Form>
            </Formik>
        </div>
    )
};

export default Login;