import "./TechListButton.css"

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { useState, useRef, handleSubmit, handleChange } from "react";
import Form from "react-bootstrap/Form";
import Papa from "papaparse";
import { Upload } from "react-bootstrap-icons";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import * as XLSX from "xlsx";

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

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [add, setadd] = React.useState("");
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const [regionresponse, setRegionresponse] = useState(false);
  const [apiDataOfAllRegions, setapiDataOfRegions] = useState([]);
  let baseUrl = "http://67.205.163.34:8000";

  const [name, setName] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zone, setZone] = React.useState("");
  const [subZone, setSubZone] = React.useState("");
  const [details, setDetails] = React.useState("");

  const [zoneresponse, setZoneresponse] = useState(false);
  const [cityresponse, setCityresponse] = useState(false);
  const [teamleaderresponse, setTeamleaderresponse] = useState(false);

  const [citydisabled, setCitydisabled] = useState(true);
  const [zonedisabled, setZonedisabled] = useState(true);

  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const headerKeys = Object.keys(Object.assign({}, ...array));

  //  GET CITIES
  const getCities = (region) => {
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
    setCity(city);
    setZonedisabled(false);
    let myurl = baseUrl + "/regions/cityid/" + city;
    setZoneresponse(false);
    axios
      .get(myurl)
      .then((res) => {
        //  data = res.data.myData;
        setZoneresponse(res.data.success);
        setZones(res.data.myData["theData"]);
        console.log("zones setting:", zones);
      })
      .catch((err) => console.log(err));
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
    callRegionApi();
  }, []);

  // sending excel file to backend
  const submitFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        // console.log(json);
        setFile([json]);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  //submitting the form

  const submitForm = async () => {
    // console.log(file);
    const res = await fetch(`http://67.205.163.34:8000/terminals/post_excel_file`, {
      method: "POST",
      body: JSON.stringify(file),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // HANDLING ERRORS
      .then((res) => {
        console.log(res.status);
      });
  };
  return (
    <div>
      <div class="row">
        <div class="col-12 col-md-8" style={{ marginTop: "10%" }}>
          {" "}
          <h3 className="heading">Point Of Sale</h3>
        </div>
        <div class="col-6 col-md-2" style={{ marginTop: "10%" }}>
          <Button onClick={handleOpen}>Export POS List</Button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h4 style={{ marginBottom: "10%", marginLeft: "5%" }}>
              Create POS
            </h4>
          </div>

          <div>
            <h5 style={{ paddingLeft: "6%" }}>Region</h5>
          </div>

          <li className="forMenu">
          <FormControl fullWidth>
            <InputLabel style={{ fontSize: 12 }} id="demo-simple-select-label">
              Region
            </InputLabel>
            <Select
              style={{ fontSize: 12 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Region"
              onChange={(e) => getCities(e.target.value)}
            >
              {regionresponse == true ? (
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
                  <CircularProgress disabled={true} color="warning" size={20} />
                </Box>
              )}
            </Select>
          </FormControl>
          </li>

          <div>
            <h5 style={{ paddingLeft: "6%" }}>City</h5>
          </div>

          <li className="forMenu">
          <FormControl fullWidth disabled={citydisabled}>
            <InputLabel style={{ fontSize: 12 }} id="demo-simple-select-label">
              City
            </InputLabel>
            <Select
              style={{ fontSize: 12 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="City"
              onChange={(e) => getZones(e.target.value)}
            >
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
                  <CircularProgress disabled={true} color="warning" size={20} />
                </Box>
              )}
            </Select>
          </FormControl>
          </li>
          <div>
            <h5 style={{ paddingLeft: "6%" }}>Enter Zone</h5>
          </div>

          <li className="forMenu">
          <FormControl fullWidth disabled={zonedisabled}>
            <InputLabel style={{ fontSize: 12 }} id="demo-simple-select-label">
              Zone
            </InputLabel>
            <Select
              style={{ fontSize: 12 }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Zone"
              onChange={(event) => setZone(event.target.value)}
            >
              {zoneresponse ? (
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
                  <CircularProgress disabled={true} color="warning" size={20} />
                </Box>
              )}
            </Select>
          </FormControl>
          </li>

          <div>
            <h5 style={{ paddingLeft: "6%" }}>Enter Subzone</h5>
          </div>

          <TextField
            inputProps={{ style: { fontSize: 12 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
            className="form-field"
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="Enter Subone"
            onChange={(event) => setSubZone(event.target.value)}
          />

          <div>
            <h5 style={{ paddingLeft: "6%" }}>Upload Bulk Of Terminals</h5>
          </div>

          <div class="form-outline mb-4 col-lg-1" style={{ marginTop: "2%" }}>
            <input
              type={"file"}
              id={"csvFileInput"}
              accept={".csv"}
              onChange={submitFile}
            />
          </div>

          <div class="form-outline mb-4 col-lg-3" style={{ marginTop: "20%" }}>
            <Button type="submit" onClick={submitForm}>
              Save
            </Button>{" "}
          </div>

          <div class="form-outline mb-4 col-lg-3" style={{ marginTop: "20%" }}>
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
