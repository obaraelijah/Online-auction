import React, { createContext, useReducer } from 'react';
import About from "./client/AboutPage/About";
import Feedback from './client/Feedback/Feedback';
import Home from "./client/HomePage/Home";
import Navbar from "./client/Navbar/Navbar";
import Contact from "./client/ContactPage/Contact";
import Service from "./client/Services/Service";
import Profile from "./client/Profile/Profile";
import {initialState , reducer } from "./client/Reducer/UseReducer";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from './client/Footer/Footer';
import { Switch, Route, Redirect } from "react-router-dom";
AOS.init();

//context api -> login and logout functionality
export const UserContext = createContext();

const Routing = () => {
    return (
    <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/service" component={Service} />

        <Route exact path="/profile" component={Profile} />
        <Route exact path="/feedback" component={Feedback} />
        
        <Redirect to="/" />
      {/* Can use Error 404 Page  but redirect is better than that page */}
    </Switch>
    )
};

const App  = () => {
    //passed state and dispatched at every root
    const [state, dispatch] = useReducer(reducer , initialState);
    return (
        <>
        <UserContext.Provider value={{ state, dispatch }}>
            <Navbar />
            <Routing /> 
            <Footer />
        </UserContext.Provider>
        </>
    );
};

export default App;