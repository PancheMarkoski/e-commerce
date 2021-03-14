import React, {useEffect} from 'react';
import {connect, useDispatch} from 'react-redux'
import { logout } from '../../actions'
import {Redirect} from 'react-router-dom'
import firebase from '../../firebase'




const Logout = () => { 
    
     const dispatch = useDispatch()

    useEffect(() => {
        firebase.auth().signOut().then(() => {
            console.log("Sign-out successful");
          }).catch((error) => {
            // An error happened.
          });
        dispatch(logout())
    }, );
    
    return (

    <Redirect to="/"/>
    )
}

export default connect(null, logout)(Logout)
