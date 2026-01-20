import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SellerDeals = () => {

     const navigate = useNavigate();

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight="bold">
                Deals & Offers
            </Typography>

            <Paper className="mt-4 p-4 rounded-xl">
                <Typography variant="subtitle1">
                    Create & manage product deals
                </Typography>

                <Button
                    variant="contained"
                    onClick={() => navigate("/seller/deals/create")}
                >
                    Create New Deal
                </Button>
            </Paper>
        </Box>
    );
};

export default SellerDeals;
