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
} from "@mui/material";
import { AccountBalanceWallet, Payments } from "@mui/icons-material";

const Payout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box className="p-8 bg-[#fdf9f3] min-h-screen">
      {/* Header */}
      <Box className="flex justify-between items-center mb-8">
        <Typography
          variant="h4"
          fontWeight={700}
          className="text-[#3a2a1a]"
        >
          Payouts
        </Typography>

        <Button
          variant="contained"
          startIcon={<Payments />}
          className="!bg-black !text-white !rounded-full !px-6 !py-2"
        >
          Request Payout
        </Button>
      </Box>

      {/* Summary Cards */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {loading ? (
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
            <SummaryCard title="Available Balance" amount="₹12,450" />
            <SummaryCard title="Pending Balance" amount="₹3,200" />
            <SummaryCard title="Total Earned" amount="₹56,800" />
          </>
        )}
      </Box>

      {/* History */}
      <Card className="rounded-2xl shadow-sm">
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            className="text-[#3a2a1a]"
          >
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
          ) : (
            <Box className="space-y-6">
              <HistoryRow
                date="12 Jan 2026"
                amount="₹5,000"
                status="Completed"
              />
              <HistoryRow
                date="05 Jan 2026"
                amount="₹3,200"
                status="Pending"
              />
              <HistoryRow
                date="28 Dec 2025"
                amount="₹4,800"
                status="Completed"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Payout;

/* ---------------- Components ---------------- */

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
          <Typography
            fontWeight={600}
            className="text-[#3a2a1a]"
          >
            {title}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          fontWeight={700}
          className="text-[#3a2a1a]"
        >
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
  return (
    <Box className="flex justify-between items-center">
      <Typography className="text-[#3a2a1a]">{date}</Typography>

      <Typography fontWeight={600} className="text-[#3a2a1a]">
        {amount}
      </Typography>

      <Chip
        label={status}
        size="small"
        className={
          status === "Completed"
            ? "!bg-[#2e7d32] !text-white"
            : "!bg-[#ed6c02] !text-white"
        }
      />
    </Box>
  );
};
