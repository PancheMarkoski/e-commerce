import React from 'react'
import ReactDOM from 'react-dom'

import classes from './Modal.module.css'

const Modal = ({title, content, action}) => {
    return ReactDOM.createPortal(
        <div className={classes.Modal}>
            <div className={classes.ModalContent}>
                <div className={classes.ModalHeader}>
                <h2>{title}</h2>
                </div>
                <div className={classes.ModalBody}>
                <p>{content}</p>
                </div>
                <div className={classes.ModalFooter}>
                {action}
                </div>
            </div>
      </div>,
      document.querySelector('#modal')
    )
}

export default Modal
