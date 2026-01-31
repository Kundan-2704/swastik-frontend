import { useState } from "react";
import { Button, MenuItem, Select, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { downloadMonthlyInvoices } from "../../Redux Toolkit/Features/Admin/AdminInvoiceBulkSlice";

const months = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

export default function AdminBulkInvoiceDownload() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((s) => s.adminInvoiceBulk);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <Box display="flex" gap={2}>
      <Select value={month} onChange={(e) => setMonth(+e.target.value)}>
        {months.map((m) => (
          <MenuItem key={m.id} value={m.id}>
            {m.name}
          </MenuItem>
        ))}
      </Select>

      <Select value={year} onChange={(e) => setYear(+e.target.value)}>
        {[2024, 2025, 2026].map((y) => (
          <MenuItem key={y} value={y}>
            {y}
          </MenuItem>
        ))}
      </Select>

      <Button
        variant="contained"
        disabled={loading}
        onClick={() => dispatch(downloadMonthlyInvoices({ month, year }))}
      >
        {loading ? "Preparing ZIP..." : "Download GST ZIP"}
      </Button>
    </Box>
  );
}
