import React, { useEffect, useState } from 'react'
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
import { title } from 'process'
import axios from 'axios'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { message } from 'antd'

const EditProducts = () => {
  const [params, setParams] = useSearchParams()

  const id = params.get('id')
  console.log(id)

  const [data, setdata] = useState({
    // _id: '',
    title: '',
    description: '',
    price: '',
    rating: '',
    stock: '',
    brand: '',
    category: '',
    thumbnail: '',
  })
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .post('http://localhost:4000/getproduct', { id })
      .then((result) => {
        console.log(result.data)
        setdata(result.data.product)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  //   const handleFileChange = () => {}
  const Submit = (e) => {
    const form = new FormData()
    e.preventDefault()
    console.log('logger', data)

    form.append('_id', data._id)
    form.append('title', data.title)
    form.append('discription', data.description)
    form.append('price', data.price)
    form.append('rating', data.rating)
    form.append('stock', data.stock)
    form.append('brand', data.brand)
    form.append('catagories', data.category)
    form.append('productphotos', data.thumbnail)
    axios
      .post('http://localhost:4000/editproduct', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async (response) => {
        console.log(response.data)
        await message.success(response.data.message)
      })
      .catch((error) => {
        console.log(error)
      })
    navigate('/product/productlist')
  }

  return (
    <div className="flex justify-center items-center">
      <div>
        <CRow>
          <CCol xs={6} sm={6} md={6}>
            <CCard className="mt-6 ">
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
                      value={data.description}
                      onChange={(e) => {
                        setdata({ ...data, description: e.target.value })
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
                      value={data.category}
                      onChange={(e) => {
                        setdata({ ...data, category: e.target.value })
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
                      id="thumbnail"
                      multiple={true}
                      accept={'images/*'}
                      onChange={(e) => {
                        setdata({ ...data, thumbnail: e.target.files[0] })
                      }}
                    />
                    {/* <span className="text-danger">{error && error.image}</span> */}
                  </div>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton className="submit-btn" onClick={Submit}>
                  Submit
                </CButton>
              </CCardFooter>{' '}
            </CCard>
          </CCol>
        </CRow>
      </div>
    </div>
  )
}

export default EditProducts
