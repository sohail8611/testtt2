import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Fragment } from "react";
import { Navigation } from "../components/navigation";
// import { Navigation } from "../components/navigation";
import { Contact } from "../components/contact";
import React, { useEffect, useState } from 'react';
import LeaderListButton from "../components/LeaderListButton";
import LeaderListSearch from "../components/LeaderListSearch";
import LeaderList from "../components/LeaderList";
import { useSelector } from "react-redux";






export const testdropdown = (props) => {
    // Search Fields work




    return (
        <Fragment>
            <div>
                <Navigation />
                <h1>test</h1>
                <h1>test2</h1>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        //   value={age}
                        label="Age"
                    //   onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Fragment>
    );
};
export default testdropdown;