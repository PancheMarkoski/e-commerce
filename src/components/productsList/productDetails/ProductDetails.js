import React, { useEffect } from 'react'
import { fetchProduct } from '../../../actions'
import { connect, useDispatch } from 'react-redux'
import classes from './ProductDetails.module.css'

const ProductDetails = ({match, product}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProduct(match.params.id))
      }, []);
    let URL = product.imgUrl
    if(!match.params.id) {
        return(
            <div>
                Loading..
            </div>
        )
    }
        return(
            <div  
            className={classes.Header} >
                <div 
                className={classes.HeaderImg}
                style={{
                    background: `linear-gradient(to right bottom, rgba(171, 184, 186, 0.8), rgba(51, 55, 56, 0.8)), url(${URL})`,
                    height: "80vh",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
                    position: "relative",
                    margin: "0 2rem",
                    width: "100vh",
                    margin: "0rem 1rem",
                    maxWidth: "30%",
                   
                }}
                >
                </div>
                <div className={classes.HeaderDetails}>
                    <h2 className={classes.HeadingTitle}>{product.title}</h2>
                    <h4>Descrtiption</h4>
                    <p className={classes.ParagtaphDetails}>
                    {product.desc}
                    </p>
                    <h4>Price: {product.price}$</h4>
                </div>
            </div>
        )
}

const mapStateToProps = (state, ownProps) => {
    return{
        product: state.products[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchProduct})(ProductDetails)
