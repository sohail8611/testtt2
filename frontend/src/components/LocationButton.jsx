import "./TechListButton.css";

import React, { useState, handleSubmit } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect } from "react";
import Component from "./map";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import CancelIcon from "@material-ui/icons/Cancel";
const mapStyles = {
  width: "100%",
  height: "100%",
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

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const [regionresponse, setRegionresponse] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [add, setadd] = React.useState("");
  const handleChange = (event) => setadd(event.target.value);
  const [map, setMap] = useState(false);
  const [apiDataOfAllRegions, setapiDataOfRegions] = useState([]);
  let baseUrl = "http://67.205.163.34:8000";
  const [showhide, setShowhide] = useState("");
  const [cityresponse, setCityresponse] = useState(false);
  const navigate = useNavigate();
  const [citydisabled, setCitydisabled] = useState(true);
  const [region, setRegion] = React.useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = React.useState("");
  const [zone, setZone] = React.useState("");
  const [zonedisabled, setZonedisabled] = useState(true);
  const [zoneresponse, setZoneresponse] = useState(false);
  const [zones, setZones] = useState([]);
  const [zoneNameText, setZoneNameText] = useState("");
  const [subzonename, setSubzonename] = useState("");


  const [zonePolygons, setZonePolygons] = useState([]);

  const [mapbtndisabledwhentypeiszone, setmapbtndisabledwhentypeiszone] =
    useState(true);
  const [mapbtndisabledwhentypeissubzone, setMapbtndisabledwhentypeissubzone] =
    useState(true);

  const [singlezonePolygon, setsingleZonePolygon] = useState([]);

  const [subzonesinzonepolygons, setSubzoneinZonePolygons] = useState([]);

  const [newlycreatedpolygoncoords, setNewlycreatedpolygoncoords] = useState([]);

  const { zonesGlobalList } = props



  //  GET CITIES
  const getCities = (region) => {
    setmapbtndisabledwhentypeiszone(true);
    setMapbtndisabledwhentypeissubzone(true);
    setCitydisabled(false);
    setRegion(region);
    let myurl = baseUrl + "/regions/regionid/" + region;
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

  //  GET ZONES
  const getZones = (city) => {
    //disable map btn untill got zone or subzone response
    setmapbtndisabledwhentypeiszone(true);
    setMapbtndisabledwhentypeissubzone(true);

    setCity(city);
    setZonedisabled(false);
    let myurl = baseUrl + "/regions/cityid/" + city;
    setZoneresponse(false);
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;
        setZoneresponse(res.data.success);
        // console.log("zoneresponseis:",res.data.success)
        setZones(res.data.myData["theData"]);
        setmapbtndisabledwhentypeiszone(!res.data.success);

        var zoneData = res.data.myData["allzonescoordinates"][0]; //totest
        console.log("thezonedata:", zoneData); //totest

        if (showhide == "1") {
          let myzonesArray = [];
          for (
            let i = 0;
            i < res.data.myData["allzonescoordinates"].length;
            i++
          ) {
            myzonesArray.push(
              JSON.parse(res.data.myData["allzonescoordinates"][i])
            );
          }
          // var parseData = JSON.parse(zoneData)

          console.log("myjsonis:", myzonesArray);
          // console.log("type:", typeof parseData)

          // if (typeof parseData == 'object') {
          // console.log("parseData:", parseData);
          setZonePolygons([...myzonesArray]);
        }
        // else {

        //   console.log("second one selected")
        // }
        // }
      })
      .catch((err) => console.log(err));
  };

  const getSubZones = (selectedzone) => {
    setmapbtndisabledwhentypeiszone(true);
    setMapbtndisabledwhentypeissubzone(true);
    // console.log("selectedzonecoords:", selectedzone.coordinates)
    // console.log("selectedzoneid:", selectedzone.zoneid)
    setZone(selectedzone.zoneid);
    let singlezonepoly = JSON.parse(selectedzone.coordinates);

    setsingleZonePolygon([[...singlezonepoly]]);

    // console.log("singlezonepolygon",singlezonePolygon)

    let myurl = baseUrl + "/regions/zoneid/" + selectedzone.zoneid;

    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;
        // setsubzoneresponse(res.data.success);
        // setSubZones(res.data.myData)
        // console.log("mysubzonedata",res.data.myData["theData"])

        let mysubzonesArray = [];
        for (
          let i = 0;
          i < res.data.myData["allsubzonescoordinates"].length;
          i++
        ) {
          mysubzonesArray.push(
            JSON.parse(res.data.myData["allsubzonescoordinates"][i])
          );
        }
        setSubzoneinZonePolygons([...mysubzonesArray]);
        setMapbtndisabledwhentypeissubzone(!res.data.success);
        console.log("subzoneresdata", res.data.success);
        console.log("singlezone:", singlezonePolygon);
        console.log("subzonesactualrr:", subzonesinzonepolygons);
      })
      .catch((err) => {
        console.log(err);
        console.log("erroroccured");
        setMapbtndisabledwhentypeissubzone(false);
      });

    // console.log("")
  };
  // // // // // // // // // // //  GET the data from API of REGIONS
  async function fetchDataOfRegions() {
    var data_1 = [""];
    setRegionresponse(false);
    await axios
      .get(baseUrl + "/regions/registered")
      .then((res) => {
        data_1 = res.data.myData;
        setRegionresponse(res.data.success);
      })
      .catch((err) => console.log(err));
    return data_1;
  }

  async function callRegionApi() {
    setapiDataOfRegions(await fetchDataOfRegions());
  }

  useEffect(() => {
    console.log("insideuseeffect:", zonesGlobalList)
    var data = {
      coords: "hello woorld i am coords",
    };
    callRegionApi();
    fetch(baseUrl + "/zones/createnewzone", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    })
      .then(function (response) {
        return response.json();
      })
      .catch((error) => console.log(error));
  }, [zonesGlobalList]);

  const handleshowhide = (event) => {
    setmapbtndisabledwhentypeiszone(true);
    setMapbtndisabledwhentypeissubzone(true);

    const getuser = event.target.value;
    setShowhide(getuser);
  };

  const getCoOrdinates = (coOrdinates) => {
    console.log("coOrdinates in Location Button:", coOrdinates);
    setNewlycreatedpolygoncoords(coOrdinates);
  };

  const savethecreatedzoneorsubzone = () => {
    if (showhide === "1") {
      console.log("save pressed");

      var data = {
        coordinates: newlycreatedpolygoncoords,
        cityID: city,
        zoneNameText: zoneNameText,
      };
      console.log("thedata:", data);

      var theurltocreatezoneorsubzone = baseUrl + "/zones/createnewzone";


      console.log("hussain")
      console.log(zonesGlobalList)
      console.log(data.zoneNameText)

      let zoneFind = zonesGlobalList.find((item) => item === data.zoneNameText)

      if (zoneFind != undefined){
        return
      }
      console.log("zoneFind:", zoneFind)

      fetch(theurltocreatezoneorsubzone, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      })
        .then(function (response) {
          window.location.reload(false);
          return response.json();
          
        })
        .catch((error) => console.log(error));

        
    } else {
      // console.log("save pressed else")
      var data = {
        coordinates: newlycreatedpolygoncoords,
        zoneID: zone,
        subzoneName: subzonename,
        // subzonename: subzonename,
      };
      console.log("thedata:", data);

      var theurltocreatezoneorsubzone = baseUrl + "/zones/createnewsubzone";

      fetch(theurltocreatezoneorsubzone, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      })
        .then(function (response) {
          window.location.reload(false);
          return response.json();
          
        })
        .catch((error) => console.log(error));
    }
    
    setOpen(false)
    
  };

  return (
    <div>
      <div class="row">
        <div class="col-12 col-md-8" style={{ marginTop: "10%" }}>
          {" "}
          <h3 className="heading">Locations</h3>
        </div>
        <div class="col-6 col-md-2" style={{ marginTop: "10%" }}>
          <Button onClick={handleOpen}>Create new Location</Button>
        </div>
      </div>

      {/* <Button onClick={handleOpen} style={{marginTop:"10%"}}>Create New Location</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h4 style={{ marginBottom: "10%", marginLeft: "3%" }}>
              Add New Location{" "}
            </h4>
          </div>

          <div>
            <h5 style={{ paddingLeft: "3%" }}>Location Type</h5>
          </div>

          <li className="forMenu">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Location Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Location Type"
                name="Location Type"
                className="form-field"
                onChange={(e) => handleshowhide(e)}
              >
                <MenuItem value="1">Zone</MenuItem>
                <MenuItem value="2">Subzone</MenuItem>
              </Select>
            </FormControl>
          </li>

          {showhide === "1" && (
            <li className="forMenu">
              <FormControl fullWidth>
                <div>
                  <h5 style={{ paddingLeft: "6%" }}>Region</h5>
                </div>

                {/* <InputLabel style={{ fontSize: 12 }} id="demo-simple-select-label">
                Region
              </InputLabel> */}
                <Select
                  style={{ fontSize: 12 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Region"
                  onChange={(e) => getCities(e.target.value)}
                >
                  {regionresponse === true ? (
                    apiDataOfAllRegions.map((info) => (
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
            </li>
          )}

          {showhide === "1" && (
            <li className="forMenu">
              <FormControl fullWidth disabled={citydisabled}>
                <div>
                  <h5 style={{ paddingLeft: "6%" }}>City</h5>
                </div>
                {/* <InputLabel style={{ fontSize: 12 }} id="demo-simple-select-label">
              City
            </InputLabel> */}
                <Select
                  style={{ fontSize: 12 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="City"
                  onChange={(e) => getZones(e.target.value)}
                >
                  {cityresponse === true ? (
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
            </li>
          )}
          {showhide === "1" && (
            <li className="forMenu">
              <FormControl>
                <div>
                  <h5 style={{ paddingLeft: "3%" }}>Zone</h5>
                </div>
                <div>
                  <Grid className="dflex" item form="maincomponent" xs>
                    <TextField
                      className="form-field"
                      id="outlined-basic"
                      variant="outlined"
                      halfWidth
                      label="Zone"
                      required
                      onChange={(e) => setZoneNameText(e.target.value)}
                    />
                    <IconButton
                      onClick={(event) => setMap(1)}
                      // zoneresponse
                      disabled={mapbtndisabledwhentypeiszone}
                      aria-hidden="true"
                      size="large"
                      aria-label="add"
                      sx={{ border: "4px orange", borderRadius: 10 }}
                    >
                      <AddCircleIcon />
                    </IconButton>
                   
                  </Grid>
                </div>
              </FormControl>
            </li>
          )}

          {showhide === "2" && (
            <li className="forMenu">
              <FormControl fullWidth>
                <div>
                  <h5 style={{ paddingLeft: "6%" }}>Region</h5>
                </div>

                {/* <InputLabel style={{ fontSize: 12 }} id="demo-simple-select-label">
              Region
            </InputLabel> */}
                <Select
                  style={{ fontSize: 12 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Region"
                  onChange={(e) => getCities(e.target.value)}
                >
                  {regionresponse === true ? (
                    apiDataOfAllRegions.map((info) => (
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
            </li>
          )}
          {showhide === "2" && (
            <li className="forMenu">
              <FormControl fullWidth disabled={citydisabled}>
                <div>
                  <h5 style={{ paddingLeft: "6%" }}>City</h5>
                </div>
                {/* <InputLabel style={{ fontSize: 12 }} id="demo-simple-select-label">
              City
            </InputLabel> */}
                <Select
                  style={{ fontSize: 12 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="City"
                  onChange={(e) => getZones(e.target.value)}
                >
                  {cityresponse === true ? (
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
            </li>
          )}
          {showhide === "2" && (
            <li className="forMenu">
              <FormControl fullWidth disabled={zonedisabled}>
                <div>
                  <h5 style={{ paddingLeft: "6%" }}>Enter Zone</h5>
                </div>
                {/* <InputLabel style={{ fontSize: 12 }} id="demo-simple-select-label">
              Zone
            </InputLabel> */}
                <Select
                  style={{ fontSize: 12 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Zone"
                // onChange={(event) => getSubZones(event.target.value)}
                >
                  {/* { "zoneid": info.zoneID, "coordinates": info.coordinates } */}
                  {zoneresponse ? (
                    zones.map((info) => (
                      <MenuItem
                        style={{ fontSize: 12 }}
                        value={info.zoneID}
                        onClick={() =>
                          getSubZones({
                            zoneid: info.zoneID,
                            coordinates: info.coordinates,
                          })
                        }
                      >
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
            </li>
          )}

          {showhide === "2" && (
            <li className="forMenu">
              <FormControl>
                <div>
                  <h5 style={{ paddingLeft: "3%" }}>{subzonename}</h5>
                </div>
                <div>
                  <Grid className="dflex" item form="maincomponent" xs>
                    <TextField
                      className="form-field"
                      id="outlined-basic"
                      variant="outlined"
                      halfWidth
                      label="Subzone"
                      value={subzonename}
                      onChange={(e) => setSubzonename(e.target.value)}
                    />
                    <IconButton
                      onClick={(event) => setMap(1)}
                      //  className="btn_orange"
                      disabled={mapbtndisabledwhentypeissubzone}
                      aria-hidden="true"
                      size="large"
                      aria-label="add"
                      sx={{ border: "4px orange", borderRadius: 10 }}
                    >
                      <AddCircleIcon />
                    </IconButton>
                   
                  </Grid>
                </div>
              </FormControl>
            </li>
          )}

          <div>
            <div class="row">
              {/* <Button type="submit" className="btn_orange" onClick={event => setMap(1)} >  */}

              {/* <Button type="submit" className="btn_orange" onClick={_event => navigate("/testMap")} >  */}
              {/* <div class="" style={{ marginTop: "10%" }}><i class="fa fa-plus" aria-hidden="false"></i></div>
              </Button>  */}
            </div>

            {map ? (
              <>
                {
                  <div className="App">
                    <div id="floating-panel">
                      
                       <IconButton 
                     onClick={(event) => setMap(0)}>
                      <CancelIcon  />
                    </IconButton>
                     
              
                    
          
                    </div>
                  
                    {showhide === "1" && (
                      <Component
                        zonePolygons={zonePolygons}
                        getCoOrdinates={getCoOrdinates}
                      />
                    )}


                    {showhide === "2" && (
                      <Component
                        zonePolygons={singlezonePolygon}
                        subzonepolygons={subzonesinzonepolygons}
                        getCoOrdinates={getCoOrdinates}
                      />
                    )}
                    {/* singlezonePolygon */}
                  </div>
                }
              </>
            ) : (
              <></>
            )}
          </div>

          <div>
            <h5 style={{ paddingLeft: "3%" }}>Location Details</h5>
          </div>

          <TextField
            className="form-field"
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Location Details"
          />

          <div class="form-outline mb-4 col-lg-4" style={{ marginTop: "5%" }}>
            <Button onClick={savethecreatedzoneorsubzone} type="submit">
              Save
            </Button>{" "}
          </div>

          <div class="form-outline mb-4 col-lg-4" style={{ marginTop: "5%" }}>
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
  );
}
