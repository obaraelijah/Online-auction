import {
      ALL_PRODUCT_REQUEST,
      ALL_PRODUCT_SUCCESS ,
      ALL_PRODUCT_FAIL,
      PRODUCT_DETAILS_REQUEST,
      PRODUCT_DETAILS_SUCCESS,
      PRODUCT_DETAILS_FAIL,
      NEW_PRODUCT_REQUEST,
      NEW_PRODUCT_SUCCESS,
      NEW_PRODUCT_RESET,
      NEW_PRODUCT_FAIL,
      DELETE_PRODUCT_REQUEST,
      DELETE_PRODUCT_SUCCESS,
      DELETE_PRODUCT_RESET,
      DELETE_PRODUCT_FAIL,
      UPDATE_PRODUCT_REQUEST,
      UPDATE_PRODUCT_SUCCESS,
      UPDATE_PRODUCT_RESET,
      UPDATE_PRODUCT_FAIL,
      BIDDED_PRODUCT_REQUEST,
      BIDDED_PRODUCT_SUCCESS,
      BIDDED_PRODUCT_FAIL,
      SELLER_PRODUCT_REQUEST,
      SELLER_PRODUCT_SUCCESS,
      SELLER_PRODUCT_FAIL,
      CLEAR_ERRORS
} from "../constants/productConstants";

export const productReducer = (state = { products: [] }, action) =>{

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return{
                loading:true,
                product:[],
            };
    
            case ALL_PRODUCT_SUCCESS:
            return{
                loading:false,
                products:action.payload.products,
                productCount:action.payload.productCount,
                resultPerPage:action.payload.resultPerPage,
            };
    
            case ALL_PRODUCT_FAIL:
            return{
                loading:false,
                error: action.payload,
            };
            
            case CLEAR_ERRORS:
            return{
                ...state,
                error: null,          
            };
    
        default:
            return state;
    }
    
    };

// for single product details
export const productDetailsReducer = (state = { product: {} }, action) =>{

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return{
                loading:true,
                ...state,
            };
    
            case PRODUCT_DETAILS_SUCCESS:
            return{
                loading:false,
                product:action.payload.product,
                sellerDetails:action.payload.sellerDetails,
                winStatus:action.payload.winStatus,
            };
    
            case PRODUCT_DETAILS_FAIL:
            return{
                loading:false,
                error: action.payload,
            };
            
            case CLEAR_ERRORS:
            return{
                ...state,
                error: null,          
            };
    
        default:
            return state;
    }
    
    };

