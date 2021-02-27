import React, {useState} from 'react'

import ProductsList from '../../components/productsList/productsList'
import FilterBar from '../../components/filterBar/FilterBar'

const Homepage = () => {
    const [category, setCategory] = useState(true)
    const [term, setTerm] = useState("")


    const getSerachTerm = (term) => {
        setTerm(term)
    }

    const getCategory = (cat) => {
        setCategory(cat)
    }
    
    console.log(category)

    return (
        <div>
            HomePage
            <FilterBar 
            getSerachTerm={getSerachTerm} 
            getCategory={getCategory}/>
            <ProductsList term={term} category={category} />
        </div>
    )
}

export default Homepage
