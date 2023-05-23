import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
   biddedproductReducer,
   deleteProductReducer,
   newProductReducer,
   productDetailsReducer,
   productReducer,
   sellerproductReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
   products: productReducer,
   productDetails: productDetailsReducer,
   newProduct: newProductReducer,
   myproducts: biddedproductReducer,
   sellerproducts: sellerproductReducer,
   deleteProduct: deleteProductReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
