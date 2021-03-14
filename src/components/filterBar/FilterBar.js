import React from 'react'

import classes from './FilterBar.module.css'

const FilterBar = ({getSerachTerm, getCategory}) => {
   
    
    const onChangeHandler = (e) => {
        setTimeout(() => {
            e.preventDefault()
            getSerachTerm(e.target.value)
        }, 1000)
    }

 

    
    return (
        <div className={classes.FilterBarWrap} >
            <div className={classes.FilterBar}>
                <div>
                    <button onClick={() => getCategory(true)} className={classes.Link}> all</button>
                </div>
                <div>
                    <button onClick={() => getCategory('cat1')} className={classes.Link}>Cat 1</button>
                </div>
                <div>
                    <button onClick={() =>getCategory('cat2')} className={classes.Link}> Cat 2</button>
                </div>
                     <input className={classes.Search} type="search" placeholder="Search..." autoFocus required 
                     onChange={(e) => onChangeHandler(e)} 
                     />    
                </div>
        </div>
    )
}

export default FilterBar
