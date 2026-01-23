import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  AccountBalance,
  CheckCircle,
  Visibility,
  Cancel,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  fetchAdminPayouts,
  updateAdminPayoutStatus,
} from "../../Redux Toolkit/Features/Admin/AdminPayoutSlice";

/* ================= COMPONENT ================= */

const PayoutTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { payouts, loading } = useAppSelector((state) => state.adminPayout);

  const [selectedPayout, setSelectedPayout] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectOpen, setRejectOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAdminPayouts());
  }, [dispatch]);

  /* ================= ACTIONS ================= */

  const approvePayout = (payoutId: string) => {
    dispatch(
      updateAdminPayoutStatus({
        payoutId,
        status: "processing",
      })
    );
  };

  const markAsPaid = () => {
    if (!selectedPayout) return;

    dispatch(
      updateAdminPayoutStatus({
        payoutId: selectedPayout,
        status: "paid",
      })
    );

    setPayOpen(false);
    setSelectedPayout(null);
  };

  const rejectPayout = () => {
    if (!selectedPayout || !rejectReason) return;

    dispatch(
      updateAdminPayoutStatus({
        payoutId: selectedPayout,
        status: "rejected",
      })
    );

    setRejectOpen(false);
    setRejectReason("");
    setSelectedPayout(null);
  };

  return (
    <Box className="bg-[#FFFDF9] min-h-screen">
      {/* HEADER */}
      <Box className="mb-6">
        <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
          Payouts
        </Typography>
        <Typography variant="body2" className="text-[#7A6A58]">
          Seller settlement & commission management
        </Typography>
      </Box>

      {/* LIST */}
      <div className="space-y-4">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <Paper key={i} className="rounded-2xl p-5">
              <Skeleton height={40} />
              <Skeleton height={40} />
            </Paper>
          ))
        ) : payouts.length === 0 ? (
          <Typography className="text-center text-gray-500 py-10">
            No payout requests yet
          </Typography>
        ) : (
          payouts.map((pay) => (
            <Paper
              key={pay._id}
              elevation={0}
              className="rounded-2xl p-5"
              style={{
                background: "#FFFCF7",
                border: "1px solid #E3D4B6",
              }}
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-4">
                {/* SELLER */}
                <div>
                  <Typography className="font-semibold text-[#4A1F2A]">
                    {pay.seller?.shopName}
                  </Typography>
                  <Typography variant="body2" className="text-[#7A6A58]">
                    Seller ID: {pay.seller?._id}
                  </Typography>
                </div>

                {/* AMOUNT */}
                <Chip
                  label={`Payout ₹${pay.amount.toLocaleString()}`}
                  sx={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}
                />

                {/* STATUS */}
                <Chip
                  label={pay.status.toUpperCase()}
                  sx={{
                    backgroundColor:
                      pay.status === "paid"
                        ? "#E8F5E9"
                        : pay.status === "rejected"
                        ? "#FDECEA"
                        : "#FFF3CD",
                    color:
                      pay.status === "paid"
                        ? "#2E7D32"
                        : pay.status === "rejected"
                        ? "#D32F2F"
                        : "#856404",
                    fontWeight: 500,
                  }}
                />

                {/* METHOD */}
                <Chip
                  label={pay.method.toUpperCase()}
                  sx={{
                    backgroundColor:
                      pay.method === "upi" ? "#E3F2FD" : "#FFF3CD",
                    color: pay.method === "upi" ? "#1565C0" : "#856404",
                  }}
                />

                {/* ACTIONS */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() =>
                      navigate(`/admin/sellers/${pay.seller?._id}`)
                    }
                  >
                    View Seller
                  </Button>

                  {pay.status === "pending" && (
                    <>
                      <Button
                        size="small"
                        color="warning"
                        onClick={() => approvePayout(pay._id)}
                      >
                        Approve
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        startIcon={<Cancel />}
                        onClick={() => {
                          setSelectedPayout(pay._id);
                          setRejectOpen(true);
                        }}
                      >
                        Reject
                      </Button>
                    </>
                  )}

                  {pay.status === "processing" && (
                    <Button
                      size="small"
                      color="success"
                      startIcon={<AccountBalance />}
                      onClick={() => {
                        setSelectedPayout(pay._id);
                        setPayOpen(true);
                      }}
                    >
                      Pay Seller
                    </Button>
                  )}

                  {pay.status === "paid" && (
                    <Chip
                      icon={<CheckCircle />}
                      label="Completed"
                      sx={{
                        backgroundColor: "#E8F5E9",
                        color: "#2E7D32",
                      }}
                    />
                  )}
                </div>
              </div>
            </Paper>
          ))
        )}
      </div>

      {/* ================= REJECT MODAL ================= */}
      <Dialog open={rejectOpen} onClose={() => setRejectOpen(false)}>
        <DialogTitle>Reject Payout</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectOpen(false)}>Cancel</Button>
          <Button color="error" onClick={rejectPayout}>
            Reject
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= PAY MODAL ================= */}
      <Dialog open={payOpen} onClose={() => setPayOpen(false)}>
        <DialogTitle>Confirm Payout</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to mark this payout as paid?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPayOpen(false)}>Cancel</Button>
          <Button color="success" onClick={markAsPaid}>
            Confirm & Pay
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PayoutTable;
