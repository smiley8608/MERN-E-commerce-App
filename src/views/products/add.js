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
// import { title } from 'process'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { message, Skeleton } from 'antd'
import { height, margin } from '@mui/system'

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
  const [selectedFiles, setSelectedFiles] = useState()
  const [preview, setPreview] = useState()
  //   const handleFileChange = () => {}

  useEffect(() => {
    if (!selectedFiles) {
      setPreview(undefined)
      return
    }
    const objectUrl = URL.createObjectURL(selectedFiles)
    setPreview(objectUrl)
    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFiles])
  const onSelectFileChange = (e) => {
    if (!e.target.files || e.target.files[0] === '') {
      setSelectedFiles(undefined)
      return
    } else {
      setSelectedFiles(e.target.files[0])
    }
  }
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
      selectedFiles === ''
    ) {
      return alert('please fill the input fields')
    }
    console.log(data)

    form.append('title', data.title)
    form.append('discription', data.discription)
    form.append('price', data.price)
    form.append('rating', data.rating)
    form.append('stock', data.stock)
    form.append('brand', data.brand)
    form.append('catagories', data.catagories)
    form.append('productphotos', selectedFiles)
    axios
      .post('http://localhost:4000/addproducts', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async (response) => {
        await alert(response.data.message)
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
                  onChange={onSelectFileChange}
                />
                {/* <span className="text-danger">{error && error.image}</span> */}

                {selectedFiles && (
                  <img
                    src={preview}
                    alt={'Imagepreview'}
                    style={{ width: '500px', height: '200px', marginTop: '15px' }}
                  />
                )}
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