
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
    fetchSellerProductById,
    updateProduct,
} from "../../Redux Toolkit/Features/Seller/SellerProductSlice";

/* ================= CATEGORY DATA ================= */

// LEVEL 1
import { mainCategory } from "../../Data/Category/mainCategory";

// LEVEL 2
import { kosaLevelTwo } from "../../Data/Category/levelTwo/kosaLevelTwo";
import { tussarLevelTwo } from "../../Data/Category/levelTwo/tassarLevelTwo";
import { handloomLevelTwo } from "../../Data/Category/levelTwo/handloomLevelTwo";
import { weddingLevelTwo } from "../../Data/Category/levelTwo/weddingLevelTwo";
import { dailyWearLevelTwo } from "../../Data/Category/levelTwo/dailyWearLevelTwo";
import { printedLevelTwo } from "../../Data/Category/levelTwo/printedLevelTwo";

// LEVEL 3
import { kosaLevelThree } from "../../Data/Category/levelThree/kosaLevelThree";
import { tussarLevelThree } from "../../Data/Category/levelThree/tassarLevelThree";
import { handloomLevelThree } from "../../Data/Category/levelThree/handloomLevelThree";
import { weddingLevelThree } from "../../Data/Category/levelThree/weddingLevelThree";
import { dailyWearLevelThree } from "../../Data/Category/levelThree/dailyWearLevelThree";
import { printedLevelThree } from "../../Data/Category/levelThree/printedLevelThree";

/* ================= TYPES ================= */

interface Category {
    name: string;
    categoryId: string;
    level: number;
}

interface SubCategory {
    name: string;
    categoryId: string;
    parentCategoryId: string;
    level: number;
}

/* ================= CONSTANTS ================= */

const primaryColor = "#B9935A";
const textPrimary = "#4A1F2A";
const sizeOptions = ["FREE", "XS", "S", "M", "L", "XL", "XXL"];

/* ================= CATEGORY MAP ================= */

const levelTwoMap: Record<string, SubCategory[]> = {
    kosa_sarees: kosaLevelTwo,
    tassar_sarees: tussarLevelTwo,
    handloom_sarees: handloomLevelTwo,
    wedding_sarees: weddingLevelTwo,
    daily_wear_sarees: dailyWearLevelTwo,
    printed_sarees: printedLevelTwo,
};

const levelThreeMap: Record<string, SubCategory[]> = {
    kosa_sarees: kosaLevelThree,
    tassar_sarees: tussarLevelThree,
    handloom_sarees: handloomLevelThree,
    wedding_sarees: weddingLevelThree,
    daily_wear_sarees: dailyWearLevelThree,
    printed_sarees: printedLevelThree,
};

/* ================= COMPONENT ================= */

