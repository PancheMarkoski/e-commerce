import React from 'react'


import Links from '../links/links'
import classes from './RightNav.module.css'



const RightNav = ({isAuth}) => {
    
    return (
        <div className={classes.NavBarLink}>

            {isAuth ? null : <Links linkName="Admin" path="/create/product" />}
            {isAuth ? null : <Links linkName="Cart" path="/cart" />}
            {isAuth ? <Links linkName="Sign In" path="/signin"/> 
            : <Links linkName="Logout" path="/logout" />
            }
                
        </div>
    )
}


export default RightNav
