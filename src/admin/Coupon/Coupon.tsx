import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  deleteCoupon,
  fetchAllCoupons,
  clearCouponError,
} from "../../Redux Toolkit/Features/Admin/CouponSlice";

const Coupon: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { coupons, loading, error } = useAppSelector(
    (state) => state.adminCoupon
  );

  const jwt = localStorage.getItem("jwt") || "";

  /* ===================== FETCH ===================== */

  useEffect(() => {
    if (!jwt) return;

    dispatch(clearCouponError());

    dispatch(fetchAllCoupons(jwt))
      .unwrap()
      .catch(() => {
        // handled in slice
      });
  }, [dispatch, jwt]);

  /* ===================== DELETE ===================== */

  const handleDelete = (id: string) => {
    if (!jwt) return;

    if (window.confirm("Are you sure you want to delete this coupon?")) {
      dispatch(deleteCoupon({ jwt, id }));
    }
  };

  /* ===================== UI ===================== */

  return (
    <div style={styles.wrapper}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Coupons</h2>

        <button
          style={styles.createBtn}
          onClick={() => navigate("/admin/coupons/add")}
        >
          + Create Coupon
        </button>
      </div>

      {/* Loading */}
      {loading && <p>Loading coupons...</p>}

      {/* Error */}
      {!loading && error && (
        <p style={{ color: "red", marginBottom: "12px" }}>{error}</p>
      )}

      {/* Coupon Table */}
      {!loading && !error && (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Code</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Discount</th>
                <th style={styles.th}>Expiry</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={6} style={styles.empty}>
                    No coupons found
                  </td>
                </tr>
              )}

              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td style={styles.td}>{coupon.code}</td>

                  <td style={styles.td}>
                    {coupon.discountType === "PERCENT" ? "%" : "₹"}
                  </td>

                  <td style={styles.td}>
                    {coupon.discountType === "PERCENT"
                      ? `${coupon.discountValue}%`
                      : `₹${coupon.discountValue}`}
                  </td>

                  <td style={styles.td}>
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={
                        coupon.isActive ? styles.active : styles.inactive
                      }
                    >
                      {coupon.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td style={styles.td}>
                    {/* EDIT */}
                    <button
                      style={styles.actionBtn}
                      onClick={() =>
                        navigate(`/admin/coupons/edit/${coupon._id}`)
                      }
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDelete(coupon._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Coupon;

/* ===================== STYLES ===================== */

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    backgroundColor: "#fdf6ea",
    padding: "32px",
    borderRadius: "16px",
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
  createBtn: {
    padding: "10px 18px",
    backgroundColor: "#7a3b1e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
  tableWrapper: {
    overflowX: "auto",
    backgroundColor: "#fff7eb",
    borderRadius: "12px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "14px",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: 600,
    color: "#6b1d1d",
    borderBottom: "1px solid #e4d1b3",
  },
  td: {
    padding: "14px",
    fontSize: "14px",
    color: "#5f4b3c",
    borderBottom: "1px solid #efe2cc",
  },
  active: {
    padding: "4px 10px",
    backgroundColor: "#e6f4ea",
    color: "#2e7d32",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 600,
  },
  inactive: {
    padding: "4px 10px",
    backgroundColor: "#fdecea",
    color: "#c62828",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 600,
  },
  actionBtn: {
    marginRight: "8px",
    padding: "6px 10px",
    backgroundColor: "#7a3b1e",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "6px 10px",
    backgroundColor: "#c62828",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    cursor: "pointer",
  },
  empty: {
    padding: "40px",
    textAlign: "center",
    color: "#8a7765",
  },
};
