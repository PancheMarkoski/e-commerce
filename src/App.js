import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'

const pageOne = () => {
  return(
    <div>
      pageOne
      <Link to="/pagetwo">Forward</Link>
    </div>
  )
}

const pageTwo = () => {
  return(
    <div>
      pageTwo
      <Link to="/">back</Link>
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route path="/" exact component={pageOne}/>
        <Route path="/pagetwo" component={pageTwo}/>
      </div>
    </BrowserRouter>
  )
}

export default App
