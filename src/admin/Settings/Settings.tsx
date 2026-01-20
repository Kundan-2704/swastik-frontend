import  { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Divider,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Alert,
} from "@mui/material";

/* ================= COMPONENT ================= */

const Settings = () => {
  const [commission, setCommission] = useState(10); // %
  const [minPayout, setMinPayout] = useState(500); // ₹
  const [autoPayout, setAutoPayout] = useState(false);
  const [sellerApproval, setSellerApproval] = useState(true);
  const [productApproval, setProductApproval] = useState(true);

  const [success, setSuccess] = useState(false);

  const handleSave = () => {
    console.log({
      commission,
      minPayout,
      autoPayout,
      sellerApproval,
      productApproval,
    });

    // TODO: API call → save admin settings
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* ===== HEADER ===== */}
      <Box className="mb-6">
        <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
          Settings
        </Typography>
        <Typography variant="body2" className="text-[#7A6A58]">
          Platform configuration & business rules
        </Typography>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings updated successfully
        </Alert>
      )}

      {/* ===== COMMISSION SETTINGS ===== */}
      <Paper
        elevation={0}
        className="rounded-2xl p-5 mb-6"
        sx={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
      >
        <Typography variant="h6" className="font-semibold text-[#4A1F2A]">
          Commission Settings
        </Typography>

        <Divider className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Platform Commission (%)"
            type="number"
            value={commission}
            onChange={(e) => setCommission(Number(e.target.value))}
            helperText="Commission charged on each order"
            fullWidth
          />

          <TextField
            label="Minimum Payout Amount (₹)"
            type="number"
            value={minPayout}
            onChange={(e) => setMinPayout(Number(e.target.value))}
            helperText="Seller payout allowed after this amount"
            fullWidth
          />
        </div>
      </Paper>

      {/* ===== PAYOUT SETTINGS ===== */}
      <Paper
        elevation={0}
        className="rounded-2xl p-5 mb-6"
        sx={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
      >
        <Typography variant="h6" className="font-semibold text-[#4A1F2A]">
          Payout Settings
        </Typography>

        <Divider className="my-4" />

        <FormControlLabel
          control={
            <Switch
              checked={autoPayout}
              onChange={(e) => setAutoPayout(e.target.checked)}
            />
          }
          label="Enable Automatic Seller Payouts"
        />

        <Typography variant="body2" className="text-[#7A6A58] mt-2">
          If enabled, seller payouts will be processed automatically
          after order delivery & return window.
        </Typography>
      </Paper>

      {/* ===== APPROVAL SETTINGS ===== */}
      <Paper
        elevation={0}
        className="rounded-2xl p-5 mb-6"
        sx={{ background: "#FFFCF7", border: "1px solid #E3D4B6" }}
      >
        <Typography variant="h6" className="font-semibold text-[#4A1F2A]">
          Approval Settings
        </Typography>

        <Divider className="my-4" />

        <FormControlLabel
          control={
            <Switch
              checked={sellerApproval}
              onChange={(e) => setSellerApproval(e.target.checked)}
            />
          }
          label="Seller Approval Required"
        />

        <FormControlLabel
          control={
            <Switch
              checked={productApproval}
              onChange={(e) => setProductApproval(e.target.checked)}
            />
          }
          label="Product Approval Required"
        />

        <Typography variant="body2" className="text-[#7A6A58] mt-2">
          Disable only if you fully trust sellers (not recommended
          for handloom platforms).
        </Typography>
      </Paper>

      {/* ===== SAVE ACTION ===== */}
      <Box className="flex justify-end">
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: "#B9935A",
            "&:hover": { backgroundColor: "#A8844E" },
          }}
        >
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
