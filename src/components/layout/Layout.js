/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import RootRouter from "../router/RootRouter";
import useAuth from "./hooks/useAuth";

export default ()=>{

    const { isAuthenticated, handleLogin, handleLogout,username } = useAuth();

    return(
        <>
        <Header 
            onLogout={handleLogout}
            isAuthenticated={isAuthenticated} 
            />
        <RootRouter
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
        />
        <Footer />
        </>
    );
    
};