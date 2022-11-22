const express = require("express");
const { readExcelFile,readbulkofresourcesexcel,readbulkofresourcestechnicians } = require("../controllers/readExcelFile");
const router = express.Router();

const {
  getterminalstable,
} = require("../controllers/terminalsRoutesController");

// ## Return all zones under the city . where '1' represent cityID . If we provide cityID in the end it will
//    return all the zones that are in that city.
router.route("/get_terminals_table").get(getterminalstable);
router.route("/post_excel_file").post(readExcelFile);

//post excel file for add bulk of resources
router.route("/post_excel_file_for_bulkofresources").post(readbulkofresourcesexcel);

router.route("/post_excel_file_for_bulkofresources_technicians").post(readbulkofresourcestechnicians);
module.exports = router;
