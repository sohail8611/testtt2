import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import React, { Fragment, useEffect, useState } from "react";
import CustomizedButtons from "../components/LocationButton";
import LocSearch from "../components/LocationSearch";
import CustomizedTables from "../components/LocationsList";
export const Location = (props) => {
  // Search Fields work

  const [inputValue, setInputValue] = useState(" ");
  const [zonesGlobalList, setZoneGlobalList] = useState([]);
  const [clearSearchDo, setClearSearchDo] = useState(false);

  function clearSearch() {
    console.log("Clear search called");
    setInputValue([]);
  }

  useEffect(()=>{
    // console.log("sohail",zonesGlobalList)
  },[zonesGlobalList])
  return (
    <Fragment>
      <div>
        <Navigation />
        <CustomizedButtons 
        zonesGlobalList={zonesGlobalList}
        />
        <LocSearch
          inputValue={inputValue}
          setInputValue={setInputValue}
          clearSearch={clearSearch}
          
        />
        <CustomizedTables
          inputValue={inputValue}
          clearSearchDo={clearSearchDo}
          setClearSearchDo={setClearSearchDo}
          setZoneGlobalList={setZoneGlobalList}
        />

        <Contact />
      </div>
    </Fragment>
  );
};
export default Location;
