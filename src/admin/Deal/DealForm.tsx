import React, { useEffect } from "react";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    MenuItem,
    Switch,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    Checkbox,
    ListItemText,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
    createDeal,
    updateDeals,
} from "../../Redux Toolkit/Features/Admin/DealSlice";
import { fetchSellerProduct } from "../../Redux Toolkit/Features/Seller/SellerProductSlice";

interface DealFormProps {
    deal?: any;
    onClose?: () => void;
}

const DealForm: React.FC<DealFormProps> = ({ deal, onClose }) => {
    const dispatch = useAppDispatch();
    const isEdit = Boolean(deal);

    const { products, loading } = useAppSelector(
        (state) => state.sellerProduct
    );

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");

        if (jwt) {
            dispatch(
                fetchSellerProduct({
                    jwt,
                    page: 1,
                    limit: 1000, // 👈 all products
                })
            );
        }
    }, [dispatch]);



    /* ================= FORM ================= */
    const formik = useFormik({
        initialValues: {
            title: deal?.title || "",
            position: deal?.position || "Homepage Banner",
            products: [] as string[], // 👈 must be array of _id strings
            discountType: deal?.discountType || "PERCENT",
            discountValue: deal?.discountValue || "",
            startDate: deal?.startDate || "",
            endDate: deal?.endDate || "",
            active: deal?.active ?? true,
            bannerImage: deal?.bannerImage || "",
        },

        validationSchema: Yup.object({
            title: Yup.string().required("Title is required"),
            products: Yup.array().min(1, "Select at least one product"),
            discountValue: Yup.number().required("Discount required"),
            startDate: Yup.string().required("Start date required"),
            endDate: Yup.string().required("End date required"),
        }),

        onSubmit: (values) => {
            if (isEdit) {
                dispatch(updateDeals({ id: deal._id, deal: values }));
            } else {
                dispatch(createDeal(values));
            }
            onClose?.();
        },
    });

    return (
        <Paper
            elevation={0}
            className="rounded-2xl p-6 max-w-3xl mx-auto"
            sx={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
        >
            <Typography variant="h6" className="mb-4 text-[#4A1F2A] font-semibold">
                {isEdit ? "Edit Deal" : "Add New Deal"}
            </Typography>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                {/* TITLE */}
                <TextField
                    fullWidth
                    label="Deal Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={Boolean(formik.errors.title)}
                    helperText={formik.errors.title}
                />

                {/* PRODUCT MULTI SELECT */}
                <FormControl fullWidth>
                    <InputLabel id="products-label">Select Products</InputLabel>

                    <Select
                        labelId="products-label"
                        multiple
                        value={formik.values.products}
                        onChange={(e) =>
                            formik.setFieldValue("products", e.target.value)
                        }
                        renderValue={(selected: any) =>
                            selected
                                .map(
                                    (id: string) =>
                                        products.find((p: any) => p._id === id)?.title
                                )
                                .join(", ")
                        }
                    >
                        {products.map((product: any) => (
                            <MenuItem key={product._id} value={product._id}>
                                <Checkbox
                                    checked={formik.values.products.includes(product._id)}
                                />
                                <ListItemText
                                    primary={product.title}
                                />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                {/* POSITION */}
                <TextField
                    select
                    fullWidth
                    label="Placement"
                    name="position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                >
                    <MenuItem value="Homepage Banner">Homepage Banner</MenuItem>
                    <MenuItem value="Homepage Section">Homepage Section</MenuItem>
                    <MenuItem value="Category Page">Category Page</MenuItem>
                </TextField>

                {/* DISCOUNT TYPE */}
                <TextField
                    select
                    fullWidth
                    label="Discount Type"
                    name="discountType"
                    value={formik.values.discountType}
                    onChange={formik.handleChange}
                >
                    <MenuItem value="PERCENT">Percentage (%)</MenuItem>
                    <MenuItem value="FLAT">Flat ₹</MenuItem>
                </TextField>

                {/* DISCOUNT VALUE */}
                <TextField
                    fullWidth
                    label="Discount Value"
                    name="discountValue"
                    value={formik.values.discountValue}
                    onChange={formik.handleChange}
                />

                {/* DATES */}
                <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextField
                        type="date"
                        label="Start Date"
                        name="startDate"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        type="date"
                        label="End Date"
                        name="endDate"
                        InputLabelProps={{ shrink: true }}
                        value={formik.values.endDate}
                        onChange={formik.handleChange}
                    />
                </Box>

                {/* ACTIVE */}
                <FormControlLabel
                    control={
                        <Switch
                            checked={formik.values.active}
                            onChange={(e) =>
                                formik.setFieldValue("active", e.target.checked)
                            }
                        />
                    }
                    label="Active"
                />

                {/* BANNER */}
                <TextField
                    fullWidth
                    label="Banner Image URL"
                    name="bannerImage"
                    value={formik.values.bannerImage}
                    onChange={formik.handleChange}
                />

                {/* ACTIONS */}
                <Box className="flex justify-end gap-3 pt-4">
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#B9935A",
                            "&:hover": { backgroundColor: "#A8844E" },
                        }}
                    >
                        {isEdit ? "Update Deal" : "Create Deal"}
                    </Button>
                </Box>
            </form>
        </Paper>
    );
};

export default DealForm;
