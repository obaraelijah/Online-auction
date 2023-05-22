import React, { createContext, useReducer } from 'react';
import Navbar from "./client/Navbar/Navbar";
import {initialState , reducer } from "./client/Reducer/UseReducer";

import AOS from "aos";
import "aos/dist/aos.css";
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
        </UserContext.Provider>
        </>
    );
};

export default App;