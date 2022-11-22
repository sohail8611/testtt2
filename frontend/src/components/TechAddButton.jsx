
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Form, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Modal from '@mui/material/Modal';
import { Button } from 'react-bootstrap';
import Component from './map';



const mapStyles = {
  width: '100%',
  height: '100%',
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div >
        
      <div class="row">
  <div class="col-12 col-md-8"   style={{ marginTop: "10%" }}> <h3 className="heading">Technician </h3></div>
  <div class="col-6 col-md-2"   style={{ marginTop: "10%" }}><Button onClick={handleOpen}  >Add Subzone</Button></div>
</div>
      {/* <Button onClick={handleOpen} style={{ marginTop: "10%" }} >Add Subzone</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >




        <div className="App">

          <div id="floating-panel">
            <div class="form-outline mb-4 col-lg-2" >
              <Button  >Zone</Button>
            </div>
            <div class="form-outline mb-4 col-lg-4" >
              <Button  >Subzone</Button>
            </div>
            <div class="form-outline mb-4 col-lg-4" >
            <Button  >Delete</Button>
          </div>
          </div>



          <  Component />
        </div>







      </Modal >
    </div >

  );
}
