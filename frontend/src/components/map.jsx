
import React from "react";
import { Button} from 'react-bootstrap';
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GoogleMap, DrawingManager, Polygon } from "@react-google-maps/api";
const defaultLocation = { lat: 21.510716840303072, lng: 39.173123103145684 };

const options = {
  zoomControlOptions: {
    position:window.google.maps.ControlPosition.RIGHT_CENTER// 'right-center' ,
    // ...otherOptions
  }
}
const style = {
  position: "fixed",
  top: "42%",
  left: "45%",
  transform: "translate(-50%, -50%)",
   width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function getPaths(polygon, localThis) {

  var polygonBounds = polygon.getPath();
  var bounds = [];


  for (var i = 0; i < polygonBounds.length; i++) {
    var point = {
      lat: polygonBounds.getAt(i).lat(),
      lng: polygonBounds.getAt(i).lng()
    };
    bounds.push(point);
  }
  
  // setCreatedpolygon(bounds)
  // data=bounds
  console.log("thebound:", bounds);

  localThis.props.getCoOrdinates(bounds)
  // console.log("localThis:", localThis);
}



class Component extends React.Component{
  state={
    path1:this.props.zonePolygons, //for plotting all zones or a single zone .depending on location tyoe selection
 
 
 path2: this.props.subzonepolygons == undefined ? [] : this.props.subzonepolygons //for plotting subzones of a selected zone 
  } 
 constructor(props) {
    super(props);
   
   
    this.previosOverlay = null
    this.handleOverlayComplete = this.handleOverlayComplete.bind(this)
   
  };
  onMapLoad = _map => { };
  handleOverlayComplete(e) {
    if(this.previosOverlay){
      this.previosOverlay.setMap(null);
    }
    this.previosOverlay = e.overlay
  }
  

  render() {
    return (
     
      <Box sx={style}>
      
      <div>
     
      <GoogleMap
      
      center={defaultLocation}   
      options={options}
      zoom={10}
      onLoad={map => this.onMapLoad(map)}
    
     mapContainerStyle={{ height: "420px", width: "750px" }}
      >
          
        {
         
         this.state.path1.map((map, _index) =>
                       <Polygon
                         draggable
                         path={map}
                       />)
         }
                   {
                     this.state.path2.map((map, _index) =>
                       <Polygon
                         draggable
                         path={map}
                       />)
             }
         
        <DrawingManager
         options={{
          drawingControl: true,

          drawingControlOptions: {
            style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [window.google.maps.drawing.OverlayType.POLYGON]

          },
        
          polygonOptions: {
            fillColor: "#FF0000",
            fillOpacity: 0.35,
            strokeWeight: 2,
            strokeOpacity: 0.8,
            strokeColor: "#FF0000",
            clickable: true,
            editable: false,
            geodesic: false,
            visible: true,
            zIndex: 1,

          }
        }}
          onOverlayStart
          onOverlayComplete={this.handleOverlayComplete}
          onPolygonComplete={(value) => console.log(getPaths(value, this))
          }
        />
       
      </GoogleMap>
      </div>
      </Box>
     
     
     
    );
  }
}

export default Component;
