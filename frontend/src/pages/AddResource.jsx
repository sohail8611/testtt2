import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import React, { Fragment, useState } from "react";
import CustomizedButtons from "../components/ResourceButton";
import LocSearch from "../components/LocationSearch";
import CustomizedTables from "../components/ResorceList";
import  MyPagination from "../components/Pagination";
export const Resource = (props) => {
  const [tagList, setTagList] = React.useState([]);
  const [currPage, setCurrPage] = React.useState(3);

  React.useEffect(() => {
    afterPageClicked(3);
  }, []);

  const afterPageClicked = (page_number) => {
    setCurrPage(page_number);
   
      
  };


  
  return (
    <Fragment>
      <div>
        <Navigation />
        <CustomizedButtons />
   
        <CustomizedTables />
        <MyPagination
      totPages={20}
      currentPage={currPage}
      pageClicked={(ele) => {
        afterPageClicked(ele);
      }}
    >
      <ul>
        {tagList.map((ele, ind) => {
          return <li key={ele + ind}>{ele}</li>;
        })}
      </ul>
    </MyPagination>
      

        <Contact />
      </div>
    </Fragment>
  );
};
export default Resource;
