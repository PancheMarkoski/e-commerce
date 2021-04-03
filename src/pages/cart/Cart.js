import React, {useState, useEffect, Fragment } from 'react'
import {connect} from 'react-redux'

import CartItem from '../../components/cartItem/CartItem'
import classes from './Cart.module.css'
const Cart = ({cart}) => {
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
       let items = 0;
       let price = 0;
       
       cart.forEach(item => {
        items += item.qty;
        price += item.qty * item.price;
       });

       setTotalItems(items)
       setTotalPrice(price)
    }, [cart, totalPrice, setTotalPrice, totalItems, setTotalItems])

    return (
        <Fragment>
        <h2 className={classes.CartHeader}>My Cart</h2>
            <div className={classes.Cart}>
                <ul className={classes.Cards}>
                    {cart.map(item => {
                    return ( 
                        <CartItem key={item.id} itemData={item}/>
                            )
                        })}
                </ul>
                <div className={classes.CartSummary}>
                <div className={classes.CardContent}>
                         <div className={classes.CardTitle}>Cart Sammary</div>
                         <div className={classes.CartTotal}>
                           <span>Total: ({totalItems} items)</span>
                           <span>${totalPrice}</span>
                         </div>
                         <button>Proceed To Chackout</button>
                    </div>
                </div>            
            </div>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        cart: state.shop.cart
    }
}

export default connect(mapStateToProps)(Cart)
