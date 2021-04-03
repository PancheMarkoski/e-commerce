import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import authFireReducer from './authFireReducer'
import productsReducer from './productsReducer'
import cartReducer from './cartReducer'

export default combineReducers({
    auth: authFireReducer,
    form: formReducer,
    products: productsReducer,
    shop: cartReducer
});