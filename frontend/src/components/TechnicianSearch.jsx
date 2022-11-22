import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import "../App.css";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";


export default function TechSearch() {
  return (
    <div className="main">

      <div className="row ">
        <div className="form-outline mb-4 col lg-6">
          {/* <label className="form-label">Subzone</label>
          <div className="search">
            <TextField className="form-field"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Zone"
             
            

            />
          </div> */}
            <div  >
                  <Grid className="dflex" item form="maincomponent" xs>
                  
                    <TextField  style={{ width: "12%",marginLeft:"3%" }} className="form-field"
                     id="outlined-basic"
                     variant="outlined"
                     
                     label="Zone"
                    
                    />
                    <IconButton
                       
                      sx={{ border: "4px orange", borderRadius: 10 }}
                     

                    >

                      <SearchIcon style={{fontSize:"20px"}}/>
                    </IconButton>
                    
                   
                  </Grid>
                 
                  </div>


        </div>
        <div className="form-outline mb-4 col lg-6">
          {/* <label className="form-label">Technician Name</label>
          <div className="search">
            <TextField className="form-field"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Team Leader Name"
            
            
            />

        
          </div> */}
            <div  >
                  <Grid className="dflex" item form="maincomponent" xs>
                  
                    <TextField  style={{ width: "12%",marginLeft:"3%" }} className="form-field"
                    inputProps={{style: {fontSize: 12}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 12}}} // font size of input label
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

                      <SearchIcon style={{fontSize:"20px",color:"orange"}}/>
                    </IconButton>
                    
                   
                  </Grid>
                 
                  </div>


        </div>




      </div>
      




    </div>

  );
}

