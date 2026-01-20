import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
} from "@mui/material";
import {
  BarChart,
  ShoppingCart,
  Payments,
  TrendingUp,
} from "@mui/icons-material";

const Reports = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box className="p-8 bg-[#fdf9f3] min-h-screen space-y-8">
      {/* Header */}
      <Typography variant="h4" fontWeight={700} className="text-[#3a2a1a]">
        Reports
      </Typography>

      {/* Summary Cards */}
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
            <SummaryCard
              title="Total Orders"
              value="1,248"
              icon={<ShoppingCart />}
            />
            <SummaryCard
              title="Total Revenue"
              value="₹3,45,600"
              icon={<Payments />}
            />
            <SummaryCard
              title="Total Products"
              value="126"
              icon={<BarChart />}
            />
            <SummaryCard
              title="Growth"
              value="+18.5%"
              icon={<TrendingUp />}
            />
          </>
        )}
      </Box>

      {/* Monthly Report */}
      <Card className="rounded-2xl shadow-sm border border-[#eee2d3]">
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            className="text-[#3a2a1a]"
          >
            Monthly Performance
          </Typography>

          <Divider className="!my-4 !border-[#d2b48c]" />

          {loading ? (
            <Skeleton height={180} />
          ) : (
            <Box className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <ReportStat label="Jan" value="₹32,000" />
              <ReportStat label="Feb" value="₹28,400" />
              <ReportStat label="Mar" value="₹41,800" />
              <ReportStat label="Apr" value="₹53,200" />
              <ReportStat label="May" value="₹46,500" />
              <ReportStat label="Jun" value="₹59,100" />
              <ReportStat label="Jul" value="₹62,700" />
              <ReportStat label="Aug" value="₹71,900" />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Top Selling */}
      <Card className="rounded-2xl shadow-sm border border-[#eee2d3]">
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            className="text-[#3a2a1a]"
          >
            Top Selling Products
          </Typography>

          <Divider className="!my-4 !border-[#d2b48c]" />

          {loading ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} height={40} className="mb-3" />
            ))
          ) : (
            <Box className="space-y-3">
              <TopRow name="Kosa Silk Saree" sales="124 orders" />
              <TopRow name="Tussar Handloom Saree" sales="98 orders" />
              <TopRow name="Handloom Dupatta" sales="65 orders" />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reports;

/* ---------------- Components ---------------- */

const SummaryCard = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card className="rounded-2xl shadow-sm border border-[#eee2d3]">
      <CardContent>
        <Box className="flex items-center gap-3 mb-3 text-[#a77a43]">
          {icon}
          <Typography fontWeight={600} className="text-[#3a2a1a]">
            {title}
          </Typography>
        </Box>
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

const ReportStat = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Box className="bg-white rounded-xl p-4 border border-[#eee2d3] text-center">
      <Typography className="text-[#a77a43]" fontWeight={600}>
        {label}
      </Typography>
      <Typography fontWeight={700} className="text-[#3a2a1a]">
        {value}
      </Typography>
    </Box>
  );
};

const TopRow = ({
  name,
  sales,
}: {
  name: string;
  sales: string;
}) => {
  return (
    <Box className="flex justify-between items-center">
      <Typography className="text-[#3a2a1a]">{name}</Typography>
      <Typography fontWeight={600} className="text-[#3a2a1a]">
        {sales}
      </Typography>
    </Box>
  );
};
