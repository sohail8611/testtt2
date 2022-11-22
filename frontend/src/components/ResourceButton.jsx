import "./TechListButton.css";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import { useState } from 'react';
import { getDisplayName } from "@mui/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";

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
  let nodejsip = "http://67.205.163.34:8000";

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = React.useState("");
  const [region, setRegion] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zone, setZone] = React.useState("");
  const [details, setDetails] = React.useState("");

  const [zoneresponse, setZoneresponse] = useState(false);
  const [cityresponse, setCityresponse] = useState(false);
  const [regionresponse, setRegionresponse] = useState(false);
  const [teamleaderresponse, setTeamleaderresponse] = useState(false);
  const [citydisabled, setCitydisabled] = useState(true);
  const [zonedisabled, setZonedisabled] = useState(true);
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);
  const [resource, setResource] = React.useState("");
  const [resourcename, setResourcename] = React.useState("");
  const [thefile, setTheFile] = React.useState(false);

  const handleChange = (event) => {
    setResource(event.target.value);
    console.log("resourceselectedis:", resource);
  };

  const handleChange_region = (event) => {
    console.log("Region is:", event.target.value);
    setRegion(event.target.value);

    console.log("City is:", event.target.value);
    event.preventDefault();
  };

  const handleChange_city = (event) => {
    console.log("Region is:", event.target.value);
    setCity(event.target.value);

    console.log("City is:", event.target.value);
    event.preventDefault();
  };

  // const handleChange_zone = event => {

  //   console.log('Region is:', event.target.value);
  //   setZone(event.target.value);

  //   console.log('City is:', event.target.value);
  //    event.preventDefault();
  // };

  //API call to get all teamleaders list
  const [apiData_3, setapiData_3] = useState([]);
  useEffect(() => {
    callApi_3();
  }, []);

  async function fetchData_3() {
    var data_3 = [""];
    await axios
      .get(nodejsip + "/regions/zones")
      .then((res) => {
        data_3 = res.data.myData;
      })
      .catch((err) => console.log(err));
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
  const [Loader, setLoader] = useState(false);
  useEffect(() => {
    callApi_2();
  }, []);

  async function fetchData_2() {
    var data_2 = [""];
    setTeamleaderresponse(false);
    await axios
      .get(nodejsip + "/teamleaders/registered")
      .then((res) => {
        setTeamleaderresponse(res.data.success);
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
    setRegionresponse(false);
    await axios
      .get(nodejsip + "/regions/registered")
      .then((res) => {
        data_1 = res.data.myData;
        setRegionresponse(res.data.success);
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

  // //API call  to get all ccities
  //  const [apiData, setapiData] = useState([]);
  //  useEffect(() => {
  //    callApi();
  //  }, [setRegion]);

  //  async function fetchData() {
  //    var data = [""];
  //    await axios
  //      .get("http://localhost:8000/regions/cities")
  //      .then((res) => {
  //        data = res.data.myData;
  //      })
  //      .catch((err) => console.log(err));
  //    return data;
  //  }
  //  var myData;
  //  async function callApi() {
  //    // console.log("Call api called");
  //    setapiData(await fetchData());
  //    // console.log(apiData);
  //  }

  const handleSubmit = (event) => {
    console.log("handleSubmit ran");
    event.preventDefault();
    // 👇️ access input values here
    // console.log('Name 👉️', name);
    // console.log('Zone👉️', zone);
    // console.log('Details👉️', details);
    // console.log("thefileis:",thefile)

    // if (thefile != false){////////////

    //   console.log("sending form data cuz file is selected")
    //   const file = thefile[0];
    //   console.log("selectedfile:",file)
    //   const myformData = new FormData();

    //   myformData.append('file',file)

    //   const config = {
    //       headers: {
    //           "Contetnt-Type":"multipart/form-data"
    //       }
    //   };

    //   console.log("myformDatais:",myformData.get('file'))

    //   axios({
    //     method: 'post',
    //     url: 'http://localhost:8000/terminals/post_excel_file_for_bulkofresources',
    //     data: myformData,
    //     headers: {
    //         'Content-Type': `multipart/form-data`,
    //     },
    // });

    // } ////////////

    console.log(resource);

    if (resource == 2) {
      console.log("resourceis2");

      if (thefile != false) {
        ////////////

        console.log("sending technician");
        const file = thefile[0];
        console.log("selectedfile:", file);
        const myformData = new FormData();

        myformData.append("file", file);

        const config = {
          headers: {
            "Contetnt-Type": "multipart/form-data",
          },
        };

        console.log("myformDatais:", myformData.get("file"));

        axios({
          method: "post",
          url: "http://67.205.163.34:8000/terminals/post_excel_file_for_bulkofresources_technicians",
          data: myformData,
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }).then(setTheFile(false));
      } ////////////

      let myurl = nodejsip + "/teamleaders/createnewtechnician/" + resourcename;

      axios.get(myurl).then((res) => {
        console.log(res);
        console.log(res.data);
        console.log("technician resource selected");
      });
    } else {
      console.log("elseblockc");
      if (thefile != false) {
        ////////////

        console.log("sending teamleaders");
        const file = thefile[0];
        console.log("selectedfile:", file);
        const myformData = new FormData();

        myformData.append("file", file);

        const config = {
          headers: {
            "Contetnt-Type": "multipart/form-data",
          },
        };

        console.log("myformDatais:", myformData.get("file"));

        axios({
          method: "post",
          url: "http://67.205.163.34:8000/terminals/post_excel_file_for_bulkofresources",
          data: myformData,
          headers: {
            "Content-Type": `multipart/form-data`,
          },
        }).then(setTheFile(false));
      } ////////////

      let myurl = nodejsip + "/teamleaders/createnewteamleader/" + resourcename;
      axios.get(myurl).then((res) => {
        console.log(res);
        console.log(res.data);
        console.log("teamleader resource selected");
      });
    }

    // console.log("theurlsnow", myurl)

    // 👇️ clear all input values in the form
    setName("");
    setCity("");
    setRegion("");
    setZone("");
    setDetails("");
    setOpen(false);
    window.location.reload(false);
  };

  return (
    <>
      <div>
        <div class="row">
          <div class="col-12 col-md-8" style={{ marginTop: "10%" }}>
            {" "}
            <h3 className="heading">Add Resource</h3>
          </div>
          {sessionStorage.getItem("manageZones") == "true" ? (
            <div class="col-6 col-md-2" style={{ marginTop: "10%" }}>
              <Button onClick={handleOpen}>Assign Resource</Button>
            </div>
          ) : (
            <>
              <div class="col-6 col-md-2" style={{ marginTop: "10%" }}>
                <Button disabled={true} onClick={handleOpen}>
                  Assign Team Leader
                </Button>
              </div>
            </>
          )}
        </div>

        {/* <Button onClick={handleOpen} style={{ marginTop: "10%" }}>Assign Team Leader</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div>
              <h4 style={{ marginBottom: "10%", marginLeft: "5%" }}>
                Add Resorce
              </h4>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <h5 style={{ paddingLeft: "6%" }}>Resource Type</h5>
              </div>

              <li className="forMenu">
                <FormControl fullWidth>
                  <InputLabel
                    style={{ fontSize: 12 }}
                    id="demo-simple-select-label"
                  >
                    Resource Type
                  </InputLabel>
                  <Select
                    style={{ fontSize: 12 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={resource}
                    label="Resource Type"
                    onChange={handleChange}
                  >
                    <MenuItem style={{ fontSize: 12 }} value={1}>
                      Team Leader
                    </MenuItem>
                    <MenuItem style={{ fontSize: 12 }} value={2}>
                      Technician
                    </MenuItem>
                  </Select>
                </FormControl>
              </li>

              <div>
                <h5 style={{ paddingLeft: "6%" }}>Resource Name</h5>
              </div>

              <li className="forMenu">
                <FormControl fullWidth>
                  <TextField
                    inputProps={{ style: { fontSize: 12 } }} // font size of input text
                    InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                    className="form-field"
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    label="Resource Name"
                    onChange={(event) => setResourcename(event.target.value)}
                    value={resourcename}
                  />
                </FormControl>
              </li>

              {/* <div>
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
  
/> */}

              <div>
                <h5 style={{ paddingLeft: "6%" }}>Upload Bulk Of Resources</h5>
              </div>

              <div
                class="form-outline mb-4 col-lg-1"
                style={{ marginTop: "2%" }}
              >
                <input
                  type={"file"}
                  id={"csvFileInput"}
                  accept={".csv"}
                  onChange={(e) => setTheFile(e.target.files)}
                />
              </div>

              <div
                class="form-outline mb-4 col-lg-3"
                style={{ marginTop: "15%" }}
              >
                <Button onSubmit={handleSubmit} type="submit">
                  Save
                </Button>{" "}
              </div>

              <div
                class="form-outline mb-4 col-lg-4"
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
    </>
  );
}
