const expressAsyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const axios = require("axios");
var request = require('request');
const showZones = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    .get("http://127.0.0.1:10331//get_all_zones_in_city/1")
    .then((res) => {
      myData = res.data;
      // console.log(myData);
    })
    .catch((err) => console.log(err));

  res.status(200).json({
    success: true,
    myData,
  });
});




const showsubZones = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    .get("http://127.0.0.1:1143/get_all_subzones")
    .then((res) => {
      myData = res.data;
      // console.log(myData);
    })
    .catch((err) => console.log(err));

  res.status(200).json({
    success: true,
    myData,
  });
});


const showtableforspecificzone = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/teamleaderlist_TabularData_API/where/zonename=/"+req.params['zonename'])
    .then((res) => {
      myData = res.data;
      // console.log(myData);
    })
    .catch((err) => console.log(err));

  res.status(200).json({
    success: true,
    myData,
  });
});



const showtableforspecificteamleader = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/teamleaderlist_TabularData_API/where/teamleadername=/"+req.params['teamleadername'])
    .then((res) => {
      myData = res.data;
      // console.log(myData);
    })
    .catch((err) => console.log(err));

  res.status(200).json({
    success: true,
    myData,
  });
});


const getalllocations = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/getalllocations")
    .then((res) => {
      myData = res.data;
      // console.log(myData);
    })
    .catch((err) => console.log(err));

  res.status(200).json({
    success: true,
    myData,
  });
});




const deletesubzone = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/removesubzone/"+req.params['subzoneID'])
    .then((res) => {
      myData = res.data;
      // console.log(myData);
    })
    .catch((err) => console.log(err));

  res.status(200).json({
    success: true,
    myData,
  });
});




const unassignsubzone = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/unassignsubzone/"+req.params['subzoneID']+"/"+req.params['technicianID'])
    .then((res) => {
      myData = res.data;
      // console.log(myData);
    })
    .catch((err) => console.log(err));

  res.status(200).json({
    success: true,
    myData,
  });
});



const replace_currentsubzone = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/updatesubZonefortechnician/"+req.params['name']+"/"+req.params['subzone']+"/"+req.params['currentsubzone'])
    .then((res) => {
      myData = res.data;
      // console.log(myData);
    })
    .catch((err) => console.log(err));

  res.status(200).json({
    success: true,
    myData,
  });
});


const createnewzone = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  console.log("reqbodyis:",req.body["data"])
  var thecoorddata=req.body["data"]
  console.log(thecoorddata)
    
  request.post(
    'http://127.0.0.1:1143/createnewzone',
    { json: { datastring: thecoorddata } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);

  res.status(200).json({
    success: true,
    // myData,
  });
});



const createnewsubzone = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  console.log("reqbodyis:",req.body["data"])
  var thecoorddata=req.body["data"]
  console.log(thecoorddata)
    
  request.post(
    'http://127.0.0.1:1143/createnewsubzone',
    { json: { datastring: thecoorddata } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);

  res.status(200).json({
    success: true,
    // myData,
  });
});





  const updatelocationsubzone = expressAsyncHandler(async (req, res) => {
    // console.log("Working");
    var myData = [];
    await axios
      
      .get("http://127.0.0.1:1143/updatelocationsubzone/"+req.params['subzoneID']+"/"+req.params['updatedsubzoneName'])
      .then((res) => {
        myData = res.data;
        // console.log(myData);
      })
      .catch((err) => console.log(err));
  
    res.status(200).json({
      success: true,
      myData,
    });
  });

module.exports = { showZones,showsubZones,showtableforspecificzone,showtableforspecificteamleader,getalllocations,deletesubzone,unassignsubzone,replace_currentsubzone,createnewzone,createnewsubzone,updatelocationsubzone};
