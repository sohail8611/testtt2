import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Button, Row } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef, handleChange } from "react";

// import { useSelector, useDispatch } from 'react-redux';
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

function createData(teamleader, zone, subzone, region, city, action) {
  return { teamleader, zone, subzone, region, city, action };
}

const rows = [
  createData(
    "KHALIQ ALMUBAYRIK",
    " Al Sulimaniyah",
    " Al Sulimaniyah1",
    "Northern Region",
    "Al Riyadh",
    "View Details"
  ),
  /*createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),*/
];

export default function AddTechnician(props) {
  let nodejsip = "http://67.205.163.34:8000";
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [subzoneresponse, setsubzoneresponse] = useState(false);
  const [zoneresponse, setZoneresponse] = useState(false);
  const [cityresponse, setCityresponse] = useState(false);
  const [regionresponse, setRegionresponse] = useState(false);
  const [techniciansresponse, setTechniciansresponse] = useState(false);
  const [region, setRegion] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zone, setZone] = React.useState("");
  const [cities, setCities] = useState([]);
  const [apiData_2, setapiData_2] = useState([]);
  const [zones, setZones] = useState([]);
  const [subzones, setSubZones] = useState([]);
  const [subzone, setSubzone] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [currentsubzone, setCurrentsubzone] = React.useState("");
  const [Value, setValue] = useState("1");
  const [thezoneId, setthezoneId] = useState(false);
  const [popup, setpopup] = useState(false);

  const [technicianame, setTechnicianame] = React.useState("");

  const [searchedValue, setSearchedValue] = useState([]);

  const [defaultselectedregion, setDefaultselectedregion] = React.useState("");
  const [defaultselectedcity, setDefaultselectedcity] = React.useState("");
  const [defaultselectedzone, setDefaultselectedzone] = React.useState("");
  const [defaultselectedsubzone, setDefaultselectedsubzone] =
    React.useState("");
  // selectedtechID

  const getSubZones = (zone) => {
    setZone(zone);
    let myurl = nodejsip + "/regions/zoneid/" + zone;
    setsubzoneresponse(false);
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;
        setsubzoneresponse(res.data.success);
        setSubZones(res.data.myData["theData"]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callApi_2();
  }, []);

  async function fetchData_2() {
    var data_2 = [""];
    setRegionresponse(false);
    await axios
      .get(nodejsip + "/regions/registered")
      .then((res) => {
        setRegionresponse(res.data.success);
        data_2 = res.data.myData;
      })
      .catch((err) => console.log(err));
    return data_2;
  }
  var myData_2;
  async function callApi_2() {
    // console.log("Call api called");
    setapiData_2(await fetchData_2());
    // console.log(apiData);
  }

  const getZones = (city) => {
    setCity(city);
    let myurl = nodejsip + "/regions/cityid/" + city;
    setZoneresponse(false);
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;
        setZoneresponse(res.data.success);
        setZones(res.data.myData["theData"]);
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = (subzoneName, regionID, cityID, zoneID) => {
    setCurrentsubzone(subzoneName);
    setDefaultselectedzone(zoneID);
    setDefaultselectedcity(cityID);
    setDefaultselectedregion(regionID);
    setDefaultselectedsubzone(subzoneName);

    getCities(regionID);
    getZones(cityID);
    getSubZones(zoneID);

    setOpen(true);
    //window.location.reload(false);
  };
  const handleClose = () => setOpen(false);

  const [techniciantable, setTechnicianTable] = useState([]);
  const [tableresponse, setTableresponse] = useState(false);
  const location = useLocation();

  const handleSubmit = (event) => {
    setTableresponse(false);
    console.log("handleSubmit ran");
    event.preventDefault();
    // 👇️ access input values here
    console.log("techName 👉️", name);
    console.log("techsubZone👉️", subzone);
    console.log("techDetails👉️", details);

    let myurl =
      nodejsip +
      "/zones/name/" +
      location.state.techID +
      "/subzone/" +
      subzone +
      "/currentsubzone/" +
      currentsubzone;
    console.log("theurlsnow", myurl);
    axios.get(myurl).then((res) => {
      console.log(res);
      console.log(res.data);
      console.log("setpost:", currentsubzone);
      callApi_3();
      console.log("sending post request");
      console.log("addtechnician_post_url: ", console.log(myurl));
    });
    // 👇️ clear all input values in the form
    // setName('');
    setCity("");
    setRegion("");
    setZone("");
    setDetails("");
    setOpen(false);
  };

  const unassignsubzonefortechnician = (subzoneName) => {
    setTableresponse(false);
    //localhost:8000/zones/unassignsubzone/where/subzoneID=/1/technicianID=/2
    http: axios
      .get(
        nodejsip +
          "/zones/unassignsubzone/where/subzoneID=/" +
          subzoneName +
          "/technicianID=/" +
          location.state.techID
      )
      .then((res) => {
        console.log("subzoneID deleted", subzoneName);
        console.log(
          "testurll:",
          nodejsip +
            "/zones/unassignsubzone/where/subzoneID=/" +
            subzoneName +
            "/technicianID=/" +
            location.state.techID
        );

        callApi_3();
      })
      .catch((err) => console.log(err));
  };

  const getCities = (region) => {
    setRegion(region);
    let myurl = nodejsip + "/regions/regionid/" + region;
    setCityresponse(false);
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;
        setCityresponse(res.data.success);
        setCities(res.data.myData);
      })
      .catch((err) => console.log(err));
  };

  const [apiData_3, setapiData_3] = useState([]);
  useEffect(() => {
    callApi_3();
  }, []);

  async function fetchData_3() {
    var data_3 = [""];
    await axios
      .get(
        "http://67.205.163.34:8000/teamleaders//technicianID/" +
          location.state.techID
      )
      .then((res) => {
        data_3 = res.data.myData;
        console.log("thearr: ", data_3);
        setTableresponse(res.data.success);
        setTechnicianame(data_3[0]["technicianName"]);
      })
      .catch((err) => {
        console.log(err);
        setTableresponse(true);
      });
    return data_3;
  }
  var myData_3;
  async function callApi_3() {
    // console.log("Call api called");
    setapiData_3(await fetchData_3());
    // console.log(apiData);
  }

  const search = () => {
    var myarray2 = [];
    if (props.inputValue == "") {
      setTableresponse(false);
    } else {
      apiData_3.filter((e) => {
        let subzonefilterValue = props.inputValue.toString().toUpperCase();
        let subzoneTableText = e.thesubzoneName.toString().toUpperCase();

        if (subzonefilterValue != "") {
          if (subzoneTableText.indexOf(subzonefilterValue) > -1) {
            myarray2.push(e);
            setTableresponse(true);
            setSearchedValue(myarray2);
          }
        }
      });
    }
  };
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
   // removesubzone(thezoneId)
  };


  // // CAlling search function on every change of input value
  useEffect(() => {
    search();
  }, [props]);

  return (
    <>
      {console.log(props.inputValue)}

      
      <TableContainer component={Paper} style={{ marginBottom: "80px" }}>
        <div style={{ height: "300px" }}>
          <div style={myComponent}>
            {tableresponse == true ? (
              <Table sx={{ minWidth: 800 }} aria-label="customized table">
                <TableHead className="table-row">
                  <TableRow>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>
                      Technician
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>
                      Zone
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>
                      Subzone
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>
                      Region
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>
                      City
                    </StyledTableCell>
                    <StyledTableCell align="center" style={{ fontSize: 17 }}>
                      Action
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {apiData_3.map((row) => (
                    <StyledTableRow key={row.teamleader}>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row.technicianName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.zoneName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.thesubzoneName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.regionName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.cityName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Row>
                          <div className="form-outline mb-4 col-lg-5">
                            <Button
                              style={{ marginBottom: "8px" }}
                              onClick={() =>
                                handleOpen(
                                  row.subzoneName,
                                  row.regionID,
                                  row.cityID,
                                  row.zoneID
                                )
                              }
                            >
                              <PencilSquare color="white" size={20} />
                            </Button>
                          </div>
                          <div className="form-outline mb-4 col-lg-4">
                            <Button
                              //onClick={() =>unassignsubzonefortechnician(row.subzoneName) }
                              onClick={() => openPopup(row.subzoneName)}
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
                  ))}
                </TableBody>
              </Table>
            ) : (
              <>
                <Table sx={{ minWidth: 800 }} aria-label="customized table">
                  <TableHead className="table-row">
                    <TableRow>
                      <StyledTableCell align="center" style={{ fontSize: 17 }}>
                        Technician
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
                      <StyledTableCell
                        align="center"
                        style={{ fontSize: 17, margin: "auto" }}
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
                  <CircularProgress disabled={true} color="warning" size={40} />
                </Box>
              </>
            )}
          </div>
        </div>

       
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h4 style={{ marginBottom: "10%", marginLeft: "5%" }}>
              Assign Technician On Subzone
            </h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <h5 style={{ paddingLeft: "6%" }}>Technician Name</h5>
            </div>

            <h4 style={{ fontSize: 15, paddingLeft: "6%", marginBottom: "1%" }}>
              {technicianame}
            </h4>

            <div>
              <h5 style={{ paddingLeft: "6%" }}>Region</h5>
            </div>

            <FormControl fullWidth>
              <InputLabel
                style={{ fontSize: 12 }}
                id="demo-simple-select-label"
              >
                Region
              </InputLabel>
              <Select
                style={{ fontSize: 12 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required="true "
                label="Region"
                defaultValue={defaultselectedregion}
                onChange={(e) => getCities(e.target.value)}
                // value= {value}
              >
                {regionresponse ? (
                  apiData_2.map((info) => (
                    <MenuItem style={{ fontSize: 12 }} value={info.regionID}>
                      {info.regionName}
                    </MenuItem>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "2em",
                    }}
                  >
                    <CircularProgress
                      disabled={true}
                      color="warning"
                      size={20}
                    />
                  </Box>
                )}
              </Select>
            </FormControl>

            <div>
              <h5 style={{ paddingLeft: "6%" }}>City</h5>
            </div>

            <FormControl fullWidth>
              <InputLabel
                style={{ fontSize: 12 }}
                id="demo-simple-select-label"
              >
                City
              </InputLabel>
              <Select
                style={{ fontSize: 12 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required="true "
                label="City"
                // value= {defaultselectedcity}
                defaultValue={defaultselectedcity}
                onChange={(e) => getZones(e.target.value)}
              >
                {/* {apiData_1.map((info) => (
                      <MenuItem value={info.cityID}>{info.cityName}</MenuItem>
                    ))} */}
                {cityresponse == true ? (
                  cities.map((info) => (
                    <MenuItem style={{ fontSize: 12 }} value={info.cityID}>
                      {info.cityName}
                    </MenuItem>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "2em",
                    }}
                  >
                    <CircularProgress
                      disabled={true}
                      color="warning"
                      size={20}
                    />
                  </Box>
                )}
              </Select>
            </FormControl>

            <div>
              <h5 style={{ paddingLeft: "6%" }}>zones</h5>
            </div>

            <FormControl fullWidth>
              <InputLabel
                style={{ fontSize: 12 }}
                id="demo-simple-select-label"
              >
                Zone
              </InputLabel>
              <Select
                style={{ fontSize: 12 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required="true "
                label="Region"
                // value= {defaultselectedzone}
                defaultValue={defaultselectedzone}
                onChange={(e) => getSubZones(e.target.value)}
              >
                {/* {apiData_zones.map((info) => (
                      <MenuItem value={info.zoneID}>{info.zoneName}</MenuItem>
                    ))} */}
                {zoneresponse == true ? (
                  zones.map((info) => (
                    <MenuItem style={{ fontSize: 12 }} value={info.zoneID}>
                      {info.zoneName}
                    </MenuItem>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "2em",
                    }}
                  >
                    <CircularProgress
                      disabled={true}
                      color="warning"
                      size={20}
                    />
                  </Box>
                )}
              </Select>
            </FormControl>
            <div>
              <h5 style={{ paddingLeft: "6%" }}>Enter Subzone</h5>
            </div>

            <FormControl fullWidth>
              <InputLabel
                style={{ fontSize: 12 }}
                id="demo-simple-select-label"
              >
                SubZone
              </InputLabel>
              <Select
                style={{ fontSize: 12 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                required="true "
                label="Region"
                // value= {defaultselectedsubzone}
                defaultValue={defaultselectedsubzone}
                onChange={(event) => setSubzone(event.target.value)}
              >
                {subzoneresponse == true ? (
                  subzones.map((info) => (
                    <MenuItem style={{ fontSize: 12 }} value={info.subzoneID}>
                      {info.subzoneName}
                    </MenuItem>
                  ))
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "2em",
                    }}
                  >
                    <CircularProgress
                      disabled={true}
                      color="warning"
                      size={20}
                    />
                  </Box>
                )}
              </Select>
            </FormControl>

            <div>
              <h5 style={{ paddingLeft: "6%" }}>Location Details</h5>
            </div>

            <TextField
              inputProps={{ style: { fontSize: 12 } }} // font size of input text
              InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
              className="form-field"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Location Details"
              onChange={(event) => setDetails(event.target.value)}
              value={details}
            />

            <div class="form-outline mb-4 col-lg-4" style={{ marginTop: "5%" }}>
              <Button onSubmit={handleSubmit} type="submit">
                Save
              </Button>{" "}
            </div>

            <div class="form-outline mb-4 col-lg-4" style={{ marginTop: "5%" }}>
              <Button
                onClick={handleClose}
                as="input"
                type="submit"
                value="Cancel"
              />{" "}
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
