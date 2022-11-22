
import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import React, { Fragment, useEffect, useState } from 'react';
import LeaderListButton from "../components/LeaderListButton";
import LeaderListSearch from "../components/LeaderListSearch";
import LeaderList from "../components/LeaderList";
import { useSelector } from "react-redux";


export const List = (props) => {

  const [global, setGlobal] = useState({})

  const reducer = useSelector(data => data)


  useEffect(() => {
    setGlobal({ ...reducer })
  }, [reducer.leaderlist_search_teamleadername, reducer.leaderlist_search_zone])

  return (
    <Fragment>
      <div>
        <Navigation />
        <LeaderListButton data={global} set={setGlobal} />

        <LeaderListSearch data={global} set={setGlobal} />
        <LeaderList data={global} set={setGlobal} />

        <Contact />

      </div>
    </Fragment>


  )
};
export default List;
