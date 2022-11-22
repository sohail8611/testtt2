import { Header } from "../components/header";
import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import React, { Fragment, useState } from "react";
import CustomizedButtons from "../components/TechListButton";
import TechSearch from "../components/ListTechnicianSearch";
import TechnicianList from "../components/TechnicianList";
export const TechList = (props) => {
  // Search Fields work

  const [inputValue, setInputValue] = useState([]);

  const [searchArray, setSearchArray] = useState({
    'zonename': "fgfgfsgf",
    'techname': "gsfsfdfdf",
  });

  const [clearSearchDo, setClearSearchDo] = useState(false);

  function clearSearch() {
    console.log("Clear search called");
    setInputValue([]);
  }

  return (
    <Fragment>
      <div>
        <Navigation />
        <CustomizedButtons />

        <TechSearch
          inputValue={inputValue}
          setInputValue={setInputValue}
          clearSearch={clearSearch}

          searchArray={searchArray}
          setSearchArray={setSearchArray}
        />
        <TechnicianList
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

export default TechList;
