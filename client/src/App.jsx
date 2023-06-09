import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { createContext, useReducer } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import About from "./client/AboutPage/About";
import Addlot from "./client/AddLot/Addlot";
import BidStatus from "./client/BidStatus/BidStatus";
import Contact from "./client/ContactPage/Contact";
import Feedback from "./client/Feedback/Feedback";
import Footer from "./client/Footer/Footer";
import Home from "./client/HomePage/Home";
import Logout from "./client/Logout/Logout";
import Lot from "./client/LotPage/Lot";
import Navbar from "./client/Navbar/Navbar";
import ProductDetails from "./client/ProductDetails/ProductDetails";
import Profile from "./client/Profile/Profile";
import { initialState, reducer } from "./client/Reducer/UseReducer";
import Service from "./client/Services/Service";
import Signup from "./client/SignUp/Signup";
import UpdateComponent from "./client/UpdateLots/UpdateComponent";
import UpdateLot from "./client/UpdateLots/UpdateLot";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

//context api -> login and logout functionality
export const UserContext = createContext();

const Routing = () => {
   return (
      <Switch>
         <Route exact path="/" component={Home} />
         <Route exact path="/addlot" component={Addlot} />
         <Route exact path="/updatelot" component={UpdateLot} />
         <Route exact path="/updateauction/:id" component={UpdateComponent} />

         <Route exact path="/lot" component={Lot} />
         <Route path="/lot/:keyword" component={Lot} />
         <Route exact path="/bidstatus" component={BidStatus} />
         <Route exact path="/about" component={About} />
         <Route exact path="/service" component={Service} />
         <Route exact path="/contact" component={Contact} />
         <Route exact path="/feedback" component={Feedback} />

         <Route exact path="/profile" component={Profile} />
         <Route exact path="/logout" component={Logout} />
         <Route exact path="/signup" component={Signup} />
         <Route exact path="/signin" component={Signup} />
         <Route exact path="/product/:id" component={ProductDetails} />

         <Redirect to="/" />
         {/* Can use Error 404 Page  but redirect is better than that page */}
      </Switch>
   );
};

const App = () => {
   //passed state and dispatched at every root
   const [state, dispatch] = useReducer(reducer, initialState);
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
