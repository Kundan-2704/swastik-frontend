import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import {
  Replay,
  CheckCircle,
  HourglassBottom,
} from "@mui/icons-material";

const Returns = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box className="p-8 bg-[#fdf9f3] min-h-screen space-y-8">
      {/* Header */}
      <Box className="flex justify-between items-center">
        <Typography variant="h4" fontWeight={700} className="text-[#3a2a1a]">
          Returns & Refunds
        </Typography>

        <Button
          variant="contained"
          startIcon={<Replay />}
          className="!bg-black !text-white !rounded-full !px-6"
        >
          Manage Returns
        </Button>
      </Box>

      {/* Summary */}
      <Box className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {loading ? (
          [...Array(4)].map((_, i) => (
            <Card key={i} className="rounded-2xl">
              <CardContent>
                <Skeleton width="60%" />
                <Skeleton width="80%" height={40} />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <SummaryCard title="Total Returns" value="84" />
            <SummaryCard title="Approved" value="62" />
            <SummaryCard title="Pending" value="15" />
            <SummaryCard title="Rejected" value="7" />
          </>
        )}
      </Box>

      {/* Return List */}
      <Card className="rounded-2xl shadow-sm border border-[#eee2d3]">
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            className="text-[#3a2a1a]"
          >
            Recent Return Requests
          </Typography>

          <Divider className="!my-4 !border-[#d2b48c]" />

          {loading ? (
            [...Array(4)].map((_, i) => (
              <Skeleton key={i} height={60} className="mb-4" />
            ))
          ) : (
            <Box className="space-y-5">
              <ReturnRow
                order="ORD-12045"
                product="Kosa Silk Saree"
                reason="Damaged product"
                status="Approved"
              />
              <ReturnRow
                order="ORD-12031"
                product="Tussar Saree"
                reason="Size issue"
                status="Pending"
              />
              <ReturnRow
                order="ORD-11998"
                product="Handloom Dupatta"
                reason="Not as expected"
                status="Rejected"
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Returns;

/* ---------------- Components ---------------- */

const SummaryCard = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <Card className="rounded-2xl shadow-sm border border-[#eee2d3]">
      <CardContent>
        <Typography className="text-[#a77a43]" fontWeight={600}>
          {title}
        </Typography>
        <Typography
          variant="h5"
          fontWeight={700}
          className="text-[#3a2a1a]"
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const ReturnRow = ({
  order,
  product,
  reason,
  status,
}: {
  order: string;
  product: string;
  reason: string;
  status: string;
}) => {
  const statusColor =
    status === "Approved"
      ? "!bg-[#2e7d32]"
      : status === "Pending"
      ? "!bg-[#ed6c02]"
      : "!bg-[#d32f2f]";

  return (
    <Box className="flex justify-between items-center">
      <Box>
        <Typography fontWeight={600} className="text-[#3a2a1a]">
          {order}
        </Typography>
        <Typography className="text-sm text-gray-600">
          {product} • {reason}
        </Typography>
      </Box>

      <Chip
        label={status}
        size="small"
        className={`${statusColor} !text-white`}
      />
    </Box>
  );
};
