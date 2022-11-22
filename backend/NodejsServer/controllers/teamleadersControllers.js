const expressAsyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const axios = require("axios");

const showTeamLeaderList = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    .get("http://127.0.0.1:1143/teamleaderlist_TabularData_API")
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

const showspecificteamleadertabulardata = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/specific_teamleaderlist_TabularData_API/"+req.params['teamleaderid'])
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


const showspecifictechniciantabulardata = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/technicianlist_TabularData_API/"+req.params['technicianID'])
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





const showRegisteredTeamLeaders = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    .get("http://127.0.0.1:1143/get_all_teamleaderslist")
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


const showRegisteredtecnicianslist= expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    .get("http://127.0.0.1:1143/technicianlist_TabularData_API")
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



const showAllTechnicicans= expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    .get("http://127.0.0.1:1143/get_all_technicianslist")
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


const update_teamleaders = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/updateZoneforteamleader/"+req.params['name']+"/"+req.params['zone']+"/"+req.params['currentzone'])
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

const assignzonetoteamleaders = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/assignZonetoteamleader/"+req.params['name']+"/"+req.params['zone'])
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

const update_technician = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/technician-update/"+req.params['name']+"/"+req.params['subzone'])
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



const removezonefromteamleader = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/deleteassignedteamleaderfromzone/"+req.params['zoneID'])
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


const createnewteamleader = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/createnewteamleader/"+req.params['teamleadername'])
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


const createnewtechnician = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/createnewtechnician/"+req.params['technicianname'])
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



const getresourcetable = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/getresourcetabulardata")
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


// deleteresource
const deleteresource = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/deleteresource/"+req.params['resourceID']+"/type/"+req.params['resourceType'])
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

const updateresource = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/updateresource/"+req.params['resourceID']+"/type/"+req.params['resourceType']+"/resourceName/"+req.params['resourceName'])
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

module.exports = { showTeamLeaderList, showRegisteredTeamLeaders,showRegisteredtecnicianslist,showAllTechnicicans,update_teamleaders,showspecificteamleadertabulardata,update_technician ,showspecifictechniciantabulardata,removezonefromteamleader,assignzonetoteamleaders,createnewteamleader,createnewtechnician,getresourcetable,deleteresource,updateresource};
