import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import { RoomRounded } from '@mui/icons-material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const OrderList = () => {
  const [orderList, setOrderList] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/getallorder')
      .then((result) => {
        console.log(result.data.order)
        setOrderList(result.data.order)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  // const rows = [...orderList]
  console.log(orderList)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>OrderId</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">PinCode</TableCell>
            <TableCell align="right">Products</TableCell>

            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Hash</TableCell>
            <TableCell align="right">DeliverIn</TableCell>
            <TableCell align="right">DeliverStatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {row._id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.user_id.email}</StyledTableCell>
              <StyledTableCell align="right">
                {row.address.buildingNo},{row.address.street},{row.address.city},
                {row.address.pincode}
              </StyledTableCell>
              {row.product.map((items) => {
                return (
                  <div key={items._id}>
                    <StyledTableCell align="right">{items.product.title}</StyledTableCell>
                    <StyledTableCell align="right">{items.quantity}</StyledTableCell>
                  </div>
                )
              })}
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">
                <a
                  href={`https://etherscan.io/token/${row.paymentDetails.hash}`}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  {row.paymentDetails.hash}
                </a>
              </StyledTableCell>
              <StyledTableCell align="right">{row.deliverIn}</StyledTableCell>
              <StyledTableCell align="right">{row.deliverIn}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default OrderList
