import fireAuthApi from '../apis/fireAuth';
import fireUser from '../apis/fireUser';
import fireDb from '../apis/fireDatabase';
import history from '../history';
import { 
   SIGN_IN,
   SIGN_OUT,
   SIGN_ERR,
   SIGN_IN_USER,
   AUTH_LOGOUT,
   SIGN_IN_WITH_GOOGLE,
   CREATE_PRODUCT,
   FETCH_PRODUCTS,
   FETCH_PRODUCT,
   EDIT_PRODUCT,
   DELETE_PRODUCT,
   ADD_TO_CART,
   REMOVE_FROM_CART,
   ADJUST_QTY,
   LOAD_CURRENT_ITEM
} from './types';

export const signIn = (userData, idToken) => {
   return {
      type: SIGN_IN,
      payload: userData,
      idToken: idToken
   }
} 
export const signErr = (err) => {
   return {
      type: SIGN_ERR,
      payload: err
   }
}
export const signOut = () => {
   return {
      type: SIGN_OUT,
   }
}

export const signInUser = (userData, idToken, authData) => {
   return {
      type: SIGN_IN_USER,
      payload: userData,
      idToken: idToken,
      authData: authData
   }
}

export const singInWithGoogle = (userData, idToken) => {
   return {
      type: SIGN_IN_WITH_GOOGLE,
      payload: userData,
      idToken: idToken
   }
  
}

export const logout = () => {

   localStorage.removeItem("token");
   localStorage.removeItem("userData");
   return {
      type: AUTH_LOGOUT
   }
}

export const checkAuthTimeout = (expirationTime) => {
   return (dispatch) => {  
      setTimeout(() => {
        dispatch(logout());
      }, expirationTime * 1000);
    };
}

export const createFireAccount = (authData, userData) => async dispatch => {
     await fireAuthApi.post("", authData)
    .then(response => {
       console.log(response)
       //dispatch(signIn(response.data))
       dispatch(signInUser(userData, response.data.idToken, response.data))
       dispatch(checkAuthTimeout(response.data.expiresIn))
       
       // console.log(response.data.expiresIn)
       history.push('/')
    })
    .catch(error => {
       console.log(error.message)
       dispatch(signErr(error.message))
    })
   
    //dispatch({ type: CREATE_FIRE_ACCOUNT, payload: response.data });
}

export const signInFireUser = signInData => async dispatch => {
    await fireUser.post("", signInData)
   .then(response => {
      localStorage.setItem("token", response.data.idToken);
		localStorage.setItem("userData", JSON.stringify(response.data));
      console.log(response)
      dispatch(signIn(response.data, response.data.idToken))
      dispatch(checkAuthTimeout(response.data.expiresIn))
      //dispatch(signInUser(userData))
      //console.log(response)
      history.push('/')
   })
   .catch(error => {
      console.log(error)
      dispatch(signErr(error))
   })
}

export const authCheckState = () => dispatch => {
   let token = localStorage.getItem("token");
   let userData = JSON.parse(localStorage.getItem('userData'));

   if(!token) {
      dispatch(logout())
   }else{
      dispatch(singInWithGoogle(userData, token))
   }
}


// post created product data to server
export const createProduct = (createProductFormValues) => async (dispatch, getState) => {
   
    const {uid} = getState().auth.authData
    const {localId} = getState().auth.authData
   
    const response = await fireDb.post("/products.json", { ...createProductFormValues, uid, localId})
    dispatch({ type: CREATE_PRODUCT, payload: response.data})

   // // reload
   // window.location.reload();
   
    // push to homepage
    history.push('/')
}

// get products data from firebase
export const fetchProducts = () => async dispatch => {
   
   await fireDb.get("/products.json")
   
   .then((res) => {
      const fatchedProducts = [];
      for (let key in res.data) {
         if(key) {
            fatchedProducts.push({
               ...res.data[key],
               id: key,
             });
         }
      
      }
      dispatch({ type: FETCH_PRODUCTS, payload: fatchedProducts});   
    })

   //   // reload
   //    window.location.reload();  
   
}

// get product data from firebase
export const fetchProduct = (id) => async dispatch => {
   const response = await fireDb.get(`/products/${id}.json`)

   dispatch({ type: FETCH_PRODUCT, payload: response.data, ID: id })
}

// edit product data
export const editProduct = (id, productFormValue) => async dispatch => {
   const response = await fireDb.patch(`/products/${id}.json`, productFormValue)

   dispatch({ type: EDIT_PRODUCT, payload: response.data, ID: id })
   // // reload
   // window.location.reload();
   // push to homepage
   history.push('/myproducts')
}

// delete product data
export const deleteProduct = (id) => async dispatch => {
   await fireDb.delete(`/products/${id}.json`)

   dispatch({type: DELETE_PRODUCT, payload: id})
   history.push('/myproducts')
}

// CART ITEM ACTION

// add item to cart
export const addToCart = (itemID) => {
   return{
      type: ADD_TO_CART,
      payload: {
         id: itemID
      } 
   }
}

// remove item from cart
export const removeFromCart = (itemID) => {
   return {
      type: REMOVE_FROM_CART,
      payload: {
         id: itemID
      }     
   }
}

// adjustQty
export const adjustQty = (itemID, value) => {
   return {
      type: ADJUST_QTY,
      payload: {
         id: itemID,
         qty: value
      }
   }
}


// load current item
export const loadCurrentItem = (item) => {
   return{
      type: LOAD_CURRENT_ITEM,
      payload: item
   }
}