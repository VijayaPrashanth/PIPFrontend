import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import styles from "./styles/errorStyles"
import PropTypes from "prop-types";

const Error = ({ errorIcon: ErrorIcon, errorMessage }) => {
    const classes = styles();

    const [displayAble, setDisplayAble] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDisplayAble(true);
        }, 1000);

        return () => clearTimeout(timeoutId);

        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div data-testid="displayableError">

           {displayAble &&
                (<div className={classes.errorContent} data-testid="displayableError">
                    <ErrorIcon className={classes.errorIcon} />
                    <Typography variant='h4'>
                        {errorMessage}
                    </Typography>
                </div>)}
            </div> 
        </>
    );
};

Error.propTypes = {
    errorIcon: PropTypes.elementType.isRequired,
    errorMessage: PropTypes.string.isRequired,
};

export default Error;
