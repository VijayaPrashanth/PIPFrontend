import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import React from "react";

import PropTypes from "prop-types";
import PriceList from "../priceList/PriceList";
import Bill from "../bill/Bill";


const RootRouter = ({ isAuthenticated, onLogin, username }) => {
    return (
        <Router>
            <Routes>
                <Route exact path="/pricelist" element={<PriceList/>}
                />
                <Route exact path="/bill" element={<Bill/>}/>
            </Routes>
        </Router>
    );
};

RootRouter.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default RootRouter;