import React, { useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Chip,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import {
  CheckCircle,
  Cancel,
  Block,
  Verified,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  fetchSellerById,
  updateSellerAccountStatus,
} from "../../Redux Toolkit/Features/Seller/SellerSlice";

/* ================= SECTION WRAPPER ================= */
const Section = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      mb: 4,
      borderRadius: "16px",
      border: "1px solid #E3D4B6",
      background: "#FFFCF7",
    }}
  >
    <Box mb={2} display="flex" justifyContent="space-between">
      <Typography fontWeight={600} color="#4A1F2A">
        {title}
      </Typography>
      <Typography fontSize={13} color="#7A6A58">
        {subtitle}
      </Typography>
    </Box>
    {children}
  </Paper>
);

const SellerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sellerState = useAppSelector(
    (state) => state.sellerManagement || {}
  );

  const {
    selectedSeller,
    loading = false,
    error = null,
  } = sellerState;

  /* ================= FETCH SELLER ================= */
  useEffect(() => {
    if (id) {
      dispatch(fetchSellerById(id));
    }
  }, [dispatch, id]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Box className="p-10 text-center">
        <CircularProgress />
      </Box>
    );
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  /* ================= EMPTY ================= */
  if (!selectedSeller) {
    return (
      <Typography color="text.secondary" align="center" mt={4}>
        Seller not found
      </Typography>
    );
  }

  const seller = selectedSeller;
  const business = seller.businessDetails;
  const pickup = seller.pickupAddress;
  const bank = seller.bankDetails;
  const pan = seller.panDetails;

  /* ================= ACTIONS ================= */
  const handleStatus = async (status: string) => {
    await dispatch(
      updateSellerAccountStatus({
        sellerId: seller._id,
        status,
      })
    );

    // re-fetch to keep UI in sync
    if (id) dispatch(fetchSellerById(id));
  };

  return (
    <Box className="bg-[#FFFDF9] min-h-screen p-6">
      {/* ================= HEADER ================= */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "16px",
          border: "1px solid #E3D4B6",
          background: "#FFF8ED",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Box>
            <Typography fontWeight={700} color="#4A1F2A">
              Seller Approval Panel
            </Typography>

            <Stack direction="row" spacing={1} mt={1}>
              <Chip
                label={`Status: ${seller.accountStatus}`}
                color={
                  seller.accountStatus === "APPROVED"
                    ? "success"
                    : seller.accountStatus === "REJECTED"
                    ? "error"
                    : "warning"
                }
              />

              <Chip
                icon={<Verified />}
                label={`KYC: ${seller.kycStatus}`}
                color={
                  seller.kycStatus === "VERIFIED"
                    ? "success"
                    : "warning"
                }
              />
            </Stack>
          </Box>

          <Stack direction="row" spacing={2}>
            {seller.accountStatus !== "APPROVED" && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircle />}
                onClick={() => handleStatus("APPROVED")}
              >
                Approve
              </Button>
            )}

            {seller.accountStatus !== "REJECTED" && (
              <Button
                variant="contained"
                color="error"
                startIcon={<Cancel />}
                onClick={() => handleStatus("REJECTED")}
              >
                Reject
              </Button>
            )}

            <Button
              variant="outlined"
              color="error"
              startIcon={<Block />}
              onClick={() => handleStatus("BLOCKED")}
            >
              Block
            </Button>

            <Button onClick={() => navigate(-1)}>⬅ Back</Button>
          </Stack>
        </Stack>
      </Paper>

      {/* ================= PERSONAL & BUSINESS ================= */}
      <Section
        title="Personal & Business Info"
        subtitle="Verify before approval"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name"
              value={seller.sellerName || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={seller.email || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              value={seller.mobile || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Business Name"
              value={business?.businessName || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="GST"
              value={seller?.GSTIN || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="PAN"
              value={pan?.panNumber || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="PAN"
              value={pan?.panHolderName || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </Section>

      {/* ================= PICKUP ================= */}
      <Section title="Pickup Address" subtitle="Courier pickup location">
        <Typography>
          {pickup
            ? `${pickup.address}, ${pickup.locality}, ${pickup.city}, ${pickup.state} - ${pickup.pinCode}`
            : "N/A"}
        </Typography>
      </Section>

      {/* ================= BANK ================= */}
      <Section title="Bank Verification" subtitle="Check payout details">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Account Holder"
              value={bank?.accountHolderName || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Account Number"
              value={bank?.accountNumber || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="IFSC"
              value={bank?.ifscCode || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Bank Name"
              value={bank?.bankName || ""}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
};

export default SellerDetails;
