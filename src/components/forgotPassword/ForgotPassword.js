import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { auth } from '../../firebase'

import classes from './ForgotPassword.module.css'

const ForgotPassword = () => {

    const [email, setEmail] = useState('')  
    const [message, setMessage] = useState('')  
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
        };

        await auth.sendPasswordResetEmail(email, config)
        .then(() => {
            setEmail("")
            setMessage("Chack your email for password resset link")
        })
        .catch((error) => {
            console.log("ERROR MSG IN FORGOT PASSWORD", error);
            setMessage(error.message);
            setEmail('')
        })

    }  

    return (
        <div className={classes.LoginPage}>
            <div className={classes.Form}>
                <form onSubmit={handleSubmit} className={classes.LoginForm}>
                    <input 
                    type="email" 
                    placeholder="Type your email" 
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    {email ? <button className={classes.Btn}>submit</button> : <button disabled>submit</button>}
                    
                    <p className={classes.Message}>Not registered? <Link to="/signin" style={{color: '#ff416c', textDecoration: 'none'}}>Create an account</Link></p>
                    <p className={classes.Message} style={{color: "#ff416c"}}>{message ? message : null}</p>
                </form>
            </div>
      </div>
    )
}

export default ForgotPassword
