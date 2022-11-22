import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "../App.css";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";

export default function TechSearch(props) {
  const [subzoneInputValue, setsubZoneInputValue] = useState("");
  return (
    <div className="main">
      <div className="row ">
        <div className="form-outline mb-4 col-lg-4">
          {/* <label className="form-label">Subzone</label>
          <div className="search" style={{width:"35%"}}>
            <TextField className="form-field"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Zone"
            />
          </div> */}
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ width: "30%", marginLeft: "8%", marginBottom: "3%" }}
                inputProps={{ style: { fontSize: 12 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Subzone"
                value={subzoneInputValue}
                onChange={(e) => setsubZoneInputValue(e.target.value)}
              />
              <IconButton 
              onClick={() => props.setInputValue(subzoneInputValue)}
              sx={{ border: "4px orange", borderRadius: 10 }}>
                <SearchIcon style={{ fontSize: "20px", color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
        </div>
        <div className="form-outline mb-4 col-lg-4">
          {/* <label className="form-label">Technician Name</label>
          <div className="search" style={{width:"35%"}}>
            <TextField className="form-field"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Technician Name "
              
            
            />

          </div> */}
          {/* <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ width: "30%", marginLeft: "3%", marginBottom: "3%" }}
                inputProps={{ style: { fontSize: 12 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Technician Name"
              />
              <IconButton sx={{ border: "4px orange", borderRadius: 10 }}>
                <SearchIcon style={{ fontSize: "20px", color: "orange" }} />
              </IconButton>
            </Grid>
          </div> */}
        </div>
      </div>
    </div>
  );
}
