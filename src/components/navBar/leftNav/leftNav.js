import React from 'react'

import Links from '../links/links'
import classes from './LeftNav.module.css'

const leftNav = () => {
    return (
        <div className={classes.NavBarLink}>
            <Links linkName="Home" path={"/"}/>
        </div>
    )
}

export default leftNav
