import React from 'react'
import { Link } from 'react-router-dom'

import classes from './AdminFilter.module.css'

const AdminFilter = () => {
    return (
        <div className={classes.AdminFilter}>
            <Link to="/create/product" className={classes.AdminFilterBtn}>Create Product</Link>
            <Link to="/myproducts" className={classes.AdminFilterBtn}>My Created Products</Link>
        </div>
    )
}

export default AdminFilter
