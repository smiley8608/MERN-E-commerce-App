import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button } from "antd";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const Orders = () => {
  const [rows, setRows] = useState<any>([]);
  useEffect(() => {
    axios
      .get("/getalltransaction")
      .then((responce) => {
        console.log(responce.data);
        if (responce.data.message === undefined) {
          setRows(responce.data.result);
        } else {
          alert(responce.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setRows]);
  console.log(rows);

  const SlicedAddress = (id: [any]) => {
    return `${id.slice(0, 5)}....${id.slice(id.length - 4)}`;
  };
  const ClickHandler = (id: any) => {
    console.log(id);

    axios
      .post("http://localhost:4000/cancelorder", { id: id })
      .then((result) => {
        console.log(result.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="tw-text-center">
        <h1>Transaction Details</h1>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ProductName</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Total Price</StyledTableCell>
              <StyledTableCell align="center">Hash</StyledTableCell>
              <StyledTableCell align="center">OrderID</StyledTableCell>
              <StyledTableCell align="right">Delivary IN</StyledTableCell>
              <StyledTableCell align="right">Delivary STATUS</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row: any) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.product.map((items: any) => {
                      return <p key={Math.random()}>{items.product.title}</p>;
                    })}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                    {row.product.map((items: any) => {
                      return <p key={Math.random()}>{items.quantity}</p>;
                    })}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.amount}</StyledTableCell>
                  <StyledTableCell align="right">
                    <a
                      href={`https://goerli.etherscan.io/tx/${row.paymentDetails.hash}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {SlicedAddress(row.paymentDetails.hash)}
                    </a>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {SlicedAddress(row._id)}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.deliverIn}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.deliverStatus}
                  </StyledTableCell>
                  {
                    row.deliverStatus==='order-cancelled'||row.deliverStatus==='order-delivared'||row.deliverStatus==='refunded'? "":<StyledTableCell align="center">
                    <Button onClick={() => ClickHandler(row._id)}>
                      Cancel-Order
                    </Button>
                  </StyledTableCell>
                  }
                  
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
