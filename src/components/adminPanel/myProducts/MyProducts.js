import React, {useState, useEffect} from 'react'
import {connect, useDispatch} from 'react-redux'
import { fetchProducts, fetchProduct, deleteProduct } from "../../../actions"
import { Link } from 'react-router-dom'

import classes from './MyProducts.module.css'
import AdminFilter from '../adminFilter/AdminFilter'
import Modal from '../../modal/Modal'


const MyProducts = ({products, authLocalId, authUid, match, product}) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProducts())
        if(match.params.id){
            dispatch(fetchProduct(match.params.id))
        }
      }, []);
      console.log(products)
    const [modalOpen, setModalOpen] = useState(false)
      
      const renderDeleteAndEditBtn = (product) => {    
              return(
                  <div>
                      <Link 
                      to={`/myproducts/delete/${product.id}`} 
                      onClick={() => setModalOpen(true)} 
                      className={classes.Btn}
                      >Delete</Link>
                      <Link to={`/edit/product/${product.id}`} className={classes.Btn}>Edit</Link>
                  </div>
              )
      }

      const deleteHandler = () => {
        dispatch(deleteProduct(match.params.id))
      }

      const closeModal = () => {
        setModalOpen(false)
      }

      const renderActionModalBtn = () => {
          return(
              <React.Fragment>
                  <Link
                  to={'/myproducts'} 
                  onClick={() => {
                    deleteHandler()
                    closeModal()
                  }} 
                  className={classes.Danger} 
                  >
                      Delete
                  </Link>
                  <Link to={'/myproducts'} onClick={() => setModalOpen(false)} className={classes.Dark}>Cancel</Link>
              </React.Fragment> 
          )
      }

      const renderProductsCard = () => {
        return products.map(product => {
            if(product.localId === authLocalId) {
                if(product.uid === authUid) {
                    if(product.id) {
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
                                {renderDeleteAndEditBtn(product)}
                            </div>
                            </div>
                        </li>
                    
                        )
                    }
                }
            }
         })
      }
      
    console.log(match)
    return (
        <div className={classes.MyProducts}>
            <h2 className={classes.H}>My Created Products</h2>
            {modalOpen ? <Modal
                title="Delete Product"
                content={`Do you want to delete this product with title: ${product ? product.title : 'loading'}`}
                action={renderActionModalBtn()}
            />: null}
            <ul className={classes.Cards}>
                {renderProductsCard(authLocalId)}
            </ul>
            <AdminFilter />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: Object.values(state.products),
        authLocalId: state.auth.authData.localId,
        authUid: state.auth.authData.uid,
        product: state.products[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchProducts, fetchProduct, deleteProduct})(MyProducts)
