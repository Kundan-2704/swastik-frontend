import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  createCoupon,
  clearCouponError,
} from "../../Redux Toolkit/Features/Admin/CouponSlice";

const CouponForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector(
    (state) => state.adminCoupon
  );

  const jwt = localStorage.getItem("jwt") || "";

  const [form, setForm] = useState({
    code: "",
    discountType: "PERCENT" as "PERCENT" | "FLAT",
    discountValue: "",
    minOrderValue: "",
    maxDiscount: "",
    expiryDate: "",
    isActive: true,
  });

  /* ===================== HANDLERS ===================== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      code: form.code.trim(),
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      minOrderValue: form.minOrderValue
        ? Number(form.minOrderValue)
        : undefined,
      maxDiscount: form.maxDiscount
        ? Number(form.maxDiscount)
        : undefined,
      expiryDate: form.expiryDate,
      isActive: form.isActive,
    };

    dispatch(createCoupon({ jwt, coupon: payload }))
      .unwrap()
      .then(() => {
        navigate("/admin/coupons");
      })
      .catch(() => {
        // error already handled in slice
      });
  };

  /* ===================== EFFECTS ===================== */

  useEffect(() => {
    return () => {
      dispatch(clearCouponError());
    };
  }, [dispatch]);

  /* ===================== UI ===================== */

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Create Coupon</h2>
        <button
          style={styles.backBtn}
          onClick={() => navigate("/admin/coupons")}
        >
          ← Back
        </button>
      </div>

      {/* Error */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Coupon Code */}
        <div style={styles.field}>
          <label style={styles.label}>Coupon Code *</label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            placeholder="KOSA10"
            style={styles.input}
            required
          />
        </div>

        {/* Discount Type */}
        <div style={styles.field}>
          <label style={styles.label}>Discount Type *</label>
          <select
            name="discountType"
            value={form.discountType}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="PERCENT">Percentage (%)</option>
            <option value="FLAT">Flat Amount (₹)</option>
          </select>
        </div>

        {/* Discount Value */}
        <div style={styles.field}>
          <label style={styles.label}>Discount Value *</label>
          <input
            type="number"
            name="discountValue"
            value={form.discountValue}
            onChange={handleChange}
            placeholder="10"
            style={styles.input}
            required
          />
        </div>

        {/* Minimum Order */}
        <div style={styles.field}>
          <label style={styles.label}>Minimum Order Value</label>
          <input
            type="number"
            name="minOrderValue"
            value={form.minOrderValue}
            onChange={handleChange}
            placeholder="₹1000"
            style={styles.input}
          />
        </div>

        {/* Maximum Discount */}
        <div style={styles.field}>
          <label style={styles.label}>Maximum Discount</label>
          <input
            type="number"
            name="maxDiscount"
            value={form.maxDiscount}
            onChange={handleChange}
            placeholder="₹500"
            style={styles.input}
          />
        </div>

        {/* Expiry Date */}
        <div style={styles.field}>
          <label style={styles.label}>Expiry Date *</label>
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        {/* Active */}
        <div style={styles.checkbox}>
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          <span style={{ marginLeft: "8px" }}>Active Coupon</span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          style={styles.submitBtn}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Coupon"}
        </button>
      </form>
    </div>
  );
};

export default CouponForm;

/* ===================== STYLES (UNCHANGED UI) ===================== */

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    backgroundColor: "#fdf6ea",
    padding: "32px",
    borderRadius: "16px",
    maxWidth: "760px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  heading: {
    fontSize: "26px",
    fontWeight: 600,
    color: "#5a1e1e",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#7a3b1e",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 500,
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#6b1d1d",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #d6b98c",
    fontSize: "14px",
    outline: "none",
  },
  checkbox: {
    gridColumn: "span 2",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#6b1d1d",
  },
  submitBtn: {
    gridColumn: "span 2",
    marginTop: "10px",
    padding: "12px",
    backgroundColor: "#7a3b1e",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
