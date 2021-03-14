import React, {useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'

import {fetchProduct, editProduct} from '../../../actions'
import AdminPanel from '../AdminPanel'

const EditProduct = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProduct(props.match.params.id))
      }, []);

    const onSubmitHandler = (formValues) => {
        dispatch(editProduct(props.match.params.id, formValues))
    } 

    console.log(props)
    if(!props.product) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <AdminPanel onSubmitHandler={onSubmitHandler} HeaderTitle="Edit Product" TitlePlaceholder={props.product.title} DescPlaceholder={props.product.desc} />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return{product: state.products[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchProduct, editProduct})(EditProduct)
