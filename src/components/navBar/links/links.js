import React, {useState, useEffect, Fragment} from 'react'
import { Link } from 'react-router-dom'
import {RiShoppingCart2Line} from 'react-icons/ri'
import { connect } from 'react-redux'


import classes from './Links.module.css'

const Links = ({linkName, path, cart}) => {
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {  
       let count = 0;
       cart.forEach(item => {
           count += item.qty
       })

       setCartCount(count);
    }, [cart, cartCount])

   const renderCart = () => {
       return (
           <Fragment>
               <RiShoppingCart2Line /> {cartCount}
           </Fragment>
       ) 
   }

    return (
        <li ><Link className={classes.NavBarLink} to={path}>{linkName === "Cart" ? renderCart() : linkName}</Link></li>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart
    }
}

export default connect(mapStateToProps)(Links)
