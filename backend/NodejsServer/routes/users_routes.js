const express = require("express");
const router = express.Router();

const { getPermissions } = require("../controllers/usersRoutesController");

// ## Return all zones under the city . where '1' represent cityID . If we provide cityID in the end it will
//    return all the zones that are in that city.
router.route("/get_permissions").get(getPermissions);


module.exports = router;
