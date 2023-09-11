// noinspection ES6CheckImport
import { Navigate, Route } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const ProtectedRoute = ({ element: Element, isAuthenticated, ...rest }) => {

    const renderedComponent = (props) => {
        const { location } = props;
        return isAuthenticated
            ? (<Element {...props} />)
            : (
                <Navigate
                    to={{
                        pathname: "/login",
                        state: {
                            from: location
                        }
                    }}
                />
            );
    };

    return (
        <Route
            {...rest}
            component={renderedComponent}
        />
    );
}

ProtectedRoute.propTypes = {
    Element: PropTypes.elementType.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default ProtectedRoute;
