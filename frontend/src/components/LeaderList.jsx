import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import reducer from "../config/redux/reducer";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const myComponent = {
  width: 'auto',
  height: 'auto',
  overflowX: 'scroll'
};






const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,

  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
    padding: 5

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,

  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    height: 10
  },
}));

<>
  {" "}
  <Button variant="warning">Warning</Button>{" "}
</>;





export default function LeaderList({ data, set, zoneText, teamLeaderText }) {
  // Getting data from API

  let nodejsip = "http://67.205.163.34:8000"


  // console.log("reducerdata:",reducerData)

  const [apiData, setapiData] = useState([]);
  const [searchLoader, setsearchLoader] = useState('false');
  const [tempData, setTempData] = useState('');
  const [response, setResponse] = useState('false')



  const navigate = useNavigate();

  const gotoAddTeamLeader = (teamLeaderID) => {
    navigate('/addteamleader', { state: { teamLeaderID } })
  }




  const reducerData = useSelector(data => data);
  const [state, setState] = React.useState('');
  // setState(reducerData.leaderlist_search_zone)

  const [firstName, setFirstName] = useState(reducerData.leaderlist_search_zone || '');







  useEffect(() => {

    setapiData([])
    callApi();
    console.log("thedatais:", data)

  }, [data]);

  console.log("boolis:", data.leaderlist_search_zone != '')
  console.log("boolval:", data.leaderlist_search_zone)


  // if (data.leaderlist_search_zone != '' && data.leaderlist_search_zone != undefined) {
  if (data && data.leaderlist_search_zone) {

    var theurl = nodejsip + "/zones/teamleaderlist_TabularData_API/where/zonename=/" + data.leaderlist_search_zone
    console.log("the condition inside diurl", theurl)
  }
  else if (data && data.leaderlist_search_teamleadername) {
    var theurl = nodejsip + "/zones//teamleaderlist_TabularData_API/where/teamleadername=/" + data.leaderlist_search_teamleadername
    console.log("the second diurl", theurl)
  }
  else {
    var theurl = nodejsip + "/teamleaders/list"
    console.log("original diurl", theurl)

  }
  async function fetchData() {

    var data = [""];
    var response = [""]
    setResponse(false);
    await axios

      .get(theurl)
      .then((res) => {
        console.log("theurlpassed=", theurl)
        data = res.data.myData;
        response = res.data.success
        console.log("recalled")
        console.log("urlafterrecall:", theurl)
        console.log("success", response)
      })
      .catch((err) => console.log("therr", err));
    // console.log("therr",err)

    return { data, response };
  }
  var myData;
  async function callApi() {
    // console.log("Call api called");
    let values = await fetchData();
    setapiData(values.data);
    setResponse(values.response);



    // console.log(apiData);
  }






  return (
    <>

      <TableContainer component={Paper} style={{ marginBottom: "80px" }} >
        <div style={{ height: '350px' }}>
          {/* <div>zone:{data.leaderlist_search_zone}</div>
        <div>TeamLeader:{data.leaderlist_search_teamleadername}</div> */}
          <div style={myComponent}>

            {response == true ?
              <>
                <Table sx={{ minWidth: 800 }} aria-label="customized table"  >

                  <TableHead className="table-row"  >
                    <TableRow sx={{}}>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Team Leader
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Zone
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Region
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        City
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17, margin: "auto" }}>
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>


                    {apiData.map((info) => (
                      <StyledTableRow >

                        <StyledTableCell align="center" component="th" scope="row">
                          {info.teamLeaderName}
                        </StyledTableCell>
                        <StyledTableCell align="center">{info.zoneName}</StyledTableCell>
                        <StyledTableCell align="center">{info.regionName}</StyledTableCell>
                        <StyledTableCell align="center">{info.cityName}</StyledTableCell>
                        <StyledTableCell align="right">

                          <div class="form-outline mb-4 col-lg-6">
                            <Button type="button" class="btn btn-outline-warning" align="right" onClick={() => gotoAddTeamLeader(info.teamLeaderID)} >
                              {/* <Link to='/addteamleader' className='page-scroll' style={{ color: "white" }}>

                      View Details
                    </Link> */}
                              View Details
                            </Button>

                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}

                  </TableBody>

                </Table>
              </> :
              <>
                <Table sx={{ minWidth: 800 }} aria-label="customized table"  >

                  <TableHead className="table-row"  >
                    <TableRow  >
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Team Leader
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Zone
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Region
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        City
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17, margin: '"auto"' }}>
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                </Table>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", height: '10em' }}>
                  <h3>Loading...</h3>
                  <CircularProgress disabled={true} color="warning" size={40} />
                </Box>
              </>}



          </div>
        </div>


      </TableContainer >

      <FormControl>
        <InputLabel >Age</InputLabel>
        <Select label="Age">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

const root = document.querySelector('#root');
ReactDOM.render(<myComponent />, root);