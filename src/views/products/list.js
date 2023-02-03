// import { Button } from '@coreui/coreui'
// import { LoadingOutlined } from '@ant-design/icons'
// import { Star } from '@mui/icons-material'
// import { Rating } from '@mui/material'
// import { Button, Statistic } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import react from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Button, message, Space } from 'antd'
import { Link, redirect } from 'react-router-dom'
import EditProducts from './edit'

const columns = [
  {
    id: 'thumbnail',
    label: 'Thumbnail',
    maxWidth: 170,
    align: 'right',
  },
  { id: 'title', label: 'Title', type: 'text', minWidth: 170 },
  { id: 'description', label: 'Description', type: 'text', minWidth: 100 },
  { id: 'price', label: 'Price', type: 'number', minWidth: 100 },
  { id: 'rating', label: 'Rating', type: 'number', minWidth: 100 },
  { id: 'stock', label: 'Stock', type: 'number', minWidth: 100 },
  {
    id: 'brand',
    label: 'Brand',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 170,
    align: 'right',
  },
]

// function createData(
//   name,
//   code,
//   population,
//   size,
// )

const ListProduct = () => {
  const [product, setProduct] = useState([])
  // const [disabler, setDisabler] = useState(false)
  // const [Modifier, setModifier] = useState({})
  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/allproducts')
      .then((result) => {
        console.log(result.data)
        setProduct(result.data.products)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const rows = [...product]
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value)
    setPage(0)
  }
  const deleteHandler = async (id) => {
    console.log('id', id)
    axios
      .post('http://localhost:4000/deleteProduct', { id })
      .then(async (result) => {
        if (result.data.message) {
          await alert(result.data.message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
    window.location.reload()
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 1000 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    // console.log(row)
                    // console.log(column)
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'thumbnail' ? (
                          <img
                            src={`${row.thumbnail}`}
                            alt={'product'}
                            style={{ width: '150px', maxHeight: '300px' }}
                          ></img>
                        ) : column.id && typeof value === 'number' ? (
                          value
                        ) : (
                          value
                        )}
                      </TableCell>
                    )
                  })}
                  <TableCell>
                    <Space wrap>
                      <Button type="primary" danger onClick={() => deleteHandler(row._id)}>
                        Delete
                      </Button>
                      <Link to={`/product/edit?id=${row._id}`}>
                        <Button type="primary">Edit</Button>
                      </Link>
                    </Space>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default ListProduct
