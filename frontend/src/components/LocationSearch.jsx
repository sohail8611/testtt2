import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@mui/material";
import Grid from "@material-ui/core/Grid";

export default function LocSearch(props) {
  // get the value of input field
  const [zoneInputValue, setZoneInputValue] = useState("");

  // Clearing the input text field and calling clear function
  function clearInput() {
    setZoneInputValue(" ");
    props.clearSearch();
  }
  return (
    <div className="main">
      <div class="row justify-content-start">
        <div class="form-outline mb-4">
          {/* <label className="form-label">Search Location</label> */}
          {/* <div className="search" style={{ width: "12%" }}>
            <TextField
              className="form-field"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Enter Zone"
              value={zoneInputValue}
              onChange={(e) => setZoneInputValue(e.target.value)}
       
              }}
            />

            <Button onClick={() => clearInput()}>Clear Search</Button>
          </div> */}
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ width: "12%", marginLeft: "3%" }}
                className="form-field"
                inputProps={{ style: { fontSize: 12 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                id="outlined-basic"
                variant="outlined"
                label="Zone"
                value={zoneInputValue}
                onChange={(e) => setZoneInputValue(e.target.value)}
              />
              <IconButton
                onClick={() => props.setInputValue(zoneInputValue)}
                sx={{ border: "4px orange", borderRadius: 10 }}
              >
                <SearchIcon style={{ fontSize: "20px", color: "orange" }} />
              </IconButton>
            </Grid>
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
