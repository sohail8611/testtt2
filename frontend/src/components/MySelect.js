import React from 'react'

import { Box, InputLabel, MenuItem, Select } from "@mui/material";

const MySelect = () => {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Box sx={{ minWidth: 120 }}>

            <InputLabel>Age</InputLabel>
            <Select

                value={age}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>

        </Box>
    )
}

export default MySelect