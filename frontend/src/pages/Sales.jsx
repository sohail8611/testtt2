import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import React, { Fragment } from "react";
import CustomizedButtons from "../components/SalesButton";
import SaleSearch from "../components/SalesSearch";
import { useState } from "react";

import CustomizedTables from "../components/SalesList";
export const Sales = (props) => {
  // Search Fields work

  const [inputValue, setInputValue] = useState([]);
  const [clearSearchDo, setClearSearchDo] = useState(false);

  const [searchArray, setSearchArray] = useState({
    'POSType': "fgfgfsgf",
    'Prod':"dasdsads",
    'Mcc': "fgfgfsgf",
    'TerminalID': "gsfsfdfdf",
    'MerchantID': "fgfgfsgf",
    'MerchantListName': "gsfsfdfdf",
    'Location': "gsfsfdfdf",
    
    
  });

  function clearSearch() {
    console.log("Clear search called");
    setInputValue([]);
  }

  return (
    <Fragment>
      <div>
        <Navigation />
        <CustomizedButtons />
        <SaleSearch
          inputValue={inputValue}
          setInputValue={setInputValue}
          clearSearch={clearSearch}
          searchArray={searchArray}
          setSearchArray={setSearchArray}
        />
        <CustomizedTables
          inputValue={inputValue}
          clearSearchDo={clearSearchDo}
          setClearSearchDo={setClearSearchDo}
          searchArray={searchArray}
        />
        <Contact />
      </div>
    </Fragment>
  );
};
export default Sales;
