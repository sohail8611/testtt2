import { Header } from "../components/header";
import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import React, { Fragment, useEffect, useState } from "react";
import CustomizedButtons from "../components/TechAddButton";
import TechSearch from "../components/AddTechnicianSearch";
import AddTechnician from "../components/AddTechnician";
export const Sample = (props) => {
  const [inputValue, setInputValue] = useState("  ");
  return (
    <Fragment>
    <div>
    <Navigation/>
    <CustomizedButtons/>
    <TechSearch
    inputValue={inputValue}
    setInputValue={setInputValue}
   />
    <AddTechnician
    inputValue={inputValue}
    setInputValue={setInputValue}/>
    <Contact/>

    </div>
    </Fragment>
    
    
  )
};
export default Sample;
