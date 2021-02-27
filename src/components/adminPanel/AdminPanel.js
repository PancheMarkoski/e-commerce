import React, { useState, Fragment }  from 'react'
import {storage} from '../../firebase' 
import {connect, useDispatch} from 'react-redux'

import {createProduct} from '../../actions'
import classes from './AdminPanel.module.css'



const AdminPanel = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [selectedFile, setSelectedFile] = useState()
  const [imageUrl, setimageUrl] = useState()
  const [selecOptiontValue, setSelectOptionValue] = useState("cat1")
  
  // Error validation
  const [titleError, setTitleError] = useState({})
  const [descError, setDescError] = useState({})
  const [selectedFileError, setselectedFileError] = useState({})

  // dispatch
  const dispatch = useDispatch();


  const handleDropdownChange = (e) => {
    setSelectOptionValue(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if(isValid) {
      // console.log(title)
      // console.log(desc)
      // console.log(selectedFile)
      // console.log(selecOptiontValue)
      const uploadTask = storage.ref(`images/${selectedFile.name}`).put(selectedFile);
      uploadTask.on('state_change', 
      (snapshot) => {
        console.log(snapshot)
        
      }, 
      (error) => {
        //Error function...
        console.log(error)
      },
      () => {
        //Complite function...
        storage.ref('images').child(selectedFile.name).getDownloadURL().then(url => {
          console.log(url)
          setimageUrl(url)
          const createProductFormValues = {
            title: title,
            desc: desc,
            img: selectedFile,
            imgUrl: url,
            category: selecOptiontValue,
          
          }
          console.log(createProductFormValues)
          dispatch(createProduct(createProductFormValues))
          
          
        })
      }
      )
       
      setTitle("")
      setDesc("")
      setSelectedFile(null)
      setSelectOptionValue("cat1")
      
    }


  }

  const formValidation = () => {
    const titleError = {}
    const descError = {}
    const selectedFileError = {}
    let isValid = true;
    

    // Validation for Title
    if(title.trim().length < 3 && title.trim().length > 1) {
      titleError.TitleIsTooShort = "Title is too short."
      isValid = false
    }

    if(title.trim().length > 12) {
      titleError.TitleIsTooLong = "Title is too long."
      isValid = false
    }

    if(!title.trim().length) {
      titleError.TitleIsTooLong = "Please write title of the product"
      isValid = false
    }
    
    // Validation for Desc
    if(desc.trim().length < 3 && desc.trim().length > 1) {
      descError.DescIsTooShort = "Description is too short"
      isValid = false
    }

    if(desc.trim().length > 85) {
      descError.TitleIsTooLong = "Description is too long."
      isValid = false
    }

    if(!desc.trim().length) {
      descError.TitleIsTooLong = "Please insert the Description"
      isValid = false
    }
    
    // Validation for Image
    if(!selectedFile) {
      selectedFileError.insertImg = "Insert Image"
      isValid = false
    }

    
    setTitleError(titleError)
    setDescError(descError)
    setselectedFileError(selectedFileError)
    return isValid;
    
  }



  return (
    <Fragment>
      <h2 className={classes.H}>Create Product</h2>
      <form onSubmit={onSubmit} className={classes.Wrapper}>
        <label>Product Image</label>
        <input 
        className={classes.ProductInput} 
        name="productImg" 
        type="file"
        onChange={(e) => e.target.files[0] ? setSelectedFile(e.target.files[0]) : null}
        />
         {Object.keys(selectedFileError).map((key) => {
          return <div  key={key} style={{color: 'red'}}>{selectedFileError[key]}</div>
        } )}
        <label>Product Title</label>
        <input 
        className={classes.ProductInput} 
        placeholder="Title" 
        type="text" 
        autoComplete="off"
        value={title}
        
        onChange={(e) => {setTitle(e.target.value)}}
        />
          {Object.keys(titleError).map((key) => {
          return <div  key={key} style={{color: 'red'}}>{titleError[key]}</div>
        } )}
        <label>Product Description</label>
        <input 
        className={classes.ProductInput} 
        placeholder="Description" 
        type="text" 
        autoComplete="off" 
        value={desc}
        onChange={(e) => {setDesc(e.target.value)}}
        />
        {Object.keys(descError).map((key) => {
          return <div key={key} style={{color: 'red'}}>{descError[key]}</div>
        } )}
        <label>Product Category</label>
        <select onChange={handleDropdownChange} className={classes.SelectField}>
              <option value="cat1">Category1</option>
              <option value="cat2">Category2</option>
        </select>
          <button className={classes.Btn}>Submit</button>
        <img src={imageUrl} width='300rem' height="300rem" style={{marginTop: "9px"}} />
      </form>
      </Fragment>
  )
}



export default connect(null, {createProduct})(AdminPanel)
