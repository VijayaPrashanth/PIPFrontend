import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import React from "react";

import PropTypes from "prop-types";
import PriceList from "../priceList/PriceList";
import Bill from "../bill/Bill";
//import Header from "../header/Header";


const RootRouter = () => {
    
    return (
        <Router>
            <Routes>
                <Route exact path="/"/>
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