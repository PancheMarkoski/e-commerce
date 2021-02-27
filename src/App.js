import React, {useEffect} from 'react'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import {connect, useDispatch} from 'react-redux'
import {authCheckState} from './actions'

import history from './history'
import Homepage from './pages/homepage/Homepage'
import NavBar from './components/navBar/navBar'
import SignUp from './components/signUpIn/signUpIn'
import Logout from './components/logout/Logout'
import ForgotPassword from './components/forgotPassword/ForgotPassword'
import AdminPanel from './components/adminPanel/AdminPanel'

const App = ({isAuth}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authCheckState())
  }, []);


  let route = (
    <Switch>
       <Route path="/signin" exact component={SignUp} />
       <Route path="/" exact component={Homepage} />
       <Redirect to="/" />
    </Switch>
  );

  if(!isAuth) {
    route = (
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/logout" exact component={Logout} />  
          <Route path="/forgotpassword" exact component={ForgotPassword} />  
          <Route path="/adminpanel" exact component={AdminPanel} />  
          <Redirect to="/" />
        </Switch>
      
    )
  }

  return (
    <Router history={ history }>
      <NavBar />
       {route}
      
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.idToken === null 
  }
}

export default connect(mapStateToProps, {authCheckState})(App)
