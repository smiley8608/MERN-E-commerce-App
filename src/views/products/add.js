import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardImage,
  CCardText,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react'
// import { title } from 'process'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

const AddProducts = () => {
  const navigate = useNavigate()
  const [data, setdata] = useState({
    title: '',
    discription: '',
    price: '',
    rating: '',
    stock: '',
    brand: '',
    catagories: '',
    images: '',
  })

  //   const handleFileChange = () => {}
  const SubmitHandler = (e) => {
    const form = new FormData()

    e.preventDefault()
    if (
      data.title === '' ||
      data.discription === '' ||
      data.price === '' ||
      data.rating === '' ||
      data.stock === '' ||
      data.brand === '' ||
      data.catagories === '' ||
      data.images === ''
    ) {
      return message.success('please fill the input fields')
    }
    console.log(data)

    form.append('title', data.title)
    form.append('discription', data.discription)
    form.append('price', data.price)
    form.append('rating', data.rating)
    form.append('stock', data.stock)
    form.append('brand', data.brand)
    form.append('catagories', data.catagories)
    form.append('productphotos', data.images)
    axios
      .post('http://localhost:4000/addproducts', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async (response) => {
        await message.success(response.data.message)
      })
      .catch((error) => {
        console.log(error)
      })
    navigate('/product/productlist')
  }

  return (
    <CRow>
      <CCol xs={6} sm={6} md={6}>
        <CCard className="flex items-center">
          <CCardBody>
            <CForm>
              <div className="mb-3 ">
                <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="title"
                  value={data.title}
                  onChange={(e) => {
                    setdata({ ...data, title: e.target.value })
                  }}
                />
                {/* <span className="text-danger">{error && error.identifier}</span> */}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Discription</CFormLabel>
                <CFormInput
                  type="text"
                  id="discription"
                  value={data.discription}
                  onChange={(e) => {
                    setdata({ ...data, discription: e.target.value })
                  }}
                />

                {/* <span className="text-danger">{error && error.status}</span> */}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Price</CFormLabel>
                <CFormInput
                  type="number"
                  id="price"
                  value={data.price}
                  onChange={(e) => {
                    setdata({ ...data, price: e.target.value })
                  }}
                />
                {/* <span className="text-danger">{error && error.content}</span> */}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Stock</CFormLabel>
                <CFormInput
                  type="number"
                  id="stock"
                  value={data.stock}
                  onChange={(e) => {
                    setdata({ ...data, stock: e.target.value })
                  }}
                />
                {/* <span className="text-danger">{error && error.content}</span> */}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Brand</CFormLabel>
                <CFormInput
                  type="text"
                  id="brand"
                  value={data.brand}
                  onChange={(e) => {
                    setdata({ ...data, brand: e.target.value })
                  }}
                />
                {/* <span className="text-danger">{error && error.content}</span> */}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Catagories</CFormLabel>
                <CFormInput
                  type="text"
                  id="catagories"
                  value={data.catagories}
                  onChange={(e) => {
                    setdata({ ...data, catagories: e.target.value })
                  }}
                />
                {/* <span className="text-danger">{error && error.content}</span> */}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Ratings</CFormLabel>
                <CFormInput
                  type="number"
                  id="rating"
                  value={data.rating}
                  onChange={(e) => {
                    setdata({ ...data, rating: e.target.value })
                  }}
                />
                {/* <span className="text-danger">{error && error.content}</span> */}
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Image</CFormLabel>

                {/* <CCardText>Banner Preview</CCardText> */}
                {/* <CCardImage
                  src={URL.createObjectURL(data.image[0])}
                  alt={data.image[0].originaName}
                /> */}

                <CFormInput
                  type="file"
                  id="images"
                  multiple={true}
                  accept={'images/*'}
                  onChange={(e) => {
                    setdata({ ...data, images: e.target.files[0] })
                  }}
                />
                {/* <span className="text-danger">{error && error.image}</span> */}
              </div>
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton className="submit-btn" onClick={SubmitHandler}>
              Submit
            </CButton>
          </CCardFooter>{' '}
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddProducts
