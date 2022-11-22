import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Row } from 'react-bootstrap';
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';


// import { useSelector, useDispatch } from 'react-redux';
const myComponent = {
  width: 'auto',
  height: 'auto',
  overflowX: 'scroll'
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    height: 10,
  },
}));

function createData(teamleader, zone, region, city, action) {
  return { teamleader, zone, region, city, action };
}

const rows = [
  createData('KHALIQ ALMUBAYRIK', ' Al Sulimaniyah', 'Northern Region', 'Al Riyadh', 'View Details'),
  /*createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),*/
];





export default function AddLeader() {

  let nodejsip = "http://67.205.163.34:8000"

  const [teamleadertable, setTeamleadertable] = useState([]);
  const [open, setOpen] = React.useState(false);


  

  const handleOpen = (zoneID,cityID,regionID) => {
    // console.log("CurrentzoneID",zoneId);
    setCurrentzoneID(zoneID)

    setDefaultselectedzone(zoneID)
    setDefaultselectedcity(cityID)
    setDefaultselectedregion(regionID)
    // setDefaultselectedsubzone(subzoneName)

    getCities(regionID)
    getZones(cityID)
    // getSubZones(zoneID)
    
    setOpen(true);
  }



  
  const handleClose = () => setOpen(false);

  const [name, setName] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [city, setCity] = React.useState('');
  const [zone, setZone] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [leadername, setLeadername] = useState('');
  const [leaderID, setLeaderID] = useState('');
  const [currentzoneID, setCurrentzoneID] = useState('');

  const [zoneresponse,setZoneresponse] =useState(false);
  const [cityresponse,setCityresponse] =useState(false);
  const [regionresponse,setRegionresponse] =useState(false);
  const [teamleaderresponse,setTeamleaderresponse] =useState(false);
  const [tableresponse,setTableresponse] =useState(false);
  const [zonedisabled,setZonedisabled] =useState(true);

  const [Value, setValue] = useState("1");
  const [defaultselectedregion, setDefaultselectedregion] = React.useState('');
  const [defaultselectedcity, setDefaultselectedcity] = React.useState('');
  const [defaultselectedzone, setDefaultselectedzone] = React.useState('');
  const [defaultselectedsubzone, setDefaultselectedsubzone] = React.useState('');

  // const reduxData = useSelector(data => data)
  const location = useLocation();
  const [ReranderPage, setReranderPage] = useState('');



  const [zoneId, setZoneId] = React.useState(false);
  const [popup, setpopup] = useState(false);


  const openPopup = (zoneIdparam) => {
    setZoneId(zoneIdparam)
    setpopup(true)
  };

  const closePopupNo = () => {
    setZoneId("")
    setpopup(false)
  };
  const closePopupYes = () => {
    setpopup(false)
    unassignzoneforteamleader(zoneId)
    
  };










  const unassignzoneforteamleader = (zoneID) => {
    setTableresponse(false)
    axios
      .get(nodejsip + "/teamleaders/removezonefromteamleader/zoneID/" + zoneID)
      .then((res) => {
        console.log("zoneID deleted", zoneID)
        setReranderPage(zoneID)
        callApi_3()
      })
      .catch((err) => console.log(err));
  }



  const handleSubmit = event => {
    setTableresponse(false)
    console.log('handleSubmit ran');
    event.preventDefault();
    // 👇️ access input values here
    console.log('Name 👉️', name);
    console.log('Zone👉️', zone);
    console.log('Details👉️', details);
    

    let myurl = nodejsip+"/teamleaders/name/" + leaderID + "/zone/" + zone +"/currentzone/"+currentzoneID
    console.log("theurlsnow", myurl)
    axios.get(myurl)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log("setpost:",currentzoneID)
        callApi_3()
        console.log("sending post request")
      })
    // 👇️ clear all input values in the form
    // setName('');
    setCity('');
    setRegion('');
    setZone('');
    setDetails('');
    setOpen(false);
    window.location.reload(false); 
  


  };








  useEffect(() => {
    console.log("teamLeaderID_is:", location.state.teamLeaderID);
    // setName(location.state.teamLeaderID)
  }, [])

  // http://localhost:8000/teamleaders/teamleaderid/2

  //Call API for data
  const [apiData_3, setapiData_3] = useState([]);
  useEffect(() => {
    callApi_3();
  }, [ReranderPage]);

  async function fetchData_3() {
    var data_3 = [""];
    await axios
      .get(nodejsip + "/teamleaders/teamleaderid/" + location.state.teamLeaderID)
      .then((res) => {
        data_3 = res.data.myData;
        console.log("leadername: ", data_3)
        console.log("leadername: ", data_3[0]['teamLeaderName'])
        setLeadername(data_3[0]['teamLeaderName'])
        setLeaderID(data_3[0]['teamLeaderID'])
        setTableresponse(res.data.success)
        
      })
      .catch((err) => {
        console.log(err);
        setTableresponse(true)
      });
    return data_3;
  }
  var myData_3;
  async function callApi_3() {
    // console.log("Call api called");
    setapiData_3(await fetchData_3());
    // console.log(apiData);
  }
  
  
  //API call to get all teamleaders list
  const [apiData_2, setapiData_2] = useState([]);
  const [Loader, setLoader] =useState(false);
  useEffect(() => {
    callApi_2();
  }, []);

  async function fetchData_2() {
    var data_2 = [""];
    await axios
      .get(nodejsip+"/teamleaders/registered")
      .then((res) => {
        data_2 = res.data.myData;
      })
      .catch((err) => console.log(err));
    return data_2;
  }
  var myData_2;
  async function callApi_2() {
    // console.log("Call api called");
    setLoader(true);
    setapiData_2(await fetchData_2());
    setLoader(false);
    // console.log(apiData);
  }



  
  //API call to get all regions
  const [apiData_1, setapiData_1] = useState([]);
  useEffect(() => {
    callApi_1();
  }, []);

  async function fetchData_1() {
    var data_1 = [""];
    setRegionresponse(false)
    await axios
      .get(nodejsip+"/regions/registered")
      .then((res) => {
        data_1 = res.data.myData;
        setRegionresponse(res.data.success)
      })
      .catch((err) => console.log(err));
    return data_1;
  }
  var myData_1;
  async function callApi_1() {
    // console.log("Call api called");
    setapiData_1(await fetchData_1());
    // console.log(apiData);
  }



  const getCities = (region) => {
    setCityresponse(false)
    setRegion(region);
    let myurl = nodejsip+"/regions/regionid/" + region
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;

        setCities(res.data.myData)
        setCityresponse(res.data.success)
      })
      .catch((err) => console.log(err));
  }



  const getZones = (city) => {
    setZonedisabled(false)
    setZoneresponse(false)
    setCity(city);
    let myurl = nodejsip+"/regions/cityid/" + city
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;

        setZones(res.data.myData["theData"])
        setZoneresponse(res.data.success)
        console.log("zones setting:", zones)
      })
      .catch((err) => console.log(err));
  }


  return (


    <>

      <TableContainer component={Paper} style={{ marginBottom: "80px" }} >
        <div style={{ height: '300px' }}>
          <div style={myComponent}>
          {/* tableresponse
          {apiData_3.length ? */}
            { tableresponse==true ?
              <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead className='table-row'>
                  <TableRow >
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>Team Leader</StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>Zone</StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>Region</StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>City</StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apiData_3.map((row) => (
                    <StyledTableRow key={row.teamleader}>
                      <StyledTableCell align="center" component="th" scope="row">
                        {row.teamLeaderName}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.zoneName}</StyledTableCell>
                      <StyledTableCell align="center">{row.regionName}</StyledTableCell>
                      <StyledTableCell align="center">{row.cityName}</StyledTableCell>
                      <StyledTableCell align="center">
                        <Row>
                          <div className="form-outline mb-4 col-lg-5">



                            {/* sessionStorage.getItem('userID') */}
                            {/* {sessionStorage.getItem('manageZones') == 'true' ? */}
                              <Button onclickstyle={{ marginBottom: "8px" }} onClick={() => handleOpen(row.zoneID,row.regionID,row.cityID)} >
                                <PencilSquare color="white" size={20} />
                              </Button> 
                              {/* : <><Button disabled={true} style={{ marginBottom: "8px" }}>
                                <PencilSquare color="white" size={20} />
                              </Button></>} */}
                          </div>
                          <div className="form-outline mb-4 col-lg-4">
                            {sessionStorage.getItem('manageZones') == 'true' ?
                              <Button onClick={() => openPopup(row.zoneID)}>
                                <Trash color="white" size={20} />
                                {/* unassignzoneforteamleader(row.zoneID) */}
                              </Button> : <><Button disabled={true} onClick={() => openPopup(row.zoneID)}>
                                <Trash color="white" size={20} />
                              </Button></>}



                              <Dialog
                            open={popup}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Do you want to delete this record?"}
                            </DialogTitle>
                            
                            <DialogActions>
                              <Button onClick={closePopupYes}>Yes</Button>
                              <Button onClick={closePopupNo} autoFocus>
                                No
                              </Button>
                            </DialogActions>
                            </Dialog>



                          </div></Row>


                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table> :
              <>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead className="table-row">
                    <TableRow>
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
                </Table>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", height: '10em' }}>
                  <h3>Loading...</h3>
                  <CircularProgress disabled={true} color="warning" size={40} />
                </Box>
              </>
            }
          </div>
        </div>
      </TableContainer >

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       <Box sx={style}>
          <div>

            <h4 style={{ marginBottom: "10%", marginLeft: "5%" }}>Assign Team Leader</h4>

          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <h5 style={{ paddingLeft: "6%" }}>Team Leader Name</h5>
            </div>

            <FormControl fullWidth>

            <h4 style={{ fontSize: 13 ,paddingLeft: "6%",marginBottom:"-5%"}} id="demo-simple-select-label">{leadername}</h4>
              
                
                    
                      <h3></h3>
                    
                 

              
            </FormControl>



            <div>
              <h5 style={{ paddingLeft: "6%" }}>Region</h5>
            </div>

            <FormControl fullWidth>

              <InputLabel style={{ fontSize: 12 }} id="demo-simple-select-label">Region</InputLabel>
              <Select
              style={{ fontSize: 12}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required= "true "

                label="Region"
                // value= {defaultselectedregion}
                defaultValue= {defaultselectedregion}
                // onChange={event => setRegion(event.target.value)}
                onChange={(e) => getCities(e.target.value)}
                
              >
                {regionresponse==true ?
                apiData_1.map((info) => (
                  <MenuItem style={{ fontSize: 12}} value={info.regionID}>{info.regionName}</MenuItem>
                )):
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", height: '2em' }}>
                  
                  <CircularProgress disabled={true} color="warning" size={20} />
                </Box>
              }
              </Select>
            </FormControl>

            <div>
              <h5 style={{ paddingLeft: "6%" }}>City</h5>
            </div>

            <FormControl fullWidth>

              <InputLabel style={{ fontSize: 12 }} id="demo-simple-select-label">City</InputLabel>
              <Select
              style={{ fontSize: 13 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required= "true "

                label="City"
                // value= {defaultselectedcity}
                defaultValue= {defaultselectedcity}
                onChange={(e) => getZones(e.target.value)}
                
              >
                {/* {apiData.map((info) => (
              <MenuItem value={info.cityID}>{info.cityName}</MenuItem>
              ))} */}
                {cityresponse == true ?
                cities.map((info) => (
                  <MenuItem style={{ fontSize: 12 }} value={info.cityID}>{info.cityName}</MenuItem>
                )):
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", height: '2em' }}>
                    
                    <CircularProgress disabled={true} color="warning" size={20} />
                  </Box>
                }
              </Select>
            </FormControl>
            <div>
              <h5 style={{ paddingLeft: "6%" }}>Enter Zone</h5>
            </div>


            <FormControl fullWidth>

              <InputLabel style={{ fontSize: 12 }} id="demo-simple-select-label">Enter Zone</InputLabel>
              <Select
              style={{ fontSize: 12 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required= "true "

                label="Enter Zone"
                // value= {defaultselectedzone}
                defaultValue= {defaultselectedzone}
                onChange={event => setZone(event.target.value)}
                
                disabled={zonedisabled}
                
              >
                {zoneresponse==true ?
                zones.map((info) => (
                  <MenuItem style={{ fontSize: 12 }} value={info.zoneID}>{info.zoneName}</MenuItem>
                )):
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: "100%", height: '2em' }}>
                  
                  <CircularProgress disabled={true} color="warning" size={20} />
                </Box>
              }
              </Select>
            </FormControl>

            <div>
              <h5 style={{ paddingLeft: "6%" }}>Location Details</h5>
            </div>


            <TextField 
            inputProps={{style: {fontSize: 12}}} // font size of input text
            InputLabelProps={{style: {fontSize: 12}}} // font size of input label
        
            className="form-field"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Location Details"
              onChange={event => setDetails(event.target.value)}
              value={details}
            />






            <div class="form-outline mb-4 col-lg-4" style={{ marginTop: "5%" }}>
              <Button onSubmit={handleSubmit}  type="submit" >Save</Button>{' '}




            </div>

            <div class="form-outline mb-4 col-lg-4" style={{ marginTop: "5%" }}>
              <Button onClick={handleClose} as="input" type="reset" value="Cancel" />{' '}



            </div>






          </form>
        </Box>
      </Modal>
    </>);
}
