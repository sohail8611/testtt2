
import React, { Fragment, useState } from "react";
import { Navigation } from "../components/navigation";
import SignUp from "../components/Signup";
export const Login = (props) => {

  
  return (
    <Fragment>
      <div>
        <Navigation/>
    <SignUp/>
      </div>
    </Fragment>
  );
};
export default Login;
