import { Button } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";
import FormikTextField from "../formik/FormikTextField";
import styles from "./styles/loginStyles";

const Login = () => {
    const classes = styles();
    return (
        <>
        <div className={classes.loginContainer}>
            <Formik >
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
                    <Button data-testid="loginButton"
                        variant="contained"
                        type="submit"
                        // disabled={!isValid}
                        color="secondary"
                        className={classes.loginButton}>
                        Login
                    </Button>
                </Form>
            </Formik>
        </div>
        </>
    )
};

export default Login;