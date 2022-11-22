import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "../App.css";
const myComponent = {
  width: "auto",
  height: "auto",
  overflowX: "scroll",
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
    padding: 5,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    height: 10,
  },
}));

function createData(
  merchantname,
  product,
  active,
  mcc,
  merchantid,
  postype,
  terminalid,
  action
) {
  return {
    merchantname,
    product,
    active,
    mcc,
    merchantid,
    postype,
    terminalid,
    action,
  };
}

const rows = [
  createData(
    "KHALIQ ALMUBAYRIK",
    " PAX A920",
    "Active",
    5331,
    145287591,
    "Terminal",
    5674903291,
    "View Details"
  ),
];

export default function CustomizedTables(props) {
  const [apiData, setapiData] = useState([]);
  const [response, setResponse] = useState("false");

  let nodejsip = "http://67.205.163.34:8000";
  let theurl = nodejsip + "/terminals/get_terminals_table";

  async function fetchData() {
    var data = [""];
    var response = [""];
    setResponse(false);
    await axios

      .get(theurl)
      .then((res) => {
        // console.log(res.data.myData);
        data = res.data.myData;
        response = res.data.success;
      })
      .catch((err) => console.log("therr", err));

    return { data, response };
  }

  async function callApi() {
    let values = await fetchData();
    setapiData(values.data);
    setResponse(values.response);
  }

  useEffect(() => {
    setapiData([]);
    callApi();
  }, []);

  // ///////////////////////////// //////////////   SEARCHING FUNCTIONS
  const [searchedValue, setSearchedValue] = useState([]);
  const [myFlag, setMyFlag] = useState(false);

  // const [searchArray, setSearchArray] = useState({
  //   'POSType': "fgfgfsgf",
  //   'AccountNo': "gsfsfdfdf",
  //   'IBAN': "fgfgfsgf",
  //   'TerminalID': "gsfsfdfdf",
  //   'MerchantID': "fgfgfsgf",
  //   'MerchantListName': "gsfsfdfdf",
  //   'Location': "gsfsfdfdf"

  // });

  const search = () => {
    var myarray2 = [];

    if (
      (props.searchArray.POSType == "") && (props.searchArray.Prod == "" )&& (props.searchArray.TerminalID == "") && (props.searchArray.MerchantID == "") && (props.searchArray.MerchantListName == "") 
      
    ) {
      setMyFlag(false);
    } else {
      apiData.filter((e) => {
        let POSTypefilterValue = props.searchArray.POSType.toString().toUpperCase();
        let ProductfilterValue = props.searchArray.Prod.toString().toUpperCase();
        //let IBANfilterValue = props.searchArray.Mcc;
        let TerminalIDfilterValue = props.searchArray.TerminalID.toString().toUpperCase();
        let MerchantIDfilterValue = props.searchArray.MerchantID.toString().toUpperCase();
        let MerchantListNamefilterValue = props.searchArray.MerchantListName.toString().toUpperCase();
       // let LocationfilterValue = props.searchArray.Location.toString().toUpperCase();
        let postabletext = e.posType.toString().toUpperCase();
        let productabletext = e.product.toString().toUpperCase();
        //let ibantabletext = e.mcc.toString().toUpperCase();
        let tidtabletext = e.terminalID.toString().toUpperCase();
        let midtabletext = e.merchantID.toString().toUpperCase();
        let nametabletext = e.merchantName.toString().toUpperCase();
        //  let locationtabletext = "";        


        if (POSTypefilterValue != "") {
          if (postabletext.indexOf(POSTypefilterValue) > -1) {
            myarray2.push(e);
            setMyFlag(true);
            setSearchedValue(myarray2);
          }
        }
        else if (ProductfilterValue != "") {
          if (productabletext.indexOf(ProductfilterValue) > -1) {
            myarray2.push(e);
            setMyFlag(true);
            setSearchedValue(myarray2);
          }
        }
        
        else if (MerchantListNamefilterValue != "") {
          if (nametabletext.indexOf(MerchantListNamefilterValue) > -1) {
            myarray2.push(e);
            setMyFlag(true);
            setSearchedValue(myarray2);
          }
        }
        else if (TerminalIDfilterValue != "") {
          if (tidtabletext.indexOf(TerminalIDfilterValue) > -1) {
            myarray2.push(e);
            setMyFlag(true);
            setSearchedValue(myarray2);
          }
        } 
        else if (MerchantIDfilterValue != "") {
          if (midtabletext.indexOf(MerchantIDfilterValue) > -1) {
            myarray2.push(e);
            setMyFlag(true);
            setSearchedValue(myarray2);
          }
        } 
      });
    }
  };

  // // CAlling search function on every change of input value
  useEffect(() => {
    search();
  }, [props]);

  // //////////////////////////////////////////////////

  return (
    <TableContainer component={Paper} style={{ marginBottom: "80px" }}>
      <div style={{ height: "300px" }}>
        {!myFlag ? (
          // For all values
          <div style={myComponent}>
            {response === true ? (
              <>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead className="table-row">
                    <TableRow>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Merchant Name
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Product
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Active
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        MCC
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        MerchantID (MID)
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        POS Type
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        TerminalID (TID)
                      </StyledTableCell>

                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {apiData.map((info) => (
                      <StyledTableRow key={info.merchantName}>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {info.merchantName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.product}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.active}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.mcc}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.merchantID}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.posType}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.terminalID}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <div
                            class="form-outline mb-4 col-lg-4"
                            align="center"
                          >
                            <Button
                              type="button"
                              class="btn btn-outline-warning"
                              style={{ marginLeft: "30px" }}
                            >
                              <Link
                                to="/createsale"
                                className="page-scroll"
                                style={{ color: "white" }}
                              >
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead className="table-row">
                    <TableRow>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Merchant Name
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Product
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Active
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        MCC
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        MerchantID (MID)
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        POS Type
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        TerminalID (TID)
                      </StyledTableCell>

                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                </Table>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "10em",
                  }}
                >
                  <h3>Loading...</h3>
                  <CircularProgress disabled={true} color="warning" size={40} />
                </Box>
              </>
            )}
          </div>
        ) : (
          <div style={myComponent}>
            {response === true ? (
              <>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead className="table-row">
                    <TableRow>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Merchant Name
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Product
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Active
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        MCC
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        MerchantID (MID)
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        POS Type
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        TerminalID (TID)
                      </StyledTableCell>

                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {searchedValue.map((info) => (
                      <StyledTableRow key={info.merchantName}>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {info.merchantName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.product}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.active}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.mcc}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.merchantID}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.posType}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {info.terminalID}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <div
                            class="form-outline mb-4 col-lg-4"
                            align="center"
                          >
                            <Button
                              type="button"
                              class="btn btn-outline-warning"
                              style={{ marginLeft: "30px" }}
                            >
                              <Link
                                to="/createsale"
                                className="page-scroll"
                                style={{ color: "white" }}
                              >
                                View Details
                              </Link>
                            </Button>
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            ) : (
              <>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead className="table-row">
                    <TableRow>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Merchant Name
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Product
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Active
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        MCC
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        MerchantID (MID)
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        POS Type
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        TerminalID (TID)
                      </StyledTableCell>

                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                </Table>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "10em",
                  }}
                >
                  <h3>Loading...</h3>
                  <CircularProgress disabled={true} color="warning" size={40} />
                </Box>
              </>
            )}
          </div>
        )}
      </div>
    </TableContainer>
  );
}
