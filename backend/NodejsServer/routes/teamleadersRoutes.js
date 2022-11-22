const express = require("express");
const router = express.Router();

const {
  showTeamLeaderList,
  showRegisteredTeamLeaders,
  showRegisteredtecnicianslist,
  showAllTechnicicans,
  update_teamleaders,
  showspecificteamleadertabulardata,
  update_technician,
  showspecifictechniciantabulardata,
  removezonefromteamleader,
  assignzonetoteamleaders,
  createnewteamleader,
  createnewtechnician,
  getresourcetable,
  deleteresource,
  updateresource
} = require("../controllers/teamleadersControllers");

// return list of team leaders with their respective(assigned) zone city and region
router.route("/list").get(showTeamLeaderList);
router.route("/name/:name/zone/:zone/currentzone/:currentzone").get(update_teamleaders);
router.route("/name/:name/zone/:zone").get(assignzonetoteamleaders);

router.route("/updatetechnician/name/:name/subzone/:subzone").get(update_technician);
// Return all team leaders registered in database
router.route("/registered").get(showRegisteredTeamLeaders);
router.route("/removezonefromteamleader/zoneID/:zoneID").get(removezonefromteamleader);

router.route("/technicianslist").get(showRegisteredtecnicianslist);

router.route("/allTechniciansList").get(showAllTechnicicans);
router.route("/teamleaderid/:teamleaderid").get(showspecificteamleadertabulardata);
router.route("/technicianID/:technicianID").get(showspecifictechniciantabulardata);


router.route("/createnewteamleader/:teamleadername").get(createnewteamleader);
router.route("/createnewtechnician/:technicianname").get(createnewtechnician);
router.route("/getresourcetable").get(getresourcetable);


router.route("/deleteresource/resourceID/:resourceID/resourceType/:resourceType").get(deleteresource);
router.route("/updateresource/resourceID/:resourceID/resourceType/:resourceType/resourceName/:resourceName").get(updateresource);

// http://127.0.0.1:1143/getresourcetabulardata/

module.exports = router;
