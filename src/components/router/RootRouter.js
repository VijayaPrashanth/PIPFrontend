import {
  BrowserRouter as Router,
  Route,
  Routes,
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
import Login from "../login/Login";
import ProtectedRoute from "../login/ProtectedRoute";

const RootRouter = ({isAuthenticated,onLogin}) => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProtectedRoute element={<Home />}  isAuthenticated={isAuthenticated}></ProtectedRoute>} isAuthenticated={isAuthenticated}/>
        <Route exact path="/login" element={<Login onLogin={onLogin} isAuthenticated={isAuthenticated}/>}></Route>
        <Route exact path="/pricelist" element={<ProtectedRoute element={<PriceList/>} isAuthenticated={isAuthenticated} />}/>
        <Route exact path="/bill" element={<ProtectedRoute element={<Bill />} isAuthenticated={isAuthenticated} />} />
        <Route exact path="/error"
          element={<Error errorIcon={ErrorOutlineIcon} errorMessage={"Oops..Something went wrong"}
          />
          }
        />
        <Route exact path="/cart" element={<ProtectedRoute element={<Cart/>} isAuthenticated={isAuthenticated} />} />
        <Route element={
          <Error errorIcon={BlockIcon} errorMessage={"Not Found"} />
        }
        />
      </Routes>
    </Router>
  );
};

RootRouter.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default RootRouter;