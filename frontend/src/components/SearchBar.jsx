import { React, useState } from "react";
import TextField from "@mui/material/TextField";

import "../App.css";

export default function AddButton()  {
  return (
    <div className="main">
     <label className="form-label">Zone</label>
      <div className="search">
        <TextField className="form-field"
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Zone"
        />
        
      </div>
      
    
    </div>
    
  );
}

