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
import CreateProduct from './components/adminPanel/createProduct/CreateProduct'
import MyProducts from "./components/adminPanel/myProducts/MyProducts"
import EditProduct from './components/adminPanel/editProduct/EditProduct'
import ProductDetails from './components/productsList/productDetails/ProductDetails'

const App = ({isAuth}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authCheckState())
  }, );


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
          <Route path="/logout" exact component={Logout} />  
          <Route path="/forgotpassword" exact component={ForgotPassword} />  
          <Route path="/myproducts" exact component={MyProducts} />  
          <Route path="/myproducts/delete/:id" exact component={MyProducts} />  
          <Route path="/create/product" exact component={CreateProduct} />  
          <Route path="/edit/product/:id" exact component={EditProduct} />  
          <Route path="/product/details/:id" exact component={ProductDetails} />  
          <Route path="/" exact component={Homepage} />
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
