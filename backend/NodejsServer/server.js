const express = require("express");
const dotenv = require("dotenv");
const teamleadersRoutes = require("./routes/teamleadersRoutes");
const regionsRoutes = require("./routes/regionsRoutes");
const zonesRoutes = require("./routes/zonesRoutes");
const users_routes = require("./routes/users_routes");
const terminals_routes = require("./routes/terminals_routes");

var multer = require('multer');
var upload = multer();
var bodyParser = require('body-parser');






const app = express();
dotenv.config();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors()); // Use this after the variable declaration

app.use(express.json()); // tell the server to accept the json data from frontend

// TEAM LEADERS
app.use("/teamleaders", teamleadersRoutes);

//REGIONS
app.use("/regions", regionsRoutes);

app.use("/users", users_routes);


app.use("/terminals", terminals_routes);

//ZONES
app.use("/zones", zonesRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
