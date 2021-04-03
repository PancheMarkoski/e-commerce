import React, {useState, useEffect}  from 'react'
import { connect } from 'react-redux'

import Links from '../links/links'
import classes from './RightNav.module.css'



const RightNav = ({isAuth, cart}) => {
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {  
       let count = 0;
       cart.forEach(item => {
           count += item.qty
       })

       setCartCount(count);
    }, [cart, cartCount])

    return (
        <div className={classes.NavBarLink}>

            {isAuth ? null : <Links linkName="Admin" path="/create/product" />}
            {isAuth ? null : <Links linkName={`Cart ${cartCount} `} path="/cart" />}
            {isAuth ? <Links linkName="Sign In" path="/signin"/> 
            : <Links linkName="Logout" path="/logout" />
            }
                
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cart: state.shop.cart
    }
}

export default connect(mapStateToProps)(RightNav)
