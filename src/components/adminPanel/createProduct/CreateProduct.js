import React from 'react'
import {connect, useDispatch} from 'react-redux'

import {createProduct} from '../../../actions/index'
import AdminPanel from '../AdminPanel'

const CreateProduct = () => {
    const dispatch = useDispatch()
    const onSubmitHandler = (formValues) => {
        dispatch(createProduct(formValues))
    }
    return (
        <AdminPanel HeaderTitle="Create Product" onSubmitHandler={onSubmitHandler}/>
    )
}

export default connect(null, {createProduct})(CreateProduct)
