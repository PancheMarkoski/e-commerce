import React, {useState} from 'react'
import {ImBin2} from 'react-icons/im'
import {connect, useDispatch} from "react-redux"

import { removeFromCart, adjustQty } from '../../actions'
import classes from './CartItem.module.css'

const CartItem = ({itemData}) => {
    const dispatch = useDispatch()
    const [input, setInput] = useState(itemData.qty)

    const onChangeHandler = (e) => {
        setInput(e.target.value)
        dispatch(adjustQty(itemData.id, e.target.value))
    }

    return (       
            <li  className={classes.CardsItem}>
                            <div className={classes.Card}>
                            <div 
                            className={`${classes.CardImage} 
                            ${classes.CardImageFlowers} 
                            ${classes.Img}
                            `} style={{backgroundImage: "url(" + `"${itemData.imgUrl}"` + ")"}}></div>
                            <div className={classes.CardContent}>
                                <div className={classes.CardTitle}>{itemData.title}</div>
                                <p className={classes.CardText}>{itemData.desc.slice(0, 100)}</p>
                                <div className={classes.cartCtrl}>
                                    <p className={classes.Price}>$ {itemData.price}</p>
                                    <div className={classes.Qty}>
                                        <label htmlFor="qty">Qty</label>
                                        <input onChange={onChangeHandler} min='1' type="number" id="qty" name="qty" value={input} />
                                    </div>
                                    <button onClick={()=> dispatch(removeFromCart(itemData.id))} className={classes.DeleteItemBtn}><ImBin2 /></button>
                                </div>
                            </div>
                            </div>
                        </li>
       
    )
}

export default connect(null, {removeFromCart, adjustQty})(CartItem)
