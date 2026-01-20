
import {
  Box,
  Paper,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import {
  CurrencyRupee,
  ShoppingBag,
  Store,
  TrendingUp,
} from "@mui/icons-material";

/* ================= MOCK DATA (API se aayega) ================= */

const summary = {
  totalRevenue: 245680,
  totalOrders: 128,
  totalCommission: 24568,
  activeSellers: 42,
};

const sellerWiseSales = [
  {
    seller: "Bastar Handloom",
    orders: 42,
    revenue: 98600,
  },
  {
    seller: "Kosa Kala Kendra",
    orders: 31,
    revenue: 74200,
  },
  {
    seller: "Tussar Threads",
    orders: 18,
    revenue: 52900,
  },
];

/* ================= COMPONENT ================= */

const SalesReport = () => {
  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* ===== HEADER ===== */}
      <Box className="mb-6">
        <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
          Sales Report
        </Typography>
        <Typography variant="body2" className="text-[#7A6A58]">
          Overall sales performance & seller contribution
        </Typography>
      </Box>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Paper
          elevation={0}
          className="rounded-2xl p-4"
          sx={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
        >
          <Typography variant="body2" className="text-[#7A6A58]">
            Total Revenue
          </Typography>
          <Typography variant="h6" className="text-[#4A1F2A]">
            ₹ {summary.totalRevenue.toLocaleString()}
          </Typography>
          <CurrencyRupee className="text-[#B9935A]" />
        </Paper>

        <Paper
          elevation={0}
          className="rounded-2xl p-4"
          sx={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
        >
          <Typography variant="body2" className="text-[#7A6A58]">
            Total Orders
          </Typography>
          <Typography variant="h6" className="text-[#4A1F2A]">
            {summary.totalOrders}
          </Typography>
          <ShoppingBag className="text-[#B9935A]" />
        </Paper>

        <Paper
          elevation={0}
          className="rounded-2xl p-4"
          sx={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
        >
          <Typography variant="body2" className="text-[#7A6A58]">
            Platform Commission
          </Typography>
          <Typography variant="h6" className="text-[#4A1F2A]">
            ₹ {summary.totalCommission.toLocaleString()}
          </Typography>
          <TrendingUp className="text-[#B9935A]" />
        </Paper>

        <Paper
          elevation={0}
          className="rounded-2xl p-4"
          sx={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
        >
          <Typography variant="body2" className="text-[#7A6A58]">
            Active Sellers
          </Typography>
          <Typography variant="h6" className="text-[#4A1F2A]">
            {summary.activeSellers}
          </Typography>
          <Store className="text-[#B9935A]" />
        </Paper>
      </div>

      {/* ===== SELLER WISE SALES ===== */}
      <Paper
        elevation={0}
        className="rounded-2xl p-5"
        sx={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
      >
        <Typography
          variant="h6"
          className="font-semibold text-[#4A1F2A]"
        >
          Seller-wise Sales
        </Typography>

        <Divider className="my-4" />

        <div className="space-y-4">
          {sellerWiseSales.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:justify-between md:items-center gap-3"
            >
              <Typography className="font-medium text-[#4A1F2A]">
                {item.seller}
              </Typography>

              <div className="flex gap-3">
                <Chip
                  label={`Orders: ${item.orders}`}
                  sx={{ backgroundColor: "#FFF5E7" }}
                />
                <Chip
                  label={`Revenue: ₹${item.revenue.toLocaleString()}`}
                  sx={{
                    backgroundColor: "#E8F5E9",
                    color: "#2E7D32",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Paper>
    </Box>
  );
};

export default SalesReport;
