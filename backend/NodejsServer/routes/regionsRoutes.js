const express = require("express");
const router = express.Router();

const {
  showRegionsList,
  showCities,
  showZonesList,
  showCitiesinRegion,
  showZonesinCity,
  showSubzonesinZone,

} = require("../controllers/regionsControllers");


// ## Return all regions list registered in database
router.route("/registered").get(showRegionsList);

// ## Returns all cities under the region .where '1' represent regionID. if we provide region ID in the end
//    will return all cities list that are in that region
router.route("/cities").get(showCities);

router.route("/zones").get(showZonesList);


router.route("/regionid/:regionid").get(showCitiesinRegion);
router.route("/cityid/:cityid").get(showZonesinCity);
router.route("/zoneid/:zoneid").get(showSubzonesinZone);

module.exports = router;
