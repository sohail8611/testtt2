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
import { Trash, PencilSquare } from 'react-bootstrap-icons';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import reducer from "../config/redux/reducer";
import Modal from "@mui/material/Modal";
import { Dialog, DialogActions, DialogTitle, FormControl, TextField } from "@mui/material";

const myComponent = {
  width: 'auto',
  height: 'auto',
  overflowX: 'scroll'
};


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
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
  const [resourcename, setResourcename] = React.useState("");
  const [resourceID, setResourceid] = React.useState("");
  const [resourceType, setResourcetype] = React.useState("");


  const navigate = useNavigate();

  const gotoAddTeamLeader = (teamLeaderID) => {
    navigate('/addteamleader', { state: { teamLeaderID } })
  }




  const reducerData = useSelector(data => data);
  const [state, setState] = React.useState('');
  // setState(reducerData.leaderlist_search_zone)

  const [firstName, setFirstName] = useState(reducerData.leaderlist_search_zone || '');

  const [open, setOpen] = React.useState(false);

  const [resourceTypestate, setresourceTypestate] = React.useState(false);
  const [resourceIdstate, setresourceIdstate] = React.useState(false);
  const [popup, setpopup] = useState(false);

  const handleClose = () => setOpen(false);




  const openPopup = (resourceTypeparam,resourceIdparam) => {
    setresourceTypestate(resourceTypeparam)
    setresourceIdstate(resourceIdparam)
    setpopup(true)
  };

  const closePopupNo = () => {
    setresourceTypestate("")
    setresourceIdstate("")
    setpopup(false)
  };
  const closePopupYes = () => {
    setpopup(false)
    ondeletebtnpress(resourceTypestate, resourceIdstate)
    
  };


  useEffect(() => {

    setapiData([])
    callApi();
    console.log("thedatais:", data)

  }, [data]);




  let theurl = nodejsip + "/teamleaders/getresourcetable"
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



  const ondeletebtnpress = (resourceType, resourceID) => {

    // http://localhost:8000/teamleaders/deleteresource/resourceID/122/resourceType/teamleader
    axios
      .get(nodejsip + "/teamleaders/deleteresource/resourceID/" + resourceID + "/resourceType/" + resourceType)
      .then((res) => {
        // setCurrentsubzoneID(subz)
        setapiData([]);
        callApi();
        // console.log("subzoneID deleted", subzoneID);
        // setReranderPage(zoneID)
      })
      .catch((err) => console.log(err));

    console.log("resourceID:", resourceID)
    console.log("resourceType:", resourceType)
  };


  


  const updateResource = (resourceID,resourceType,resourceName) => {

    // http://localhost:8000/teamleaders/updateresource/resourceID/121/resourceType/teamleader/resourceName/testtt
    axios
      .get(nodejsip + "/teamleaders/updateresource/resourceID/"+ resourceID + "/resourceType/" + resourceType + "/resourceName/" + resourceName)
      .then((res) => {
        // setCurrentsubzoneID(subz)
        setapiData([]);
        callApi();
        // console.log("subzoneID deleted", subzoneID);
        // setReranderPage(zoneID)
      })
      .catch((err) => console.log(err));
    // setResourcename(resourceName)
    // setResourceid(resourceID)
    // setResourcetype(resourceType)
    console.log("resourceID:", resourceID)
    console.log("resourceType:", resourceType)
    console.log('resourceName:', resourceName)

    setOpen(false)
  };





  const oneditbtnpress = (resourceType, resourceID, resourceName) => {
    setResourcename(resourceName)
    setResourceid(resourceID)
    setResourcetype(resourceType)
    console.log("resourceID:", resourceID)
    console.log("resourceType:", resourceType)
    console.log('resourceName:', resourceName)

    setOpen(true)
  };






  return (

    <>
      <TableContainer component={Paper} style={{ marginBottom: "80px" }} >
        <div style={{ height: '300px' }}>
          {/* <div>zone:{data.leaderlist_search_zone}</div>
        <div>TeamLeader:{data.leaderlist_search_teamleadername}</div> */}
          <div style={myComponent}>

            {response == true ?
              <>
                <Table sx={{ minWidth: 800 }} aria-label="customized table"  >

                  <TableHead className="table-row"  >
                    <TableRow  >
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Resource ID
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Resource Type
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Resource Name
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Edit
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17, margin: "auto" }}>
                        Delete
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>


                    {apiData.map((info) => (
                      <StyledTableRow>

                        <StyledTableCell align="center" component="th" scope="row">
                          {info.resourceID}
                        </StyledTableCell>
                        <StyledTableCell align="center">{info.resourceType}</StyledTableCell>
                        <StyledTableCell align="center">{info.resourceName}</StyledTableCell>
                        <StyledTableCell align="right">
                          <div className="form-outline mb-4 col-lg-7">

                            <Button onClick={() => oneditbtnpress(info.resourceType, info.resourceID, info.resourceName)}>
                              <PencilSquare color="white" size={20} />
                            </Button>

                          </div>

                        </StyledTableCell>

                        <StyledTableCell align="right">
                          <div className="form-outline mb-4 col-lg-7">
                          {/* ondeletebtnpress(info.resourceType, info.resourceID) */}
                            <Button onClick={() => openPopup(info.resourceType, info.resourceID)}>

                              <Trash color="white" size={20} />
                            </Button>


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
                        Resource ID
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Resource Type
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Resource Name
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Edit
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17, margin: "auto" }}>
                        Delete
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


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h4 style={{ marginBottom: "10%", marginLeft: "5%" }}>
              Edit Resource
            </h4>
          </div>




          <div>
            <h5 style={{ paddingLeft: "3%" }}>ResourceID: {resourceID}</h5>
          </div>

          <div>
            <h5 style={{ paddingLeft: "3%" }}>ResourceType: {resourceType}</h5>
          </div>


          <div>
            <h5 style={{ paddingLeft: "3%" }}>resourceName: </h5>
          </div>
          <div>

            <TextField className="form-field"
              id="outlined-basic"
              variant="outlined"
              halfWidth
              label="Resource Name"
              value={resourcename}
              onChange={(e) => setResourcename(e.target.value)}
            />

          </div>

          <div class="form-outline mb-4 col-lg-4" style={{ marginTop: "5%" }}>
            <Button
              onClick={() => updateResource(resourceID, resourceType, resourcename)}
            >
              Save
            </Button>
          </div>

          <div class="form-outline mb-4 col-lg-4" style={{ marginTop: "5%" }}>
            <Button
              onClick={handleClose}
              as="input"
              type="submit"
              value="Cancel"
            >
            </Button>
          </div>

        </Box>


      </Modal>


    </>
  );
}

const root = document.querySelector('#root');
ReactDOM.render(<myComponent />, root);