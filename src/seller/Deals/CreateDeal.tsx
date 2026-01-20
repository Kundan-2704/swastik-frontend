import React, { useEffect, useState } from "react";
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Checkbox,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { fetchSellerProduct } from "../../Redux Toolkit/Features/Seller/SellerProductSlice";
import { createDeal } from "../../Redux Toolkit/Features/Admin/DealSlice";

const CreateDeal = () => {
    const dispatch = useAppDispatch();

    /* ================= REDUX ================= */
    const { products, loading } = useAppSelector(
        (state) => state.sellerProduct
    );

    const jwt = useAppSelector(
        (state) => state.seller.sellerAuth.jwt
    );

    /* ================= STATE ================= */
    const [dealData, setDealData] = useState({
        name: "",
        discountType: "PERCENTAGE",
        discountValue: "",
        startDate: "",
        endDate: "",
        products: [] as string[],
    });

    /* ================= FETCH SELLER PRODUCTS ================= */
    useEffect(() => {
        if (!jwt) return;
        dispatch(fetchSellerProduct({ jwt }));
    }, [dispatch, jwt]);

    /* ================= SUBMIT ================= */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 🔒 VALIDATIONS
        if (!dealData.name.trim()) {
            alert("Please enter deal name");
            return;
        }

        if (!dealData.discountValue) {
            alert("Please enter discount value");
            return;
        }

        if (dealData.products.length === 0) {
            alert("Please select at least one product");
            return;
        }

        if (!dealData.startDate || !dealData.endDate) {
            alert("Please select start and end date");
            return;
        }

        if (dealData.endDate < dealData.startDate) {
            alert("End date must be after start date");
            return;
        }

        const payload = {
            name: dealData.name,
            discountType: dealData.discountType,
            discountValue: Number(dealData.discountValue),
            startDate: dealData.startDate,
            endDate: dealData.endDate,
            products: dealData.products,
            active: true,
        };

        console.log("✅ FINAL DEAL PAYLOAD", payload);

        // ✅ CREATE DEAL IN DATABASE
        dispatch(createDeal(payload));

        // OPTIONAL: reset form
        setDealData({
            name: "",
            discountType: "PERCENTAGE",
            discountValue: "",
            startDate: "",
            endDate: "",
            products: [],
        });
    };

    /* ================= UI ================= */
    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Create Deal
            </Typography>

            <Paper className="p-6 rounded-xl max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Deal Name */}
                    <TextField
                        fullWidth
                        label="Deal Name *"
                        value={dealData.name}
                        onChange={(e) =>
                            setDealData({ ...dealData, name: e.target.value })
                        }
                    />

                    {/* Discount Type */}
                    <FormControl fullWidth>
                        <InputLabel>Discount Type</InputLabel>
                        <Select
                            value={dealData.discountType}
                            label="Discount Type"
                            onChange={(e) =>
                                setDealData({
                                    ...dealData,
                                    discountType: e.target.value,
                                })
                            }
                        >
                            <MenuItem value="PERCENTAGE">Percentage (%)</MenuItem>
                            <MenuItem value="FLAT">Flat Amount (₹)</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Discount Value */}
                    <TextField
                        fullWidth
                        type="number"
                        label="Discount Value *"
                        value={dealData.discountValue}
                        onChange={(e) =>
                            setDealData({
                                ...dealData,
                                discountValue: e.target.value,
                            })
                        }
                    />

                    {/* Products Multi Select */}
                    <Autocomplete
                        multiple
                        loading={loading}
                        options={products || []}
                        disableCloseOnSelect
                        getOptionLabel={(option: any) => option.title}
                        onChange={(e, value) =>
                            setDealData({
                                ...dealData,
                                products: value.map((p: any) => p._id),
                            })
                        }
                        renderOption={(props, option: any, { selected }) => (
                            <li {...props}>
                                <Checkbox checked={selected} />
                                {option.title}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Products *"
                                placeholder="Choose products for deal"
                            />
                        )}
                    />

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            type="date"
                            label="Start Date *"
                            InputLabelProps={{ shrink: true }}
                            value={dealData.startDate}
                            onChange={(e) =>
                                setDealData({
                                    ...dealData,
                                    startDate: e.target.value,
                                })
                            }
                        />
                        <TextField
                            type="date"
                            label="End Date *"
                            InputLabelProps={{ shrink: true }}
                            value={dealData.endDate}
                            onChange={(e) =>
                                setDealData({
                                    ...dealData,
                                    endDate: e.target.value,
                                })
                            }
                        />
                    </div>

                    {/* Submit */}
                    <Button type="submit" variant="contained" size="large">
                        Create Deal
                    </Button>

                </form>
            </Paper>
        </Box>
    );
};

export default CreateDeal;
