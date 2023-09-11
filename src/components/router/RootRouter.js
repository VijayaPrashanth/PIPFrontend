import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import React from "react";

import PropTypes from "prop-types";
import PriceList from "../priceList/PriceList";
import Bill from "../bill/Bill";
import Error from "../common/Error";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import BlockIcon from "@material-ui/icons/Block";
import Cart from "../cart/Cart";
import Home from "../home/Home";
import Login from "..login/Login"

const RootRouter = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/pricelist" element={<PriceList />}/>
        <Route exact path="/bill" element={<Bill />} />
        <Route exact path="/error"
          element={<Error errorIcon={ErrorOutlineIcon} errorMessage={"Oops..Something went wrong"}
          />
          }
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route element={
          <Error errorIcon={BlockIcon} errorMessage={"Not Found"} />
        }
        />
      </Routes>
    </Router>
  );
};

RootRouter.propTypes = {
  isAuthenticated: PropTypes.bool,
  onLogin: PropTypes.func,
};

export default RootRouter;