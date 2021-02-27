import React from 'react'
import { connect } from 'react-redux'

import classes from './NavBar.module.css'
import LeftNav from './leftNav/leftNav'
import RightNav from './rightNav/rightNav'

const NavBar = ({isAuth}) => {
    return (
        <ul className={classes.NavBar}>
            <LeftNav isAuth={isAuth}/>
            <RightNav isAuth={isAuth}/>
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.idToken === null 
    }
}

export default connect(mapStateToProps)(NavBar)
