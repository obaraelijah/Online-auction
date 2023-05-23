import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getBiddedProducts } from "../../actions/productAction";
import Product from "../HomePage/Product";
import Loader from "../Loader/Loader";
import MetaData from "../MetaData/MetaData";
import "./bidstatus.scss";

const BidStatus = () => {
   const alert = useAlert();
   const dispatch = useDispatch();
   const { myproducts, loading, error } = useSelector(
      (state) => state.myproducts
   );

   useEffect(() => {
      if (error) {
         return alert.error(error);
      }
      dispatch(getBiddedProducts());
   }, [dispatch, error, alert]);

   return (
      <>
         {loading ? (
            <Loader />
         ) : (
            <>
               <MetaData title="BID STATUS"></MetaData>

               <div className="container-fluid  bidstatuscls">
                  <div className="row">
                     <div className="col-10 mx-auto">
                        <section className="product_section layout_padding">
                           <div className="container">
                              <div className="heading_container heading_center">
                                 <div
                                    className="section-title"
                                    data-aos="fade-up"
                                 >
                                    <h2>Bid Status</h2>
                                    <p>Auctions you bidded</p>
                                 </div>
                              </div>
                              <div className="row">
                                 {myproducts &&
                                    myproducts.map((product) => (
                                       <Product product={product} />
                                    ))}
                              </div>
                           </div>
                        </section>
                     </div>
                  </div>
               </div>
            </>
         )}
      </>
   );
};

export default BidStatus;
