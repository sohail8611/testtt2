import { Header } from "../components/header";
import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import React,{Fragment} from 'react';

export const Sample = (props) => {
  return (
    <Fragment>
    <div>
    <Navigation/>
    <Header/>
    <Contact/>

    </div>
    </Fragment>
    
    
  )
};
export default Sample;
