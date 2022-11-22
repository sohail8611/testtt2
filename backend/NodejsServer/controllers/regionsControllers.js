const expressAsyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const axios = require("axios");

const showRegionsList = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    .get("http://127.0.0.1:1143/get_all_region_list")
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

const showCities = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    .get("http://127.0.0.1:1143/get_all_cities_in_region/1	")
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

const showZonesList = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    .get("http://127.0.0.1:1143/get_all_zones_list")
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



//    http://localhost:8000/regions/regionid/1
const showCitiesinRegion = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/get_all_cities_in_region/"+req.params['regionid'])
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





//    http://localhost:8000/regions/cityid/2
const showZonesinCity = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143//get_all_zones_in_city/"+req.params['cityid'])
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




//    http://localhost:8000/regions/zoneid/2
const showSubzonesinZone = expressAsyncHandler(async (req, res) => {
  // console.log("Working");
  var myData = [];
  await axios
    
    .get("http://127.0.0.1:1143/get_all_subzones_in_zones/"+req.params['zoneid'])
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



module.exports = { showRegionsList, showCities,showZonesList,showCitiesinRegion,showZonesinCity,showSubzonesinZone };
