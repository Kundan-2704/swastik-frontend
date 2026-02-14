import React, { useEffect, useRef, useState } from "react";
import { Check, Close, Delete, Edit, Visibility } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  fetchSellerProduct,
  updateProductStock,
  bulkUpdateProductStock,
  deleteProduct,
} from "../../Redux Toolkit/Features/Seller/SellerProductSlice";
import { useNavigate } from "react-router-dom";


const AllProductsTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const jwt = localStorage.getItem("jwt") || "";

  const { products, loading } = useAppSelector(
    (state) => state.sellerProduct
  );

  /* ================= LOCAL STATES ================= */
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQty, setEditQty] = useState<number>(0);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [toast, setToast] = useState("");

  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();


  /* ================= FETCH ================= */
  useEffect(() => {
    if (jwt) dispatch(fetchSellerProduct(jwt));
  }, [dispatch, jwt]);

  /* ================= CLOSE MENU ================= */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  /* ================= FILTER + SEARCH ================= */
  const filteredProducts = products
    .filter((p: any) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p: any) => {
      if (filter === "OUT") return p.quantity === 0;
      if (filter === "LOW") return p.quantity > 0 && p.quantity <= 5;
      if (filter === "IN") return p.quantity > 5;
      return true;
    });

  /* ================= BULK ================= */
  const bulkSetQty = (qty: number) => {
    if (selectedIds.length === 0) return;

    dispatch(
      bulkUpdateProductStock({
        jwt,
        productIds: selectedIds,
        quantity: qty,
      })
    );

    setToast("Stock updated successfully");
    setSelectedIds([]);
    setTimeout(() => setToast(""), 2000);
  };

  /* ================= EDIT ================= */
  const startEdit = (p: any) => {
    setEditingId(p._id);
    setEditQty(Number(p.quantity || 0));
  };

  const saveEdit = (productId: string) => {
    dispatch(
      updateProductStock({
        jwt,
        productId,
        quantity: Number(editQty),
      })
    );
    setEditingId(null);
    setToast("Stock updated successfully");
    setTimeout(() => setToast(""), 2000);
  };

  /* ================= STOCK CHIP ================= */
  const stockChip = (qty: number) => {
    if (qty === 0)
      return "bg-red-100 text-red-700";
    if (qty <= 5)
      return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };




  const handleDelete = (productId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    dispatch(deleteProduct({ jwt, productId }));
    setToast("Product deleted successfully");

    setTimeout(() => setToast(""), 2000);
  };



  /* ================= UI ================= */
  return (
    <div className="p-4 md:p-6 bg-[#FFFCF7] min-h-screen">
      <h1 className="text-xl font-semibold mb-4 text-[#2B1B12]">
        All Products
      </h1>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-64"
        />

        <div className="flex gap-2">
          {["ALL", "IN", "LOW", "OUT"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-sm ${filter === f
                ? "bg-[#2B1B12] text-white"
                : "bg-[#F5EBDD]"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* BULK BAR */}
      {selectedIds.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-3 bg-[#2B1B12] text-white p-3 rounded-lg">
          <span>{selectedIds.length} selected</span>
          <button
            onClick={() => bulkSetQty(0)}
            className="px-3 py-1 bg-red-600 rounded"
          >
            Out of Stock
          </button>
          <button
            onClick={() => bulkSetQty(10)}
            className="px-3 py-1 bg-green-600 rounded"
          >
            Qty 10
          </button>
          <input
            type="number"
            placeholder="Custom"
            className="w-20 px-2 py-1 rounded text-black"
            onKeyDown={(e) => {
              if (e.key === "Enter")
                bulkSetQty(
                  Number((e.target as HTMLInputElement).value)
                );
            }}
          />
        </div>
      )}

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto border rounded-xl">
        <table className="min-w-full">
          <thead className="bg-[#2B1B12] text-[#F5EBDD]">
            <tr>
              <th />
              <th className="text-left px-4 py-2">Product</th>
              <th className="px-4 py-3 text-center">Stock</th>
              <th className="px-4 py-2">View</th>
              <th className="px-4 py-2">Edit</th>
              <th className="px-4 py-2">Delete</th>

              <th />
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p: any) => (
              <tr key={p._id} className="border-b">
                <td className="px-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(p._id)}
                    onChange={() =>
                      setSelectedIds((prev) =>
                        prev.includes(p._id)
                          ? prev.filter((x) => x !== p._id)
                          : [...prev, p._id]
                      )
                    }
                  />
                </td>

                <td className="px-4 py-3 flex gap-3">
                  <img
                    src={p.images?.[0]}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{p.title}</p>
                    {p.quantity <= 5 && p.quantity > 0 && (
                      <span className="text-xs text-red-600">
                        ⚠️ Low stock
                      </span>
                    )}
                  </div>
                </td>

                <td
                  className="px-4 py-3 cursor-pointer"
                  onClick={() => startEdit(p)}
                >
                  {editingId === p._id ? (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={editQty}
                        onChange={(e) =>
                          setEditQty(Number(e.target.value))
                        }
                        className="w-20 border px-2"
                      />
                      <Check
                        className="text-green-600 cursor-pointer"
                        onClick={() => saveEdit(p._id)}
                      />
                      <Close
                        className="text-red-600 cursor-pointer"
                        onClick={() =>
                          setEditingId(null)
                        }
                      />
                    </div>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${stockChip(
                        p.quantity
                      )}`}
                    >
                      {p.quantity === 0
                        ? "Out of Stock"
                        : `Qty ${p.quantity}`}
                    </span>
                  )}
                </td>

                <td className="px-4 text-center">
                  <Visibility
                    className="cursor-pointer text-gray-600 hover:text-black"
                    onClick={() =>
                      navigate(`/seller/products/view/${p._id}`)
                    }
                  />
                </td>


                <td className="px-4 text-center">
                  <Edit
                    className="cursor-pointer text-blue-600 hover:text-blue-800"
                    onClick={() =>
                      navigate(`/seller/products/edit/${p._id}`)
                    }
                  />
                </td>
                <td>
                  <Delete
                    className="cursor-pointer text-red-600 hover:text-red-800"
                    onClick={() => {
                      handleDelete(p._id);
                    }}

                  />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {filteredProducts.map((p: any) => (
          <div
            key={p._id}
            className="bg-white rounded-xl p-4 shadow"
          >
            <div className="flex gap-3">
              <img
                src={p.images?.[0]}
                className="w-16 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-medium">{p.title}</p>
                <span
                  className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${stockChip(
                    p.quantity
                  )}`}
                >
                  {p.quantity === 0
                    ? "Out of Stock"
                    : `Qty ${p.quantity}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow">
          {toast}
        </div>
      )}
    </div>
  );
};

export default AllProductsTable;
