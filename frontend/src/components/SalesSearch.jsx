import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";

import "../App.css";

export default function Sales(props) {
  let { setSearchArray } = props;
  const [merchantNameInputValue, setMerchantNameInputValue] = useState("");
  const [midInputValue, setMidInputValue] = useState("");
  const [posTypeInputValue, setPosTypeInputValue] = useState("");
  const [tidInputValue, setTidInputValue] = useState("");
  const [productInputvalue, setproductinputvalue] = useState("");
  const [ibaninputvalue, setibaninputvalue] = useState();
  const [locationinputvalue, setlocationinputvalue] = useState();

  // Clearing the input text field and calling clear function
  function clearInput() {
    setMerchantNameInputValue(" ");
    setTidInputValue(" ");
    setPosTypeInputValue(" ");
    setMidInputValue(" ");
    // setActiveInputValue(" ");
    // setProductInputValue(" ");
    // setMccInputValue(" ");
    props.clearSearch();
  }
  return (
    <div className="main" style={{marginBottom: "10px"}}>
      <div class="row justify-content-start">
        <div class="form-outline mb-4 col-lg-2">
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ marginLeft: "3%" }}
                inputProps={{ style: { fontSize: 9 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 9 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="POS Type"
                value={posTypeInputValue}
                onChange={(e) => setPosTypeInputValue(e.target.value)}
              />
              <IconButton
                onClick={() => {
                  setSearchArray({
                    POSType: posTypeInputValue,
                    Prod: "",
                    IBAN: "",
                    TerminalID: "",
                    MerchantID: "",
                    MerchantListName: "",
                    Location: "",
                  });
                }}
                sx={{ border: "4px orange", borderRadius: 10 }}
              >
                <SearchIcon style={{ color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
        </div>
        <div class="form-outline mb-4 col-lg-2">
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ marginLeft: "3%" }}
                inputProps={{ style: { fontSize: 9 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 9 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Product"
                value={productInputvalue}
                onChange={(e) => setproductinputvalue(e.target.value)}
              />
              <IconButton
                onClick={() => {
                  setSearchArray({
                    POSType: "",
                    Prod: productInputvalue,
                    IBAN: "",
                    TerminalID: "",
                    MerchantID: "",
                    MerchantListName: "",
                    Location: "",
                  });
                }}
                sx={{ border: "4px orange", borderRadius: 10 }}
              >
                <SearchIcon style={{ color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
        </div>
        {/* <div class="form-outline mb-4 col-lg-2">
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ marginLeft: "3%" }}
                inputProps={{ style: { fontSize: 9 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 9 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="IBAN"
                pattern="[0-9]*"
                value={ibaninputvalue}
                onChange={(e) => setibaninputvalue(e.target.value)}
              />
              <IconButton
                onClick={() => {
                  setSearchArray({
                    POSType: "",
                    Prod: "",
                    IBAN: ibaninputvalue,
                    TerminalID: "",
                    MerchantID: "",
                    MerchantListName: "",
                    Location: "",
                  });
                }}
                sx={{ border: "4px orange", borderRadius: 10 }}
              >
                <SearchIcon style={{ color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
        </div> */}

        <div class="form-outline mb-4 col-lg-2">
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ marginLeft: "3%" }}
                inputProps={{ style: { fontSize: 9 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 9 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Terminal ID"
                value={tidInputValue}
                onChange={(e) => setTidInputValue(e.target.value)}
              />
              <IconButton
                onClick={() => {
                  setSearchArray({
                    POSType: "",
                    Prod: "",
                    IBAN: "",
                    TerminalID: tidInputValue,
                    MerchantID: "",
                    MerchantListName: "",
                    Location: "",
                  });
                }}
                sx={{ border: "4px orange", borderRadius: 10 }}
              >
                <SearchIcon style={{ color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
        </div>
        <div class="form-outline mb-4 col-lg-2">
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                inputProps={{ style: { fontSize: 9 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 9 } }} // font size of input label
                style={{ marginLeft: "3%" }}
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Merchant ID"
                value={midInputValue}
                onChange={(e) => setMidInputValue(e.target.value)}
              />
              <IconButton
                onClick={() => {
                  setSearchArray({
                    POSType: "",
                    Prod: "",
                    IBAN: "",
                    TerminalID: "",
                    MerchantID: midInputValue,
                    MerchantListName: "",
                    Location: "",
                  });
                }}
                sx={{ border: "4px orange", borderRadius: 10 }}
              >
                <SearchIcon style={{ color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
        </div>
        <div class="form-outline mb-4 col-lg-2">
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{ marginLeft: "3%" }}
                inputProps={{ style: { fontSize: 9 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 9 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Merchant List Name"
                value={merchantNameInputValue}
                onChange={(e) => setMerchantNameInputValue(e.target.value)}
              />
              <IconButton
                onClick={() => {
                  setSearchArray({
                    POSType: "",
                    Prod: "",
                    IBAN: "",
                    TerminalID: "",
                    MerchantID: "",
                    MerchantListName: merchantNameInputValue,
                    Location: "",
                  });
                }}
                sx={{ border: "4px orange", borderRadius: 10 }}
              >
                <SearchIcon style={{ color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
        </div>

        {/* <div class="form-outline mb-4 col-lg-2">
          <div>
            <Grid className="dflex" item form="maincomponent" xs>
              <TextField
                style={{
                  marginLeft: "3%",
                  marginTop: "4%",
                  marginBottom: "7%",
                }}
                inputProps={{ style: { fontSize: 9 } }} // font size of input text
                InputLabelProps={{ style: { fontSize: 9 } }} // font size of input label
                className="form-field"
                id="outlined-basic"
                variant="outlined"
                label="Location"
                value={locationinputvalue}
                onChange={(e) => setlocationinputvalue(e.target.value)}
              />
              <IconButton
                onClick={() => {
                  setSearchArray({
                    POSType: "",
                    Prod: "",
                    IBAN: "",
                    TerminalID: "",
                    MerchantID: "",
                    MerchantListName: "",
                    Location: locationinputvalue,
                  });
                }}
                style={{ marginTop: "4%", marginBottom: "7%" }}
                sx={{ border: "4px orange", borderRadius: 10 }}
              >
                <SearchIcon style={{ color: "orange" }} />
              </IconButton>
            </Grid>
          </div>
        </div> */}
      </div>
    </div>
  );
}
