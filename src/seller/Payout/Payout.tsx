import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { AccountBalanceWallet, Payments } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";

import {
  fetchSellerPayoutHistory,
  fetchSellerPayoutSummary,
  requestSellerPayout,
} from "../../Redux Toolkit/Features/Seller/SellerPayoutSlice";

const Payout = () => {
  const dispatch = useAppDispatch();

  const { summary, history, loading } = useAppSelector(
    (state) => state.sellerPayout
  );

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    dispatch(fetchSellerPayoutSummary());
    dispatch(fetchSellerPayoutHistory());
  }, [dispatch]);

  const handleSubmit = () => {
    if (!amount || Number(amount) <= 0) return;

    dispatch(
      requestSellerPayout({
        amount: Number(amount),
        method: "upi",
      })
    );

    setAmount("");
    setOpen(false);
  };

  return (
    <Box className="p-8 bg-[#fdf9f3] min-h-screen">
      {/* HEADER */}
      <Box className="flex justify-between items-center mb-8">
        <Typography variant="h4" fontWeight={700} className="text-[#3a2a1a]">
          Payouts
        </Typography>

        <Button
          onClick={() => setOpen(true)}
          startIcon={<Payments />}
          sx={{
            backgroundColor: "#4A1F2A",
            color: "#fff",
            borderRadius: "999px",
            px: 3,
            py: 1,
            "&:hover": { backgroundColor: "#3a1720" },
          }}
        >
          Request Payout
        </Button>
      </Box>

      {/* SUMMARY */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {loading || !summary ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent>
                <Skeleton width="50%" />
                <Skeleton width="70%" height={40} />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
          <SummaryCard
  title="Available Balance"
  amount={`₹${(summary?.availableBalance ?? 0).toLocaleString()}`}
/>

<SummaryCard
  title="Pending Balance"
  amount={`₹${(summary?.holdBalance ?? 0).toLocaleString()}`}
/>

<SummaryCard
  title="Total Earned"
  amount={`₹${(summary?.totalEarnings ?? 0).toLocaleString()}`}
/>
          

          </>
        )}
      </Box>

      {/* HISTORY */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent>
          <Typography variant="h6" fontWeight={700} className="text-[#3a2a1a]">
            Payout History
          </Typography>

          <Divider className="!my-4 !border-[#d2b48c]" />

          {loading ? (
            [...Array(4)].map((_, i) => (
              <Box key={i} className="flex justify-between mb-4">
                <Skeleton width="25%" />
                <Skeleton width="15%" />
                <Skeleton width="12%" />
              </Box>
            ))
          ) : history.length === 0 ? (
            <Typography className="text-gray-500 text-center py-6">
              No payout history yet
            </Typography>
          ) : (
            <Box className="space-y-6">
              {history.map((item) => (
                <HistoryRow
                  key={item._id}
                  date={new Date(item.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  amount={`₹${item.amount.toLocaleString()}`}
                  status={item.status}
                />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Request Payout</DialogTitle>
        <DialogContent className="space-y-4 pt-4">
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />

          <Button
            fullWidth
            onClick={handleSubmit}
            sx={{
              mt: 2,
              backgroundColor: "#4A1F2A",
              color: "#fff",
              "&:hover": { backgroundColor: "#3a1720" },
            }}
          >
            Submit Request
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Payout;

/* ================= COMPONENTS ================= */

const SummaryCard = ({
  title,
  amount,
}: {
  title: string;
  amount: string;
}) => {
  return (
    <Card className="rounded-2xl shadow-sm border border-[#eee2d3]">
      <CardContent>
        <Box className="flex items-center gap-3 mb-3">
          <AccountBalanceWallet className="text-[#a77a43]" />
          <Typography fontWeight={600} className="text-[#3a2a1a]">
            {title}
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight={700} className="text-[#3a2a1a]">
          {amount}
        </Typography>
      </CardContent>
    </Card>
  );
};

const HistoryRow = ({
  date,
  amount,
  status,
}: {
  date: string;
  amount: string;
  status: string;
}) => {
  const label =
    status === "paid"
      ? "Completed"
      : status === "pending"
      ? "Pending"
      : status === "processing"
      ? "Processing"
      : status === "failed"
      ? "Failed"
      : "Rejected";

  return (
    <Box className="flex justify-between items-center">
      <Typography className="text-[#3a2a1a]">{date}</Typography>

      <Typography fontWeight={600} className="text-[#3a2a1a]">
        {amount}
      </Typography>

      <Chip
        label={label}
        size="small"
        className={
          status === "paid"
            ? "!bg-[#2e7d32] !text-white"
            : status === "failed"
            ? "!bg-red-600 !text-white"
            : "!bg-[#ed6c02] !text-white"
        }
      />
    </Box>
  );
};
