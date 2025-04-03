import React from "react";
import { Box, Dialog, DialogContent } from "@mui/material";

function PostDetail({ post, open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogContent>
                <Box>detailll</Box>
            </DialogContent>
        </Dialog>
    );
}

export default PostDetail;
