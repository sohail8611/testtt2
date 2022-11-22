import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "../App.css";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 17,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData( product, active, mcc, merchantid, postype, terminalid, action) {
    return {  product, active, mcc, merchantid, postype, terminalid, action };
}

const rows = [
    createData(' PAX A920', 'Active', 5331, 145287591, 'Terminal', 5674903291, 'View Details'),
    /*createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),*/
];





export default function CustomizedTables() {
    return (


        <TableContainer component={Paper} style={{ marginBottom: "80px" }} >
            <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead className='table-row' >
                    <TableRow >
                        <StyledTableCell align="center" style={{ fontSize: 17 }}>Product</StyledTableCell>
                        <StyledTableCell align="center" style={{ fontSize: 17 }}>Active</StyledTableCell>
                        <StyledTableCell align="center" style={{ fontSize: 17 }}>MCC</StyledTableCell>
                        <StyledTableCell align="center" style={{ fontSize: 17 }}>MerchantID(MID)</StyledTableCell>
                        <StyledTableCell align="center" style={{ fontSize: 17 }}>POS Type</StyledTableCell>
                        <StyledTableCell align="center" style={{ fontSize: 17 }}>TerminalID (TID)</StyledTableCell>
                        
                         {/* <StyledTableCell align="center" style={{ fontSize: 17 }}>Action</StyledTableCell> */}
                    

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.merchantname}>
                            {/* <StyledTableCell align="center" component="th" scope="row">
                                {row.merchantname}
                            </StyledTableCell> */}
                            <StyledTableCell align="center">{row.product}</StyledTableCell>
                            <StyledTableCell align="center">{row.active}</StyledTableCell>
                            <StyledTableCell align="center">{row.mcc}</StyledTableCell>
                            <StyledTableCell align="center">{row.merchantid}</StyledTableCell>
                            <StyledTableCell align="center">{row.postype}</StyledTableCell>
                            <StyledTableCell align="center">{row.terminalid}</StyledTableCell>
                            {/* <StyledTableCell align="center">
                                <div class="form-outline mb-4 col-lg-4" align="center">
                                    <Button type="button" class="btn btn-outline-warning" style={{marginLeft:"30px",}} >
                                    <Link to='/createsale' className='page-scroll' style={{ color: "white"}}>
                  View Details
                </Link>
                                        
                                       </Button>

                                </div>

                            </StyledTableCell> */}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
