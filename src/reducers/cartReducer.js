import _ from 'lodash';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADJUST_QTY,
    LOAD_CURRENT_ITEM,
    FETCH_PRODUCTS
} from '../actions/types';

const INITIAL_STATE = {
    products: [],
    cart: [],
    currentItem: null
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_TO_CART:
            // Get the item data from from the product array
            const item = state.products.find((prod) => prod.id === action.payload.id)
            // Chack if the item is in cart already
            const inCart = state.cart.find((item) => item.id === action.payload.id ? true : false)
            return {
                ...state,
                cart: inCart ? state.cart.map(item => item.id === action.payload.id ? {...item, qty: item.qty + 1 } : item) 
                : [...state.cart, {...item, qty: 1}],
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload.id)
            }
        case ADJUST_QTY:
            return {    
                ...state, 
                cart: state.cart.map(item => item.id === action.payload.id ? {...item, qty: +action.payload.qty} : item)
            }
        case LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload
            }
        case FETCH_PRODUCTS:
            return {...state, products: action.payload}
        default:
            return state;
    }
}