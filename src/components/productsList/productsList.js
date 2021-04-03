import React, { useState, useEffect } from 'react'
import {connect, useDispatch} from 'react-redux'
import { fetchProducts, addToCart } from '../../actions'
import { Link } from 'react-router-dom'

import classes from './productsList.module.css'


const ProductsList = ({products, term, category}) => {


    const dispatch = useDispatch()
    useEffect(() => {
         dispatch(fetchProducts())        
      },[]);
      console.log(products)
      
      const renderProductsCard = (term, category) => {
      return products.filter((product) => {
         if (term === "") {
           return product
         } else if(product.title.toLowerCase().includes(term.toLowerCase())) {
           return product
         }
       }).map(product => {

         if(category === true) {
           if(product.id) {
               return(
                <li key={product.id} className={classes.CardsItem}>
                  <div className={classes.Card}>
                    <Link to={`/product/details/${product.id}`}>
                      <div 
                      className={`${classes.CardImage} 
                      ${classes.CardImageFlowers} 
                      ${classes.Img}
                      `} style={{backgroundImage: "url(" + `"${product.imgUrl}"` + ")"}}>
                      </div>
                    </Link>
                    <div className={classes.CardContent}>
                      <div className={classes.CardTitle}>{product.title}</div>
                      <p className={classes.CardText}>{product.desc.slice(0, 100)}</p>
                      <div className={classes.CardPrice}>{product.price}$</div>
                      <button onClick={() => dispatch(addToCart(product.id))} className={classes.Btn}>Add to cart</button>
                    </div>
                  </div>
                </li>
             
               )
           }
         } else {
          if(product.imgUrl && (product.category === category)) {
               
            return(
             <li key={product.id} className={classes.CardsItem}>
               <div className={classes.Card}>
                <Link to={`/product/details/${product.id}`}>
                  <div 
                  className={`${classes.CardImage} 
                  ${classes.CardImageFlowers} 
                  ${classes.Img}
                  `} style={{backgroundImage: "url(" + `"${product.imgUrl}"` + ")"}}>
                  </div>
                </Link>
                 <div className={classes.CardContent}>
                   <div className={classes.CardTitle}>{product.title}</div>
                   <p className={classes.CardText}>{product.desc.slice(0, 100)}</p>
                   <div className={classes.CardPrice}>{product.price}$</div>
                   <button onClick={() => dispatch(addToCart(product.id))} className={classes.Btn}>Add to cart</button>
                 </div>
               </div>
             </li>
          
            )
        }
         }
       })
    }

    return (
        <div className={classes.Wrap}> 
            <ul className={classes.Cards}>
                {products ? renderProductsCard(term, category) : 'loading'}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {products: Object.values(state.products)}
}

export default connect(mapStateToProps, {fetchProducts, addToCart})(ProductsList)
