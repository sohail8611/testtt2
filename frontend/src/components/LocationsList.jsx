import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Row } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../App.css";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Component from "./map";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
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

<>
  {" "}
  <Button variant="warning">Warning</Button>{" "}
</>;

export default function CustomizedTables(props) {
  let nodejsip = "http://67.205.163.34:8000";
  const [open, setOpen] = React.useState(false);
  const [subzoneresponse, setsubzoneresponse] = useState(false);
  const [zone, setZone] = React.useState('');
  const [subzone, setSubzone] = React.useState('');
  const [subzones, setSubZones] = useState([]);
  const [add, setadd] = React.useState("");
  const [currentsubzone, setCurrentsubzone] = React.useState('');
  const [defaultselectedsubzone, setDefaultselectedsubzone] = React.useState('');
  const [showhide, setShowhide] = useState("");
  const handleChange = (event) => setadd(event.target.value);
  const [map, setMap] = useState(false);
  const [tableresponse, setTableresponse] = useState(false);
  const [apiData, setapiData] = useState([]);
  const [searchedValue, setSearchedValue] = useState([]);
  const [myFlag, setMyFlag] = useState(false);

  const [thezoneId, setthezoneId] = useState(false);
  const [popup, setpopup] = useState(false);

  const { setZoneGlobalList } = props;

  const openPopup = (thezoneIdparameter) => {
    console.log("thezoneidis:",thezoneIdparameter)
    setthezoneId(thezoneIdparameter)
    setpopup(true)
  };

  const closePopupNo = () => {
    setthezoneId("")
    setpopup(false)
  };

  const closePopupYes = () => {
    console.log("thezoneidafteryesis:",thezoneId)
    setpopup(false)
    removesubzone(thezoneId)
  };




  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
  };
  const handleSubmit = event => {


    console.log(currentsubzone, "currentSubzone")
    console.log(defaultselectedsubzone, "defaultname")
    let myurl = nodejsip + "/zones/updatelocationsubzone/" + currentsubzone + "/" + defaultselectedsubzone
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;
        setsubzoneresponse(res.data.success);
        setSubZones(res.data.myData["theData"])

        setapiData([]);
        callApi();
      })
      .catch((err) => console.log(err));
    setTableresponse(false)
    console.log('handleSubmit ran');
    event.preventDefault();
    // 👇️ access input values here
    console.log('Subzone 👉️', subzone);
    setOpen(false)

  };
  const getSubZones = (zone) => {
    setZone(zone);
    let myurl = nodejsip + "/regions/zoneid/" + zone
    setsubzoneresponse(false);
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;
        setsubzoneresponse(res.data.success);
        setSubZones(res.data.myData["theData"])
      })
      .catch((err) => {
        console.log(err);
        setsubzoneresponse(true)
      });
  }

  const handleOpen = (subzoneID, zoneID, thezoneName) => {

    setCurrentsubzone(subzoneID)
    setDefaultselectedsubzone(thezoneName)
    getSubZones(zoneID)

    console.log("thezoneName:", thezoneName)
    console.log("thesubzoneID:", subzoneID)
    setOpen(true)

  };
  const handleClose = () => setOpen(false);

  const removesubzone = (subzoneID) => {
    axios
      .get(nodejsip + "/zones/deletesubzone/where/subzoneID=/" + subzoneID)
      .then((res) => {
        // setCurrentsubzoneID(subz)
        setapiData([]);
        callApi();
        console.log("subzoneID deleted", subzoneID);
        // setReranderPage(zoneID)
      })
      .catch((err) => console.log(err));
  };

  // ///////////////////////////// /////// getting data from db
  useEffect(() => {
    callApi();
  }, []);

  async function fetchData() {
    var data = [""];
    setTableresponse(false);
    let tempZoneNameArray = []
    await axios
      .get(nodejsip + "/zones/getalllocations")
      .then((res) => {
        data = res.data.myData;

        data.map((e) => {
          tempZoneNameArray.push(e.zoneName)
        })
        setZoneGlobalList(tempZoneNameArray)

        setTableresponse(res.data.success);
      })
      .catch((err) => {
        console.log(err);
        setTableresponse(true);
      });
    return data;
  }
  var myData;
  async function callApi() {
    // console.log("Call api called");
    setapiData(await fetchData());
    // console.log(apiData);
  }
  // ///////////////////////////// /////// getting data from db end

  // ///////////////////////////// //////////////   SEARCHING FUNCTIONS
  
  const search = () => {
    var myarray2 = [];
    if (props.inputValue == "") {
      setMyFlag(false);
    } else {
      apiData.filter((e) => {
        console.log("here" ,props.inputValue)
        let zonefilterValue = props.inputValue.toString().toUpperCase();
        let zoneTableText = e.zoneName.toString().toUpperCase();

        if(zonefilterValue != '')
        {
           if (zoneTableText.indexOf(zonefilterValue) > -1) {
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
        {console.log(props.inputValue)}
        {!myFlag ? (
          // For all values
          <div style={myComponent}>
            {apiData.length ? (
              <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead className="table-row">
                  <TableRow>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>
                      Region
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>
                      City
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>
                      Zone
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>
                      SubZone
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>
                      Action
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apiData.map((row) => (
                    <>
                      <StyledTableRow>
                        <StyledTableCell
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {row.regionName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.cityName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.zoneName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.thesubzoneName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <Row>
                            <div className="form-outline mb-4 col-lg-5">
                              <Button style={{ marginBottom: "8px" }} onClick={() => handleOpen(row.subzoneID, row.zone, row.thesubzoneName)}>
                                <PencilSquare color="white" size={20} />
                              </Button>

                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                              >
                                <Box sx={style}>

                                  <form onSubmit={handleSubmit}>

                                    <div>
                                      <h5 style={{ paddingLeft: "6%" }}> Subzone</h5>
                                    </div>


                                    <FormControl fullWidth>

                                      {/* <InputLabel  style={{ fontSize: 12 }}  id="demo-simple-select-label">SubZone</InputLabel> */}
                                      <TextField
                                        className="form-field"
                                        style={{ fontSize: 12 }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // required= "true "
                                        label="Subzone"

                                        defaultValue={defaultselectedsubzone}
                                        onChange={event => setDefaultselectedsubzone(event.target.value)}
                                      />


                                    </FormControl>

                                    {map ? (
                                      <>
                                        {
                                          <div className="App">
                                            <div id="floating-panel">
                                              <div class="form-outline mb-4 col-lg-2">
                                                <Button>Zone</Button>
                                              </div>
                                              <div class="form-outline mb-4 col-lg-4">
                                                <Button>Subzone</Button>
                                              </div>
                                              <div class="form-outline mb-4 col-lg-4">
                                                <Button>Delete</Button>
                                              </div>
                                            </div>

                                            <Component />
                                          </div>
                                        }
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    <div
                                      class="form-outline mb-4 col-lg-7"
                                      style={{ marginTop: "15%" }}
                                    >
                                      <Button
                                        onSubmit={handleSubmit}
                                        type="submit"
                                      >
                                        Save
                                      </Button>{" "}
                                    </div>

                                    <div
                                      class="form-outline mb-4 col-lg-3"
                                      style={{ marginTop: "15%" }}
                                    >
                                      <Button
                                        onClick={handleClose}
                                        as="input"
                                        type="reset"
                                        value="Cancel"
                                      />{" "}
                                    </div>
                                  </form>
                                </Box>
                              </Modal>
                            </div>
                            <div className="form-outline mb-4 col-lg-4">
                              <Button
                              // removesubzone(row.subzoneID)
                                onClick={() => openPopup(row.subzoneID)}
                              >
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
                          </Row>
                        </StyledTableCell>

                      </StyledTableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead className="table-row">
                    <TableRow>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Region
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        City
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Zone
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        SubZone
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
          <>
            {/* For searched values  */}
            <div style={myComponent}>
              {apiData.length ? (
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead className="table-row">
                    <TableRow>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Region
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        City
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Zone
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        SubZone
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Action
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchedValue.map((row) => (
                      <>
                        <StyledTableRow>
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                          >
                            {row.regionName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.cityName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.zoneName}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.subzoneID}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <Row>
                              <div className="form-outline mb-4 col-lg-5">
                                <Button style={{ marginBottom: "8px" }}>
                                  <PencilSquare
                                    onClick={handleOpen}
                                    color="white"
                                    size={20}
                                  />
                                </Button>
                                <Modal
                                  open={open}
                                  onClose={handleClose}
                                  aria-labelledby="modal-modal-title"
                                  aria-describedby="modal-modal-description"
                                >
                                  <Box sx={style}>
                                    <div>
                                      <h4
                                        style={{
                                          marginBottom: "10%",
                                          marginLeft: "3%",
                                        }}
                                      >
                                        Add New Location{" "}
                                      </h4>
                                    </div>

                                    <div>
                                      <h5 style={{ paddingLeft: "3%" }}>
                                        Location Type
                                      </h5>
                                    </div>
                                    <FormControl fullWidth>
                                      <InputLabel
                                        style={{ fontSize: 12 }}
                                        id="demo-simple-select-label"
                                      >
                                        Location Type
                                      </InputLabel>
                                      <Select
                                        style={{ fontSize: 12 }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Location Type"
                                        name="Location Type"
                                        className="form-field"
                                        onChange={(e) => handleshowhide(e)}
                                      >
                                        <MenuItem
                                          style={{ fontSize: 12 }}
                                          value="1"
                                        >
                                          Zone
                                        </MenuItem>
                                        <MenuItem
                                          style={{ fontSize: 12 }}
                                          value="2"
                                        >
                                          Subzone
                                        </MenuItem>
                                      </Select>
                                    </FormControl>

                                    {showhide === "1" && (
                                      <FormControl fullWidth>
                                        <div>
                                          <h5 style={{ paddingLeft: "3%" }}>
                                            City
                                          </h5>
                                        </div>
                                        {/* <InputLabel id="demo-simple-select-label">City</InputLabel> */}
                                        <Select
                                          style={{ fontSize: 12 }}
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="City"
                                          onChange={handleChange}
                                        >
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={10}
                                          >
                                            Ten
                                          </MenuItem>
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={20}
                                          >
                                            Twenty
                                          </MenuItem>
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={30}
                                          >
                                            Thirty
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    )}

                                    {showhide === "1" && (
                                      <FormControl fullWidth>
                                        <div>
                                          <h5 style={{ paddingLeft: "3%" }}>
                                            Region
                                          </h5>
                                        </div>
                                        {/* <InputLabel id="demo-simple-select-label">Region</InputLabel> */}
                                        <Select
                                          style={{ fontSize: 12 }}
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Region"
                                          onChange={handleChange}
                                        >
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={1}
                                          >
                                            North
                                          </MenuItem>
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={2}
                                          >
                                            South
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    )}

                                    {showhide === "2" && (
                                      <FormControl fullWidth>
                                        <div>
                                          <h5 style={{ paddingLeft: "3%" }}>
                                            Region
                                          </h5>
                                        </div>

                                        {/* <InputLabel id="demo-simple-select-label">Region</InputLabel> */}
                                        <Select
                                          style={{ fontSize: 12 }}
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Region"
                                          onChange={handleChange}
                                        >
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={1}
                                          >
                                            North
                                          </MenuItem>
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={2}
                                          >
                                            South
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    )}
                                    {showhide === "2" && (
                                      <FormControl fullWidth>
                                        <div>
                                          <h5 style={{ paddingLeft: "3%" }}>
                                            City
                                          </h5>
                                        </div>
                                        {/* <InputLabel id="demo-simple-select-label">City</InputLabel> */}
                                        <Select
                                          style={{ fontSize: 12 }}
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="City"
                                          onChange={handleChange}
                                        >
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={10}
                                          >
                                            Ten
                                          </MenuItem>
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={20}
                                          >
                                            Twenty
                                          </MenuItem>
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={30}
                                          >
                                            Thirty
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    )}
                                    {showhide === "2" && (
                                      <FormControl fullWidth>
                                        <div>
                                          <h5 style={{ paddingLeft: "3%" }}>
                                            Zone
                                          </h5>
                                        </div>
                                        {/* <InputLabel id="demo-simple-select-label">Zone</InputLabel> */}
                                        <Select
                                          style={{ fontSize: 12 }}
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Zone"
                                          onChange={handleChange}
                                        >
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={10}
                                          >
                                            zone A
                                          </MenuItem>
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={20}
                                          >
                                            Zone B
                                          </MenuItem>
                                          <MenuItem
                                            style={{ fontSize: 12 }}
                                            value={30}
                                          >
                                            Zone C
                                          </MenuItem>
                                        </Select>
                                      </FormControl>
                                    )}

                                    <div>
                                      <h5 style={{ paddingLeft: "3%" }}>
                                        Subzone
                                      </h5>
                                    </div>
                                    <div>
                                      <TextField
                                        inputProps={{ style: { fontSize: 12 } }} // font size of input text
                                        InputLabelProps={{
                                          style: { fontSize: 12 },
                                        }} // font size of input label
                                        className="form-field"
                                        id="outlined-basic"
                                        variant="outlined"
                                        halfWidth
                                        label="Subzone"
                                      />
                                    </div>
                                    <div>
                                      <div
                                        class="form-outline mb-4 col-lg-1"
                                        style={{
                                          marginTop: "5%",
                                          marginBottom: "3%",
                                        }}
                                      >
                                        <Button
                                          type="submit"
                                          className="btn_orange"
                                          onClick={(event) => setMap(1)}
                                        >
                                          <div
                                            class=""
                                            style={{ marginTop: "8%" }}
                                          >
                                            <i
                                              class="fa fa-plus"
                                              aria-hidden="true"
                                            ></i>
                                          </div>
                                        </Button>
                                      </div>
                                      {map ? (
                                        <>
                                          {
                                            <div className="App">
                                              <div id="floating-panel">
                                                <div class="form-outline mb-4 col-lg-2">
                                                  <Button>Zone</Button>
                                                </div>
                                                <div class="form-outline mb-4 col-lg-4">
                                                  <Button>Subzone</Button>
                                                </div>
                                                <div class="form-outline mb-4 col-lg-4">
                                                  <Button>Delete</Button>
                                                </div>
                                              </div>

                                              <Component />
                                            </div>
                                          }
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>

                                    <div
                                      class="form-outline mb-4 col-lg-3"
                                      style={{ marginTop: "15%" }}
                                    >
                                      <Button
                                        onSubmit={handleSubmit}
                                        type="submit"
                                      >
                                        Save
                                      </Button>{" "}
                                    </div>

                                    <div
                                      class="form-outline mb-4 col-lg-3"
                                      style={{ marginTop: "15%" }}
                                    >
                                      <Button
                                        onClick={handleClose}
                                        as="input"
                                        type="reset"
                                        value="Cancel"
                                      />{" "}
                                    </div>
                                  </Box>
                                </Modal>
                              </div>
                              <div className="form-outline mb-4 col-lg-4">
                                <Button
                                  onClick={() => removesubzone(row.subzoneID)}
                                >
                                  <Trash color="white" size={20} />
                                </Button>
                              </div>
                            </Row>
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <>
                  <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead className="table-row">
                      <TableRow>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Region
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          City
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          Zone
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
                          SubZone
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          style={{ fontSize: 17 }}
                        >
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
                    <CircularProgress
                      disabled={true}
                      color="warning"
                      size={40}
                    />

                  </Box>

                </>
              )}
            </div>
          </>
        )}
      </div>
    </TableContainer>
  );
}