import React, { useEffect } from "react";
import { FaBeer } from "react-icons/fa";
import { MdEventAvailable, MdSecurity } from "react-icons/md";
import { NavLink } from "react-router-dom";

import Img4 from "../images/arrow-310633_960_720.png";
import Auction1 from "../images/auction1.png";
import Img from "../images/values-1.png";
import BidImg from "../images/values-3.png";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData/MetaData";
import Product from "./Product";
import "./homestyle.scss";

const Home = () => {
   const alert = useAlert();
   const dispatch = useDispatch();
   const { loading, error, products, productCount } = useSelector(
      (state) => state.products
   );

   useEffect(() => {
      if (error) {
         return alert.error(error);
      }
      dispatch(getProduct());
   }, [dispatch, error, alert]);

   // console.log(productCount);
   return (
      <>
         {loading ? (
            <Loader />
         ) : (
            <>
               <MetaData title="Best Bid"></MetaData>
               <section
                  id="header"
                  className="d-flex align-items-center homepg"
               >
                  <div className="container-fluid nav_bg">
                     <div className="row">
                        <div className="col-10 mx-auto">
                           <div className="row">
                              <div
                                 className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column"
                                 data-aos="fade-up"
                                 data-aos-delay="300"
                              >
                                 <h1>
                                    {" "}
                                    Bid and sell items with{" "}
                                    <strong className="brand-name">
                                       <br />
                                       Online Auction
                                    </strong>
                                 </h1>

                                 <h2 className="my-3">
                                    An online auction is a service in which
                                    auction users or participants sell or bid
                                    for products or services via the Internet.
                                 </h2>
                                 <div className="mt-3">
                                    <NavLink
                                       to="/signup"
                                       className="btn-get-started"
                                    >
                                       Get Started
                                    </NavLink>
                                 </div>
                              </div>

                              <div
                                 className="col-lg-6 order-1 order-lg-2 header-img "
                                 data-aos="fade-up"
                                 data-aos-delay="400"
                              >
                                 <img
                                    src={Auction1}
                                    className="img-fluid animated hedrimg"
                                    alt="auction img"
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>

               {/* Home Section 2 */}
               <div className="container-fluid nav_bg sectiontwocls">
                  <div className="row">
                     <div className="col-10 mx-auto">
                        <section className="section">
                           <div className="container">
                              <div className="row justify-content-center text-center mb-5">
                                 <div className="col-md-5" data-aos="fade-up">
                                    <h2 className="section-heading">
                                       A user-friendly website
                                    </h2>
                                 </div>
                              </div>

                              <div className="row">
                                 <div
                                    className="col-md-4"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                 >
                                    <div className="feature-1 text-center">
                                       <div className="wrap-icon icon-1">
                                          <div className="hmicn">
                                             <MdSecurity />
                                          </div>
                                       </div>
                                       <h3 className="mb-3">Security</h3>
                                       <p>
                                          All sellers are required to undergo
                                          verification through our system,
                                          guaranteeing the security of your
                                          account details. User passwords are
                                          encrypted to provide enhanced
                                          protection. Bid with peace of mind,
                                          free from any interference by third
                                          parties..
                                       </p>
                                    </div>
                                 </div>
                                 <div
                                    className="col-md-4"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                 >
                                    <div className="feature-1 text-center">
                                       <div className="wrap-icon icon-1">
                                          <div className="hmicn">
                                             <MdEventAvailable />
                                          </div>
                                       </div>
                                       <h3 className="mb-3">Availability</h3>
                                       <p>
                                          The web app is available 24/7,
                                          allowing users to login and register
                                          on the website at any time. Please
                                          note that some products will only be
                                          available for a specific duration
                                          determined by the seller.
                                       </p>
                                    </div>
                                 </div>

                                 <div
                                    className="col-md-4"
                                    data-aos="fade-up"
                                    data-aos-delay="500"
                                 >
                                    <div className="feature-1 text-center">
                                       <div className="wrap-icon icon-1">
                                          <div className="hmicn">
                                             <FaBeer />
                                          </div>
                                       </div>
                                       <h3 className="mb-3">Flexibility</h3>
                                       <p>
                                          Sellers have the ability to instantly
                                          update, add, or delete product data.
                                          Selling your product through bidding
                                          is a simple process with
                                          easy-to-follow steps. Additionally,
                                          users can conveniently update their
                                          profiles .
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </section>

                        {/* Home Section 2-3 */}

                        {/* Home Section 3 */}

                        <section className="section secthreecls">
                           <div className="container">
                              <div
                                 className="row justify-content-center text-center mb-5 homeimgcls"
                                 data-aos="zoom-in"
                                 data-aos-delay="200"
                              >
                                 <div className="col-md-6 mb-5 flwpthcls">
                                    <img
                                       src={Img4}
                                       alt="Auction Image"
                                       className="img-fluid"
                                    />
                                    <h1> Follow This Path </h1>
                                 </div>
                              </div>
                              <div className="row">
                                 <div className="col-md-4">
                                    <div
                                       className="step"
                                       data-aos="fade-up"
                                       data-aos-delay="300"
                                    >
                                       <span className="number">01</span>
                                       <h3>Create Profile</h3>
                                       <p>
                                          Sign up in our website, and make your
                                          user Profile.{" "}
                                       </p>
                                    </div>
                                 </div>
                                 <div className="col-md-4">
                                    <div
                                       className="step"
                                       data-aos="fade-up"
                                       data-aos-delay="400"
                                    >
                                       <span className="number">02</span>
                                       <h3>Sign In</h3>
                                       <p>
                                          Provide your correct username and
                                          Password and Login
                                       </p>
                                    </div>
                                 </div>
                                 <div className="col-md-4">
                                    <div
                                       className="step"
                                       data-aos="fade-up"
                                       data-aos-delay="500"
                                    >
                                       <span className="number">03</span>
                                       <h3>Enjoy the app</h3>
                                       <p>
                                          Sell and Buy Products with Best Bid
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </section>

                        <section className="section secfourcls">
                           <div className="container">
                              <div className="row align-items-center crtlot">
                                 <div
                                    className="col-md-4 me-auto"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                 >
                                    <h2 className="mb-4">Create a lot</h2>
                                    <p className="mb-4">
                                       All the valid information related to item
                                       for bidding i.e. lot name, description of
                                       the item, category of item, date of
                                       bidding, minimum price, end time of
                                       bidding, payment method, images of
                                       product
                                    </p>
                                    <p>
                                       <a href="#" className="btn btn-primary">
                                          Get Started
                                       </a>
                                    </p>
                                 </div>
                                 <div
                                    className="col-md-6"
                                    data-aos="zoom-in"
                                    data-aos-delay="500"
                                 >
                                    <img
                                       src={Img}
                                       alt="Auction Image"
                                       className="img-fluid"
                                    />
                                 </div>
                              </div>
                           </div>
                        </section>

                        <section className="section">
                           <div className="container">
                              <div className="row align-items-center">
                                 <div
                                    className="col-md-4 ms-auto order-2"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                 >
                                    <h2 className="mb-4">Make a bid</h2>
                                    <p className="mb-4">
                                       Customer will see the product detail and
                                       if interested in product then he/she will
                                       make a bid of that product, valid
                                       identity proof
                                    </p>
                                    <p>
                                       <a href="#" className="btn btn-primary">
                                          Get Started
                                       </a>
                                    </p>
                                 </div>
                                 <div
                                    className="col-md-6"
                                    data-aos="zoom-in"
                                    data-aos-delay="500"
                                 >
                                    <img
                                       src={BidImg}
                                       alt="Auction Image"
                                       className="img-fluid"
                                    />
                                 </div>
                              </div>
                           </div>
                        </section>
                     </div>
                  </div>
               </div>

               {/* PRODUCT COMPONENT */}

               {/* FEATURED PRODUCT */}

               <section className="product_section layout_padding">
                  <div className="container">
                     <div className="heading_container heading_center">
                        <div className="section-title" data-aos="fade-up">
                           <h2>Featured Auctions</h2>
                           <p>Start Bidding Now!</p>
                        </div>
                     </div>
                     <div className="row">
                        {products &&
                           products.map((product) => (
                              <Product product={product} />
                           ))}
                     </div>
                     <div className="btn_box">
                        <NavLink excat to={"/lot"} className="view_more-link">
                           View More
                        </NavLink>
                     </div>
                  </div>
               </section>
            </>
         )}
      </>
   );
};

export default Home;
