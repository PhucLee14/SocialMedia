import { Box } from "@mui/material";
import DefaultLayout from "./DefaultLayout";
import React from "react";

function EditProfileLayout({ children }) {
    return (
        <Box sx={{ display: "flex" }}>
            <DefaultLayout></DefaultLayout>
            {children}
        </Box>
    );
}

export default EditProfileLayout;
