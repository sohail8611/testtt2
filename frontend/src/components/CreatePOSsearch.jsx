import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import "../App.css";

export default function Search() {
  return (
    <div className="main">
      <div class="row justify-content-start">
        <h3 className="heading" style={{ marginTop: "10%" }}>
          Point Of Sale List
        </h3>

        <div class="form-outline mb-4">
          {/* <label className="form-label">Terminal ID</label>
          <div className="search"  style={{width:'12%'}}>
            <TextField className="form-field"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Terminal ID"
              
            
            />

          </div> */}
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ width: "12%", marginLeft: "3%", marginBottom: "2%" }}
                inputProps={{ style: { fontSize: 12 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 12 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Terminal ID"
              />
              <IconButton sx={{ border: "4px orange", borderRadius: 10 }}>
                <SearchIcon style={{ fontSize: "20px", color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
