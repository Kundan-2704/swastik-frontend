import React from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import {
  Inventory2,
  WarningAmber,
  Store,
  Visibility,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

/* ================= MOCK DATA (API se aayega) ================= */

const inventory = [
  {
    id: "INV001",
    productName: "Pure Kosa Silk Saree",
    seller: "Bastar Handloom",
    sku: "KOSA-001",
    stock: 18,
    threshold: 10,
    price: 6499,
  },
  {
    id: "INV002",
    productName: "Tussar Wedding Saree",
    seller: "Kosa Kala Kendra",
    sku: "TUSSAR-014",
    stock: 6,
    threshold: 10,
    price: 12499,
  },
  {
    id: "INV003",
    productName: "Daily Wear Handloom Saree",
    seller: "Tussar Threads",
    sku: "HAND-022",
    stock: 0,
    threshold: 5,
    price: 3999,
  },
];

/* ================= HELPERS ================= */

const stockStatus = (stock: number, threshold: number) => {
  if (stock === 0)
    return {
      label: "Out of Stock",
      bg: "#FDECEA",
      color: "#D32F2F",
      icon: <WarningAmber />,
    };

  if (stock <= threshold)
    return {
      label: "Low Stock",
      bg: "#FFF3CD",
      color: "#856404",
      icon: <WarningAmber />,
    };

  return {
    label: "In Stock",
    bg: "#E8F5E9",
    color: "#2E7D32",
    icon: <Inventory2 />,
  };
};

/* ================= COMPONENT ================= */

const InventoryTable = () => {
  const navigate = useNavigate();

  const handleViewProduct = (id: string) => {
    navigate(`/admin/products/${id}`);
  };

  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* ===== HEADER ===== */}
      <Box className="mb-6">
        <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
          Inventory
        </Typography>
        <Typography variant="body2" className="text-[#7A6A58]">
          Monitor product stock & availability
        </Typography>
      </Box>

      {/* ===== INVENTORY LIST ===== */}
      <div className="space-y-4">
        {inventory.map((item) => {
          const status = stockStatus(item.stock, item.threshold);

          return (
            <Paper
              key={item.id}
              elevation={0}
              className="rounded-2xl p-5"
              sx={{
                background: "#FFFCF7",
                border: "1px solid #E3D4B6",
              }}
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                {/* LEFT */}
                <div className="flex items-start gap-3">
                  <Store className="text-[#B9935A]" />

                  <div>
                    <Typography className="font-semibold text-[#4A1F2A]">
                      {item.productName}
                    </Typography>

                    <Typography variant="body2" className="text-[#7A6A58]">
                      Seller: {item.seller}
                    </Typography>

                    <Typography variant="body2" className="text-[#7A6A58]">
                      SKU: {item.sku}
                    </Typography>
                  </div>
                </div>

                {/* MIDDLE */}
                <div className="flex flex-wrap gap-3 items-center">
                  <Chip
                    label={`Stock: ${item.stock}`}
                    sx={{ backgroundColor: "#FFF5E7" }}
                  />

                  <Chip
                    icon={status.icon}
                    label={status.label}
                    sx={{
                      backgroundColor: status.bg,
                      color: status.color,
                      fontWeight: 500,
                    }}
                  />

                  <Chip
                    label={`₹ ${item.price}`}
                    sx={{ backgroundColor: "#E3F2FD", color: "#1565C0" }}
                  />
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2">
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => handleViewProduct(item.id)}
                  >
                    View Product
                  </Button>
                </div>
              </div>

              <Divider className="mt-4" />
            </Paper>
          );
        })}
      </div>

      {/* ===== EMPTY STATE ===== */}
      {inventory.length === 0 && (
        <Paper
          elevation={0}
          className="rounded-2xl p-10 mt-10 text-center"
          sx={{
            background: "#FFFCF7",
            border: "1px dashed #E3D4B6",
          }}
        >
          <Typography className="text-[#7A6A58]">
            Inventory is empty
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default InventoryTable;
