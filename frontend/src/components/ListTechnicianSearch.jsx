import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import "../App.css";


export default function TechSearch(props) {
  let { setSearchArray } = props;

  // get the value of input field
  const [zoneInputValue, setZoneInputValue] = useState("");
  const [techInputValue, setTechInputValue] = useState("");

  // Clearing the input text field and calling clear function
  function clearInput() {
    setZoneInputValue(" ");
    setTechInputValue(" ");
    props.clearSearch();
  }

  return (
    <div className="main">
      <div className="row ">
        <div className="form-outline mb-4 col-lg-4">
          <div>
            <techserach />
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ width: "30%", marginLeft: "8%" }}
                inputProps={{ style: { fontSize: 12 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Zone"
                value={zoneInputValue}
                onChange={(e) => setZoneInputValue(e.target.value)}
              />
              <IconButton
                onClick={(e) => {
                 
                  props.setInputValue(zoneInputValue);
                  setSearchArray({
                    zonename: zoneInputValue,
                    techname: "",
                  });
                }}
                sx={{ border: "4px orange", borderRadius: 10 }}
              >
                <SearchIcon style={{ fontSize: "20px", color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
          <Button
            style={{ marginLeft: "8%", marginBottom: "2%" }}
            onClick={() => clearInput()}
          >
            Clear Search
          </Button>
        </div>
        <div className="form-outline mb-4 col-lg-4">
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ width: "30%", marginLeft: "3%" }}
                inputProps={{ style: { fontSize: 12 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Technician Name"
                value={techInputValue}
                onChange={(e) => setTechInputValue(e.target.value)}
              />
              <IconButton
                onClick={(e) => {
                  
                  props.setInputValue(techInputValue);
                  setSearchArray({
                    techname: techInputValue,
                    zonename: "",
                  });
                }}
                sx={{ border: "4px orange", borderRadius: 10 }}
              >
                <SearchIcon style={{ fontSize: "20px", color: "orange" }} />
              </IconButton>
            </Grid>
            {}
          </div>
          <Button
            style={{ marginLeft: "3%", marginBottom: "2%" }}
            onClick={() => clearInput()}
          >
            Clear Search
          </Button>
        </div>
      </div>
    </div>
  );
}
