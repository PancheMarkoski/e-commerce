import React, {Fragment, useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'

import classes from './productsList.module.css'
import { fetchProducts } from '../../actions'


const ProductsList = ({products, term, category}) => {


    const dispatch = useDispatch()
    useEffect(() => {
    //   if(!window.location.hash) {
    //     window.location = window.location + '#loaded';
    //     window.location.reload();
    // }
        dispatch(fetchProducts())
      }, []);
      console.log(products)
      
    const renderProductsCard = (term, category) => {
       return products.filter((product) => {
         if (term == "") {
           return product
         } else if(product.title.toLowerCase().includes(term.toLowerCase())) {
           return product
         } else if (product.category.includes(category)) {
           return product
         }
       }).map(product => {
         if(category === true) {

           if(product.imgUrl) {
               
               return(
                <li key={product.id} className={classes.CardsItem}>
                  <div className={classes.Card}>
                    <div 
                    className={`${classes.CardImage} 
                    ${classes.CardImageFlowers} 
                    ${classes.Img}
                    `} style={{backgroundImage: "url(" + `"${product.imgUrl}"` + ")"}}></div>
                    <div className={classes.CardContent}>
                      <div className={classes.CardTitle}>{product.title}</div>
                      <p className={classes.CardText}>{product.desc}</p>
                      <button className={classes.Btn}>Add to cart</button>
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
                 <div 
                 className={`${classes.CardImage} 
                 ${classes.CardImageFlowers} 
                 ${classes.Img}
                 `} style={{backgroundImage: "url(" + `"${product.imgUrl}"` + ")"}}></div>
                 <div className={classes.CardContent}>
                   <div className={classes.CardTitle}>{product.title}</div>
                   <p className={classes.CardText}>{product.desc}</p>
                   <button className={classes.Btn}>Add to cart</button>
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
                {renderProductsCard(term, category)}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {products: Object.values(state.products)}
}

export default connect(mapStateToProps, {fetchProducts})(ProductsList)
