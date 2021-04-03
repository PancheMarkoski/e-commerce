import React, { useState, Fragment }  from 'react'
import {storage} from '../../firebase' 

import classes from './AdminPanel.module.css'
import AdminFilter from './adminFilter/AdminFilter'


const AdminPanel = ({onSubmitHandler, HeaderTitle, TitlePlaceholder="", DescPlaceholder="", PricePlaceholder=0}) => {
  const [title, setTitle] = useState(TitlePlaceholder)
  const [price, setPrice] = useState(PricePlaceholder)
  const [desc, setDesc] = useState(DescPlaceholder)
  const [selectedFile, setSelectedFile] = useState()
  const [imageUrl, setimageUrl] = useState()
  const [selecOptiontValue, setSelectOptionValue] = useState("cat1")
  
  // Error validation
  const [titleError, setTitleError] = useState({})
  const [descError, setDescError] = useState({})
  const [selectedFileError, setselectedFileError] = useState({})
  const [priceError, setPriceError] = useState({})


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
            price: price,
            category: selecOptiontValue,
          
          }
          console.log(createProductFormValues)
          //dispatch(createProduct(createProductFormValues))
          onSubmitHandler(createProductFormValues)
          
        })
      }
      )
       
      setTitle("")
      setDesc("")
      setSelectedFile(null)
      setPrice(0)
      setSelectOptionValue("cat1")
      
    }


  }

  const formValidation = () => {
    const titleError = {}
    const descError = {}
    const selectedFileError = {}
    const priceError = {}
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

    if(desc.trim().length > 1850) {
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
    
    // Validation for Price
    if(price === 0) {
      priceError.insertPrice = "Please insert the product price"
    }

    
    setTitleError(titleError)
    setDescError(descError)
    setselectedFileError(selectedFileError)
    setPriceError(priceError)
    return isValid;
    
  }



  return (
    <Fragment>
      <h2 className={classes.H}>{HeaderTitle}</h2>
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
        <textarea 
        className={classes.ProductInput} 
        placeholder="Description" 
        type="text" 
        autoComplete="off" 
        value={desc}
        onChange={(e) => {setDesc(e.target.value)}}
        style={{
          height: "8rem",
          padding: ".7rem 2rem",
          backgroundColor: "#eaeaea",
          border: "none"
        }}
        ></textarea>
        {Object.keys(descError).map((key) => {
          return <div key={key} style={{color: 'red'}}>{descError[key]}</div>
        } )}
        {/** Price */}
        <label>Product Price</label>
        <input 
        className={classes.ProductInput} 
        placeholder="Price" 
        type="number" 
        autoComplete="off"
        value={price}
        
        onChange={(e) => {setPrice(e.target.value)}}
        />
         {Object.keys(priceError).map((key) => {
          return <div key={key} style={{color: 'red'}}>{priceError[key]}</div>
        } )}
        {/** Price */}
        <label>Product Category</label>
        <select onChange={handleDropdownChange} className={classes.SelectField}>
              <option value="cat1">Category1</option>
              <option value="cat2">Category2</option>
        </select>
          <button className={classes.Btn}>Submit</button>
        {/* <img alt={title} src={imageUrl} width='300rem' height="300rem" style={{marginTop: "9px"}} /> */}
      </form>
          <AdminFilter />
      </Fragment>
  )
}



export default AdminPanel
