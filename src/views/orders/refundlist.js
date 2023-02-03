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
import { MenuItem, TextField } from '@mui/material'
import { Button } from 'antd'
import Web3 from 'web3'
import ContractABI from '../contract/contractABI.json'
import { ContractAddress } from '../contract/contractAddress'

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
  const [refundlist, setRefundList] = useState([])
  const [data, setData] = useState([])
  const [currentAddress, setCurrentAddress] = useState()

  const { ethereum } = window
  const GoerliTestnet = 5
  const web3 = new Web3(ethereum)
  useEffect(() => {
    axios
      .get('http://localhost:4000/admin/orderrefund')
      .then((respose) => {
        console.log(respose.data.Order)
        setRefundList(respose.data.Order)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  // const rows = [...orderList]
  console.log(refundlist)
  const ClickHandler = async (to, amount, id) => {
    if (amount >= 1) {
      await sendTokenTransaction(to, amount, id)
    } else {
      await sendCoinTransaction(to, amount, id)
    }
  }

  const connectWallet = async () => {
    if (!ethereum) {
      return alert('please connect to the wallet')
    } else {
      const account = await ethereum.request({
        method: 'eth_requestAccounts',
      })
      setCurrentAddress(account[0])
      console.log(currentAddress)
      const chainId = await web3.eth.getChainId()
      switchWallet(chainId)
    }
  }
  const switchWallet = async (chainid) => {
    if (!ethereum) {
      return alert('please connect to the wallet')
    } else {
      console.log(chainid)
      if (GoerliTestnet !== chainid) {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: web3.utils.toHex(GoerliTestnet),
            },
          ],
        })
      }
    }
  }
  const sendCoinTransaction = async (to, amount, id) => {
    if (!ethereum) {
      return alert('please connect to the metamask!')
    } else {
      const Sender = await web3.eth.getAccounts()
      setCurrentAddress(Sender[0])
      console.log('sender', currentAddress, 'to', to, 'amount', amount, 'id', id)
      const transaction = await web3.eth.sendTransaction({
        from: currentAddress,
        to: to,
        value: web3.utils.toHex(web3.utils.toWei(String(amount), 'ether')),
      })
      console.log(transaction)
      axios
        .post('http://localhost:4000/admin/refundstatus', {
          id: id,
          amount: amount,
          hash: { to: transaction.to, from: transaction.from, hash: transaction.transactionHash },
        })
        .then((result) => {
          console.log(result.data.message)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const sendTokenTransaction = async (to, amount, id) => {
    if (!ethereum) {
      return alert('please the connect to the metamask')
    } else {
      const Sender = await web3.eth.getAccounts()
      if (currentAddress === undefined) {
        await setCurrentAddress(Sender[0])
      }
      console.log('sender', currentAddress, 'to', to, 'amount', amount, 'id', id)
      const Contract = new web3.eth.Contract(ContractABI, ContractAddress)
      console.log('contract', Contract)
      const value = web3.utils.toHex(web3.utils.toWei(String(amount), 'ether'))

      await Contract.methods
        .transfer(to, value)
        .send({ from: currentAddress })
        .then((responce) => {
          console.log(responce)
          axios
            .post('http://localhost:4000/admin/refundstatus', {
              id: id,
              amount: amount,
              hash: {
                to: responce.events.Transfer.returnValues.to,
                from: responce.events.Transfer.returnValues.from,
                hash: responce.transactionHash,
              },
            })
            .then((result) => {
              console.log(result.data.message)
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const silcedAddress = (id) => {
    return `${id.slice(0, 4)}......${id.slice(id.length - 4)}`
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell>OrderId</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Products</TableCell>

            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Hash</TableCell>
            <TableCell align="right">DeliverIn</TableCell>
            <TableCell align="right">DeliverStatus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {refundlist.map((row) => (
            <StyledTableRow key={row._id}>
              <StyledTableCell component="th" scope="row">
                {silcedAddress(row._id)}
              </StyledTableCell>
              <StyledTableCell align="right">{row.user_id.email}</StyledTableCell>
              <StyledTableCell align="right">
                {row.address.buildingNo},{row.address.street},{row.address.city},
                {row.address.pincode}
              </StyledTableCell>
              {row.product.map((items) => {
                return (
                  <StyledTableRow key={items.product._id}>
                    <StyledTableCell align="right">{items.product.title}</StyledTableCell>
                    <StyledTableCell align="right">{items.quantity}</StyledTableCell>
                  </StyledTableRow>
                )
              })}
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">
                <a
                  href={`https://goerli.etherscan.io/tx/${row.paymentDetails.hash}`}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  {silcedAddress(row.paymentDetails.hash)}
                </a>
              </StyledTableCell>
              <StyledTableCell align="right">{row.deliverStatus}</StyledTableCell>
              <StyledTableCell>
                <Button onClick={() => ClickHandler(row.paymentDetails.from, row.amount, row._id)}>
                  Refund
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default OrderList
