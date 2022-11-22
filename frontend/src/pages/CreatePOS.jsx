import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import React,{Fragment} from 'react';
import CustomizedButtons from "../components/CreatePOSTable";
import Search from "../components/CreatePOSsearch";
import CustomizedTables from "../components/CreatePOSTable";
export const CreateSale = (props) => {
  return (
    <Fragment>
    <div>
    <Navigation/>
    <Search/>
    <CustomizedTables/>
    
    <Contact/>

    </div>
    </Fragment>
    
    
  )
};
export default CreateSale;
