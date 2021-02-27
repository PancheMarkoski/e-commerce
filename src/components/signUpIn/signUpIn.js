import React, { useState } from 'react'
import { SiGmail } from 'react-icons/si';	
import { FaFacebookF } from 'react-icons/fa';	
import { AiFillGithub } from 'react-icons/ai';	
import {connect, useDispatch} from 'react-redux'
import firebase from '../../firebase'
import {Link} from 'react-router-dom'

import {createFireAccount, signInFireUser, singInWithGoogle, checkAuthTimeout, signErr} from '../../actions'
import classes from './SignUpIn.module.css'

const SignUpIn = () => {
 
    const [isActive, setActive] = useState("false");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const dispatch = useDispatch();

    const handleToggle = () => {    
      setActive(!isActive)
	  };
	  
	const handleSignUpSubmit = (e) => {
		const userData = {
			name: name
		}

		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		}
		e.preventDefault()
		dispatch(createFireAccount(authData, userData)) 
		//console.log(authData)
	}

	const handleSignInSubmit = (e) => {
		const signInData = {
			email: email,
			password: password,
			returnSecureToken: true,

		}
		e.preventDefault()
		dispatch(signInFireUser(signInData))
		//console.log(signInEmail, signInPassword)
	}

	const handleGoogleSignIn = () => {
		var provider = new firebase.auth.GoogleAuthProvider();

		firebase.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;

				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				// ...

		
				dispatch(singInWithGoogle(user, token))
				localStorage.setItem("token", token);
				localStorage.setItem("userData", JSON.stringify(user));


				
				

			}).catch((error) => {
				console.log(error)
			});
	}

	const handleFacebookSignIn = () => {
		var provider = new firebase.auth.FacebookAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then((result) => {
				/** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;

				// The signed-in user info.
				var user = result.user;

				// This gives you a Facebook Access Token. You can use it to access the Facebook API.
				var accessToken = credential.accessToken;


				dispatch(singInWithGoogle(user, accessToken))
				
				localStorage.setItem("token", accessToken);
				localStorage.setItem("userData", JSON.stringify(user));

				// ...
				//dispatch(checkAuthTimeout(user.stsTokenManager.expirationTime))

				// console.log(user)
			})
			.catch((error) => {
				console.log(error)

				// ...
			});
	}

	const handleGitHubSignIn = () => {
		var provider = new firebase.auth.GithubAuthProvider();

		firebase
		.auth()
		.signInWithPopup(provider)
		.then((result) => {
			/** @type {firebase.auth.OAuthCredential} */
			var credential = result.credential;

			// This gives you a GitHub Access Token. You can use it to access the GitHub API.
			var token = credential.accessToken;

			// The signed-in user info.
			var user = result.user;
			// ...
			dispatch(singInWithGoogle(user, token))

			localStorage.setItem("token", token);
			localStorage.setItem("userData", JSON.stringify(user));
			//console.log(user)
		}).catch((error) => {
			// Handle Errors here.
			console.log(error)
		});
	}

	  
	

    return(
        <div className={classes.SignInForm}>
            <div className={ isActive ? classes.Container : `${classes.Container} ${classes.RightPanelActive}`} id="container">
	<div className={`${classes.FormContainer} ${classes.SignUpContainer}`}>
		<form onSubmit={handleSignUpSubmit}>
			<h1>Create Account</h1>
			<div className={classes.SocialContainer}>
				<Link to="/" onClick={handleGoogleSignIn} className={classes.Social}><SiGmail style={{color: 'black'}} /></Link>
				<Link to="/" onClick={handleFacebookSignIn} className={classes.Social}><FaFacebookF style={{color: 'black'}} /></Link>
				<Link to="/" onClick={handleGitHubSignIn} className={classes.Social}><AiFillGithub style={{color: 'black'}} /></Link>
			</div>
			<span>or use your email for registration</span>
			<input type="text" placeholder="Name" value={name}  onChange={e => setName(e.target.value)} />
			<input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
			<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button>
                Sign Up
            </button>
		</form>
	</div>
	<div className={`${classes.FormContainer} ${classes.SignInContainer}`}>
		<form onSubmit={handleSignInSubmit}>
			<h1>Sign in</h1>
			<div className={classes.SocialContainer}>
				<Link to="/" onClick={handleGoogleSignIn} className={classes.Social}><SiGmail style={{color: 'black'}} /></Link>
				<Link to="/" onClick={handleFacebookSignIn} className={classes.Social}><FaFacebookF style={{color: 'black'}} /></Link>
				<Link to="/" onClick={handleGitHubSignIn} className={classes.Social}><AiFillGithub style={{color: 'black'}} /></Link>
			</div>
			<span>or use your account</span>
			<input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
			<input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
			<Link style={{color: 'black', padding: '.7rem', textDecoration: 'none'}} to="/forgotpassword">Forgot your password?</Link>
			<button>Sign In</button>
		</form>
	</div>
	<div className={classes.OverlayContainer}>
		<div className={classes.Overlay}>
			<div className={`${classes.OverlayPanel} ${classes.OverlayLeft}`}>
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button onClick={handleToggle} className={classes.Ghost} id="signIn">Sign In</button>
			</div>
			<div className={`${classes.OverlayPanel} ${classes.OverlayRight}`}>
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button onClick={handleToggle} className={classes.Ghost} id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
</div>
        </div>
    )
}



		

export default connect(null, {createFireAccount, signInFireUser, singInWithGoogle, checkAuthTimeout, signErr})(SignUpIn)
