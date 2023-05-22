import React, { createContext, useReducer } from 'react';
import Navbar from "./client/Navbar/Navbar";
import {initialState , reducer } from "./client/Reducer/UseReducer";

import AOS from "aos";
import "aos/dist/aos.css";
import Footer from './client/Footer/Footer';
AOS.init();


//context api -> login and logout functionality
export const UserContext = createContext();

const App  = () => {
    //passed state and dispatched at every root
    const [state, dispatch] = useReducer(reducer , initialState);
    return (
        <>
        <UserContext.Provider value={{ state, dispatch }}>
            <Navbar />
            <Footer />
        </UserContext.Provider>
        </>
    );
};

export default App;