const SellerProductEdit: React.FC = () => {
    const dispatch = useAppDispatch();
    const { productId } = useParams();
    const jwt = localStorage.getItem("jwt") || "";

    const product = useAppSelector(
        (state) => state.sellerProduct.singleProduct
    );

    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [levelTwoOptions, setLevelTwoOptions] = useState<SubCategory[]>([]);
    const [levelThreeOptions, setLevelThreeOptions] = useState<SubCategory[]>([]);

    /* ================= FETCH PRODUCT ================= */


   
    useEffect(() => {
        if (productId) {
            dispatch(fetchSellerProductById(productId));
        }
    }, [dispatch, productId]);

    useEffect(() => {
        if (product?.images) {
            setExistingImages(product.images);
        }
    }, [product]);





    /* ================= FORMIK ================= */

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: product?.title || "",
            description: product?.description || "",
            mrpPrice: product?.mrpPrice || "",
            sellingPrice: product?.sellingPrice || "",
            quantity: product?.quantity || "",

            // ✅ FIX HERE
            category: product?.category?._id || "",
            category2: product?.category2?._id || "",
            category3: product?.category3?._id || "",

            colors: product?.colors || [{ name: "", hex: "" }],
            sizes: product?.sizes || [],
            details: product?.details || {
                fabric: "",
                weave: "",
                sareeLength: "",
                blousePiece: "",
                care: "",
                origin: "",
            },
            craftStory: product?.craftStory || "",
        },


        onSubmit: (values) => {
            const formData = new FormData();

            // 🔹 SIMPLE FIELDS
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("craftStory", values.craftStory || "");

            // 🔹 NUMBERS (as string, backend convert karega)
            formData.append("mrpPrice", String(values.mrpPrice));
            formData.append("sellingPrice", String(values.sellingPrice));
            formData.append("quantity", String(values.quantity));

            // 🔹 CATEGORY (sirf agar hai)
            if (values.category) formData.append("category", values.category);
            if (values.category2) formData.append("category2", values.category2);
            if (values.category3) formData.append("category3", values.category3);

            // 🔹 ARRAYS / OBJECTS (VERY IMPORTANT)
            formData.append("sizes", JSON.stringify(values.sizes));
            formData.append("colors", JSON.stringify(values.colors));
            formData.append("details", JSON.stringify(values.details));

              formData.append("existingImages", JSON.stringify(existingImages));

            // 🔹 IMAGES
            images.forEach((file: File) => {
                formData.append("images", file);
            });

            dispatch(
                updateProduct({
                    jwt,
                    productId,
                    request: formData,
                })
            );
        },


    });

    /* ================= CATEGORY HANDLING ================= */

    useEffect(() => {
        if (formik.values.category) {
            setLevelTwoOptions(levelTwoMap[formik.values.category] || []);
        }
    }, [formik.values.category]);

    useEffect(() => {
        if (formik.values.category2) {
            const all = levelThreeMap[formik.values.category] || [];
            setLevelThreeOptions(
                all.filter(
                    (c) => c.parentCategoryId === formik.values.category2
                )
            );
        }
    }, [formik.values.category2]);

    /* ================= IMAGE HANDLERS ================= */

    const handleAddImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || images.length + existingImages.length >= 4) return;

        setImages((p) => [...p, file]);
        setPreviews((p) => [...p, URL.createObjectURL(file)]);
        e.target.value = "";
    };

    const removeExistingImage = (index: number) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    const removeNewImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    /* ================= UI ================= */

    return (
        <div className="max-w-6xl mx-auto py-8 space-y-6">
            <h2 className="text-2xl font-semibold" style={{ color: textPrimary }}>
                Edit Product
            </h2>

            <form
                onSubmit={formik.handleSubmit}
                className="bg-white border rounded-2xl p-6 space-y-8"
            >
                {/* IMAGES */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {existingImages.map((img, i) => (
                        <div key={i} className="relative">
                            <img
                                src={img}
                                className="h-28 w-full object-cover rounded"
                            />
                            <button
                                type="button"
                                onClick={() => removeExistingImage(i)}
                                className="absolute top-1 right-1 bg-black text-white px-2 rounded-full"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {previews.map((img, i) => (
                        <div key={i} className="relative">
                            <img
                                src={img}
                                className="h-28 w-full object-cover rounded"
                            />
                            <button
                                type="button"
                                onClick={() => removeNewImage(i)}
                                className="absolute top-1 right-1 bg-black text-white px-2 rounded-full"
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {existingImages.length + previews.length < 4 && (
                        <label className="h-28 border flex items-center justify-center cursor-pointer rounded text-sm text-gray-500">
                            + Add Image
                            <input type="file" hidden onChange={handleAddImg} />
                        </label>
                    )}
                </div>

                {/* TITLE & DESCRIPTION */}
                <input
                    name="title"
                    placeholder="Product Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    className="border p-2 rounded w-full"
                />

                <textarea
                    name="description"
                    placeholder="Product Description"
                    rows={3}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className="border p-2 rounded w-full"
                />

                {/* PRICE & STOCK */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                        type="number"
                        name="mrpPrice"
                        placeholder="MRP"
                        value={formik.values.mrpPrice}
                        onChange={formik.handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="sellingPrice"
                        placeholder="Selling Price"
                        value={formik.values.sellingPrice}
                        onChange={formik.handleChange}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        className="border p-2 rounded"
                    />
                </div>

                {/* COLORS & SIZES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <input
                            placeholder="Color Name"
                            value={formik.values.colors[0]?.name}
                            onChange={(e) =>
                                formik.setFieldValue("colors", [
                                    { ...formik.values.colors[0], name: e.target.value },
                                ])
                            }
                            className="border p-2 rounded w-full"
                        />
                        <input
                            placeholder="Color Hex"
                            value={formik.values.colors[0]?.hex}
                            onChange={(e) =>
                                formik.setFieldValue("colors", [
                                    { ...formik.values.colors[0], hex: e.target.value },
                                ])
                            }
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {sizeOptions.map((s) => (
                            <label key={s} className="flex items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={formik.values.sizes.includes(s)}
                                    onChange={() => {
                                        const updated = formik.values.sizes.includes(s)
                                            ? formik.values.sizes.filter((x) => x !== s)
                                            : [...formik.values.sizes, s];
                                        formik.setFieldValue("sizes", updated);
                                    }}
                                />
                                {s}
                            </label>
                        ))}
                    </div>
                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(formik.values.details).map((key) => (
                        <input
                            key={key}
                            placeholder={key}
                            value={(formik.values.details as any)[key]}
                            onChange={(e) =>
                                formik.setFieldValue(`details.${key}`, e.target.value)
                            }
                            className="border p-2 rounded"
                        />
                    ))}
                </div>

                {/* CATEGORY */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <select
                        value={formik.values.category}
                        onChange={(e) =>
                            formik.setFieldValue("category", e.target.value)
                        }
                        className="border p-2 rounded"
                    >
                        <option value="">Select Category</option>
                        {mainCategory.map((c: Category) => (
                            <option key={c.categoryId} value={c.categoryId}>
                                {c.name}
                            </option>
                        ))}
                    </select>

                    {levelTwoOptions.length > 0 && (
                        <select
                            value={formik.values.category2}
                            onChange={(e) =>
                                formik.setFieldValue("category2", e.target.value)
                            }
                            className="border p-2 rounded"
                        >
                            <option value="">Sub Category</option>
                            {levelTwoOptions.map((c) => (
                                <option key={c.categoryId} value={c.categoryId}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    )}

                    {levelThreeOptions.length > 0 && (
                        <select
                            name="category3"
                            value={formik.values.category3}
                            onChange={formik.handleChange}
                            className="border p-2 rounded"
                        >
                            <option value="">Sub Category 2</option>
                            {levelThreeOptions.map((c) => (
                                <option key={c.categoryId} value={c.categoryId}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    style={{ backgroundColor: primaryColor }}
                    className="w-full py-3 text-white rounded-lg font-medium"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default SellerProductEdit;
