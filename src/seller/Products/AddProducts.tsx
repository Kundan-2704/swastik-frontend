import React, { useState } from "react";
import { useFormik } from "formik";
import { uploadToCloudinary } from "../../Util/uploadToCloudnary";
import { useAppDispatch } from "../../Redux Toolkit/Store";
import { createProduct } from "../../Redux Toolkit/Features/Seller/SellerProductSlice";

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

/* ================= CATEGORY MAPS ================= */

const levelTwoMap: Record<string, SubCategory[]> = {
  kosa_sarees: kosaLevelTwo,
  tussar_sarees: tussarLevelTwo,
  handloom_sarees: handloomLevelTwo,
  wedding_sarees: weddingLevelTwo,
  daily_wear_sarees: dailyWearLevelTwo,
  printed_sarees: printedLevelTwo,
};

const levelThreeMap: Record<string, SubCategory[]> = {
  kosa_sarees: kosaLevelThree,
  tussar_sarees: tussarLevelThree,
  handloom_sarees: handloomLevelThree,
  wedding_sarees: weddingLevelThree,
  daily_wear_sarees: dailyWearLevelThree,
  printed_sarees: printedLevelThree,
};

/* ================= COMPONENT ================= */

const AddProducts: React.FC = () => {
  const dispatch = useAppDispatch();

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [levelTwoOptions, setLevelTwoOptions] = useState<SubCategory[]>([]);
  const [levelThreeOptions, setLevelThreeOptions] = useState<SubCategory[]>([]);

  /* ================= FORMIK ================= */

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",

      // NEW (schema-aligned)
      colors: [{ name: "", hex: "" }],
      sizes: [] as string[],

      details: {
        fabric: "",
        weave: "",
        sareeLength: "",
        blousePiece: "",
        care: "",
        origin: "",
      },

      delivery: {
        estimatedDays: "5–7 working days",
        freeShippingAbove: 7000,
        codAvailable: true,
        returnDays: 7,
      },

      craftStory: "",

      // Categories
      category: "",
      category2: "",
      category3: "",
    },

    onSubmit: async (values) => {
      if (!values.category || !values.category2 || !values.category3) {
        alert("Please select all category levels");
        return;
      }

      try {
        const imageUrls = await Promise.all(
          images.map((img) => uploadToCloudinary(img))
        );

        const payload = {
          title: values.title,
          description: values.description,

          mrpPrice: Number(values.mrpPrice),
          sellingPrice: Number(values.sellingPrice),
          quantity: Number(values.quantity),

          images: imageUrls,

          colors: values.colors.filter((c) => c.name),
          sizes: values.sizes,

          details: values.details,
          delivery: values.delivery,
          craftStory: values.craftStory,
          faqs: [],

          category: values.category,
          category2: values.category2,
          category3: values.category3,
        };

        const jwt = localStorage.getItem("jwt");
        if (!jwt) {
          alert("Login expired");
          return;
        }

        await dispatch(createProduct({ jwt, request: payload })).unwrap();

        alert("Product Added Successfully");
        formik.resetForm();
        setImages([]);
        setPreviews([]);
        setLevelTwoOptions([]);
        setLevelThreeOptions([]);
      } catch (err) {
        console.error(err);
        alert("Failed to add product");
      }
    },
  });

  /* ================= IMAGE HANDLERS ================= */

  const handleAddImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || images.length >= 4) return;

    setImages((p) => [...p, file]);
    setPreviews((p) => [...p, URL.createObjectURL(file)]);
    e.target.value = "";
  };

  const handleRemoveImg = (i: number) => {
    setImages((p) => p.filter((_, idx) => idx !== i));
    setPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  /* ================= CATEGORY HANDLERS ================= */

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    formik.setFieldValue("category", value);
    formik.setFieldValue("category2", "");
    formik.setFieldValue("category3", "");
    setLevelTwoOptions(levelTwoMap[value] || []);
    setLevelThreeOptions([]);
  };

  const handleCategory2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    formik.setFieldValue("category2", value);
    formik.setFieldValue("category3", "");
    const allLevelThree = levelThreeMap[formik.values.category] || [];
    setLevelThreeOptions(
      allLevelThree.filter((c) => c.parentCategoryId === value)
    );
  };

  /* ================= UI ================= */

  return (
    <div className="max-w-5xl space-y-6">
      <h2 className="text-xl font-semibold" style={{ color: textPrimary }}>
        Add New Product
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="bg-white border rounded-2xl p-6 space-y-6"
      >
        {/* IMAGES */}
        <div className="flex gap-4 flex-wrap">
          {previews.map((img, i) => (
            <div key={i} className="w-24 h-24 relative">
              <img src={img} className="w-full h-full object-cover rounded" />
              <button
                type="button"
                onClick={() => handleRemoveImg(i)}
                className="absolute top-1 right-1 bg-black text-white px-2 rounded-full"
              >
                ✕
              </button>
            </div>
          ))}
          {images.length < 4 && (
            <label className="w-24 h-24 border flex items-center justify-center cursor-pointer">
              + Add
              <input type="file" hidden onChange={handleAddImg} />
            </label>
          )}
        </div>

        <input
          name="title"
          placeholder="Title"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
          className="w-full border p-2 rounded"
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            name="mrpPrice"
            type="number"
            placeholder="MRP"
            onChange={formik.handleChange}
            value={formik.values.mrpPrice}
            className="border p-2 rounded"
          />
          <input
            name="sellingPrice"
            type="number"
            placeholder="Selling Price"
            onChange={formik.handleChange}
            value={formik.values.sellingPrice}
            className="border p-2 rounded"
          />
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            onChange={formik.handleChange}
            value={formik.values.quantity}
            className="border p-2 rounded"
          />
        </div>

        {/* COLORS */}
        <div className="space-y-2">
          <input
            placeholder="Color Name (e.g. Mustard Gold)"
            value={formik.values.colors[0].name}
            onChange={(e) =>
              formik.setFieldValue("colors", [
                { ...formik.values.colors[0], name: e.target.value },
              ])
            }
            className="w-full border p-2 rounded"
          />
          <input
            placeholder="Color Hex (optional)"
            value={formik.values.colors[0].hex}
            onChange={(e) =>
              formik.setFieldValue("colors", [
                { ...formik.values.colors[0], hex: e.target.value },
              ])
            }
            className="w-full border p-2 rounded"
          />
        </div>

        {/* SIZES */}
        <div className="flex flex-wrap gap-3">
          {sizeOptions.map((s) => (
            <label key={s} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formik.values.sizes.includes(s)}
                onChange={() => {
                  const next = formik.values.sizes.includes(s)
                    ? formik.values.sizes.filter((x) => x !== s)
                    : [...formik.values.sizes, s];
                  formik.setFieldValue("sizes", next);
                }}
              />
              {s}
            </label>
          ))}
        </div>

        {/* DETAILS */}
        <div className="grid grid-cols-2 gap-4">
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

        {/* CRAFT STORY */}
        <textarea
          name="craftStory"
          placeholder="Craft Story (optional)"
          onChange={formik.handleChange}
          value={formik.values.craftStory}
          className="w-full border p-2 rounded"
        />

        {/* CATEGORY LEVELS */}
        <select
          value={formik.values.category}
          onChange={handleCategoryChange}
          className="w-full border p-2 rounded"
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
            onChange={handleCategory2Change}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Sub Category</option>
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
            className="w-full border p-2 rounded"
          >
            <option value="">Select Sub Category 2</option>
            {levelThreeOptions.map((c) => (
              <option key={c.categoryId} value={c.categoryId}>
                {c.name}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          style={{ backgroundColor: primaryColor }}
          className="w-full py-2 text-white rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;
