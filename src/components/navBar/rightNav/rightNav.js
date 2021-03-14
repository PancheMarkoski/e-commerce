import React from 'react'

import Links from '../links/links'
import classes from './RightNav.module.css'



const rightNav = ({isAuth}) => {
    return (
        <div className={classes.NavBarLink}>

            {isAuth ? null : <Links linkName="Admin" path="/create/product" />}
            {isAuth ? <Links linkName="Sign In" path="/signin"/> 
            : <Links linkName="Logout" path="/logout" />
            }
                
        </div>
    )
}

export default rightNav
