import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import "../App.css";

export default function AddSearch() {

  return (
    <div className="main">


      <div class="row justify-content-start">
        <div class="form-outline mb-5">

          {/* <label className="form-label">Zone</label> */}
          {/* <div className="search" style={{ width: "12%" }}>
          
            <TextField className="form-field"
              id="outlined-basic"
              variant="outlined"
              fullWidth
              label="Zone"
             
            
              
            />
            <IconButton   >
                                    <SearchIcon />
                                    </IconButton>
                                  

          </div> */}
         
         <div  >
                  <Grid className="dflex" item form="maincomponent" xs>
                  
                    <TextField  style={{ width: "12%",marginLeft:"3%",marginBottom:"3%" }}
                    inputProps={{style: {fontSize: 12}}} // font size of input text
                    InputLabelProps={{style: {fontSize: 12}}} // font size of input label
                    className="form-field"
                     id="outlined-basic"
                     variant="outlined"
                     
                     label="Zone"
                    />
                    <IconButton
                      
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

