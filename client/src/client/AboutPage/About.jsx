import React from 'react';
import Img from "../images/values-1.png";
import Img2 from "../images/values-3.png";
import Img3 from "../images/features.png";
import About3 from "../images/about3.jpg";

import About1 from "../images/about1.jpg";

import About4 from "../images/about4.png";
import Team from "../images/team.png";
import Loader from '../Loader/Loader';
import { FcNext } from 'react-icons/fc';
import MetaData from '../MetaData/MetaData';


import "./aboutstyle.scss";
import { NavLink } from 'react-router-dom';

const About = () => {
  return (
    <>
    <MetaData title="ABOUT US"></MetaData>
     
      <div className="container-fluid nav_bg abtcls">
        <div className='row'>
          <div className='col-10 mx-auto'>
            <section id="values" className="values">
              <div className="container" data-aos="fade-up">

                  <div className="section-title" data-aos="fade-up">
                        <h2>About Us</h2>
                        <p>Nonprofit Auction Software</p>
                 </div>

                <div className="row abtclssection">

                  <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="box">
                      <img src={About4} className="img-fluid" alt="" />
                      <h3>Mission</h3>
                      <p>Auctioning in physical mode can be challenging and limits the reach of selling products globally. 
                        It requires travel to the auction location. However, with this app, anyone with a good internet connection can easily sell their products through bidding.
                        Expand your selling potential and reach a wider audience by leveraging the convenience of our platform. Start selling today!</p>
                    </div>
                  </div>

                  <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="400">
                    <div className="box">
                      <img src={About3} className="img-fluid" alt="" />
                      <h3>Ease of Use</h3>
                      <p>Seamless auctions with verified sellers and bidders. Generate results easily on our secure website. Join now and bid with confidence!</p>
                    </div>
                  </div>

                  <div className="col-lg-4 mt-4 mt-lg-0" data-aos="fade-up" data-aos-delay="600">
                    <div className="box">
                      <img src={About1} className="img-fluid" alt="" />
                      <h3>Mordern Web</h3>
                      <p>Our modern web app includes a powerful Filter function. Easily customize your search based on your preferences and find the items that match your interests.
                         Enjoy a tailored auction experience with our intuitive filtering options. Explore our web app now!</p>
                    </div>
                  </div>

                </div>
              </div>
            </section>


{/* WHY-US */}


<section id="why-us" className="why-us section-bg">
      <div className="container-fluid" data-aos="fade-up">

      <div className="section-title" data-aos="fade-up">
          <h2>FAQ'S</h2>
          <p>Nonprofit Auction Software</p>
        </div>


        <div className="row">

          <div className="col-lg-7 d-flex flex-column justify-content-center align-items-stretch  order-2 order-lg-1">

            <div className="content">
              <h3><strong> We have created a list of common questions that we have received from members</strong></h3>
              <p>
              If you do not find your answer on this page, please Contact Us and we will resolve your queries.
              </p>
            </div>

            <div className="accordion-list">
              <ul>
                <li>
                  <a data-bs-toggle="collapse" className="collapse" data-bs-target="#accordion-list-1"><span>01</span>
                        Auction & Bid Information Best-Bid <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-1" className="collapse show" data-bs-parent=".accordion-list">
                    <p>
                    BestBid, a trusted platform, is dedicated to providing sellers with a bidding platform to get the best price for their products. Our team ensures the verification of all users, making the platform secure and safe. We strive to maintain a 100% secure environment for all participants. Join BestBid today and experience the benefits of a reliable and protected marketplace.
                    </p>
                  </div>
                </li>

                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#accordion-list-2" className="collapsed"><span>02</span> Who can auction the property through Best-Bid <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-2" className="collapse" data-bs-parent=".accordion-list">
                    <p>
                    Best-Bid provides a platform for individuals, institutions, banks, and government departments to auction properties. 
                    Individuals are required to provide all necessary details as requested by RBS in the specified manner. Banks and institutions can auction properties in accordance with relevant Acts and rules. 
                    To ensure security, a unique user ID and password will be delivered exclusively to the authorized officer of the bank/institution. Additionally, a Service Level Agreement (SLA) will be executed between RBS and the institutions for further assurance and cooperation. 
                    Participate in Best-Bid auctions and benefit from a secure and streamlined property auction process. 
                    </p>
                  </div>
                </li>

                <li>
                  <a data-bs-toggle="collapse" data-bs-target="#accordion-list-3" className="collapsed"><span>03</span> 
                    How does one get the contact information?<i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                  <div id="accordion-list-3" className="collapse" data-bs-parent=".accordion-list">
                    <p>
                    By registration of seller with  their details scheme for the particular property.we got his data and after verification seller data will be available with their Auction ,  When Auction Ends Seller got Bidder information ad well as bid history and user can contact the seller.
                    </p>
                  </div>
                </li>

              </ul>
            </div>

          </div>

          <div className="col-lg-5 align-items-stretch order-1 order-lg-2 img bgimgctrl" style={{backgroundImage: `url(${Img2})`}} data-aos="zoom-in" data-aos-delay="150">&nbsp;</div>
        </div>
        {/* <img src={Img2} className="img-fluid" alt="" /> */}
      </div>
    </section>


    {/* END WHY US */}

            {/*  About Writtern */}
            <section id="about" className="about">
              <div className="container sectionfivecls" data-aos="fade-up">

                <div className="section-title">
                  <h2>Our Values</h2>
                  <p>Nonprofit Auction Software</p>
                </div>

                <div className="row content ourvaluescls">
                  <div className="col-lg-6">
                    <p>
                    <FcNext/>Every day, people build businesses on eAuction. Nonprofit organizations raise vital funds. Entrepreneurs gain new skills and access to new markets where they can turn their dreams and ideas into business success.
                    </p>
                    <p>
                    <FcNext/> eAuction creates inspiring ecommerce experiences for our buyers, sellers and developers. Embracing innovation has been a cornerstone of our growth and customer loyalty over the past 25 years.
                    </p>

                  </div>
                  <div className="col-lg-6 pt-4 pt-lg-0">
                    <p>
                    <FcNext/> Greater Giving works exclusively with schools and nonprofits across the nation—offering integrated technologies to help simplify event management, quickly train volunteers, streamline check-in and check-out and raise more funds.
                    </p>
                    <NavLink to="/" className="btn-learn-more">Learn More</NavLink>
                  </div>
                </div>

              </div>
            </section>
            {/*  End About Section */}
          </div>
        </div>
      </div>


    </>
    
    );
};

export default About;
