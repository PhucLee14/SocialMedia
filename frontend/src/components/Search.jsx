import { Box, TextField } from "@mui/material";
import React from "react";

function Search() {
    return (
        <Box width={"calc(100% - 32px)"} mx={1}>
            <form style={{ width: "100%" }}>
                <TextField
                    placeholder="Search"
                    fullWidth
                    // value={message}
                    // onChange={(e) => {
                    //     setMessage(e.target.value);
                    // }}
                    sx={{
                        // margin: "0 8px",
                        backgroundColor: "#efefef",
                        borderRadius: 2,
                        "& fieldset": { border: "none" },
                        "& .MuiInputBase-input": {
                            py: 1,
                        },
                        "&:focus-within .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                    }}
                />
            </form>
        </Box>
    );
}

export default Search;
