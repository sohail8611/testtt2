const expressAsyncHandler = require("express-async-handler");
const res = require("express/lib/response");
const axios = require("axios");
var request = require('request');

//to read data inside excel file
const fs = require("fs");
const { parse } = require("csv-parse");




//to get file here
const multer = require('multer');
const { json } = require("body-parser");
const upload = multer({dest: 'public/uploads/'}).single('file');



const readExcelFile = expressAsyncHandler(async (req, res) => {
  dataArr=req.body[0]
  lenofdataArr=dataArr.length
  console.log("firstdata:",req.body)
  let datastring = ""
  for (let i = 0; i < lenofdataArr; i++) {
    datastring = datastring + "('" + dataArr[i]["merchantName"]+"','"+dataArr[i]["product"]+"','"+dataArr[i]["active"]+"','"+dataArr[i]["mcc"]+"','"+dataArr[i]["merchantID"]+"','"+dataArr[i]["posType"]+"'),"
  }
  console.log("datastring:",datastring)

  request.post(
    'http://127.0.0.1:1143/uploadbulkofterminals',
    { json: { datastring: datastring } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
    }
);

  // console.log(dat)
  console.log(dataArr)
  console.log(lenofdataArr)

});




const readbulkofresourcesexcel = expressAsyncHandler(async (req, res) => {
  console.log("teamleadersresourcesCALLED")
  upload(req,res, (err) => {
    const file = req.file
    let datastring = ""
    var data = fs.readFileSync(file['path'], "utf8")

    data = data.split("\r\n")

    for (let i=1;i<data.length;i++){
     datastring = datastring + "('" + data[i]+"'),"
    }
    
    //sending th 
    console.log("datastringsending:",datastring)
    request.post(
      'http://127.0.0.1:1143/uploadbulkofteamleaders',
      { json: { datastring: datastring } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body);
          }
      }
    
  );

   

  })
  
 
  
});





const readbulkofresourcestechnicians = expressAsyncHandler(async (req, res) => {
  console.log("technicianresourcesCALLED")
  upload(req,res, (err) => {
    const file = req.file
    let datastring = ""
    var data = fs.readFileSync(file['path'], "utf8")

    data = data.split("\r\n")

    for (let i=1;i<data.length;i++){
     datastring = datastring + "('" + data[i]+"'),"
    }
    
    //sending th 
    console.log("datastringsending:",datastring)
    request.post(
      'http://127.0.0.1:1143/uploadbulkoftechnicians',
      { json: { datastring: datastring } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body);
          }
      }
  );

   

  })
  
 
  
});


module.exports = { readExcelFile,readbulkofresourcesexcel,readbulkofresourcestechnicians };
