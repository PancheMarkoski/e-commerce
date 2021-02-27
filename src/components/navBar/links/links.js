import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Links.module.css'

const links = ({linkName, path}) => {
    return (
        <li ><Link className={classes.NavBarLink} to={path}>{linkName}</Link></li>
    )
}

export default links
