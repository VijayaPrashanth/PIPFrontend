import { Button, TextField } from "@material-ui/core";
import { Form, Formik } from "formik";
import React from "react";

const Login = () => {
    return (
        <>
        <Formik>
            <Form>
                <TextField data-testid="username">

                </TextField>
                <TextField data-testid="password">

                </TextField>
                <Button data-testid="loginButton">
                    Login
                </Button>
            </Form>
        </Formik>
        </>
    )
};

export default Login;