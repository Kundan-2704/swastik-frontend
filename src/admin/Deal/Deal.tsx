import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Switch,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Add, Edit, Delete, Image } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  deleteDeals,
  getAllDeals,
  updateDeals,
} from "../../Redux Toolkit/Features/Admin/DealSlice";
import DealForm from "./DealForm";

const Deal = () => {
  const dispatch = useAppDispatch();

  const { deals, loading } = useAppSelector(
    (state) => state.adminDeal
  );

  const [openForm, setOpenForm] = useState(false);
  const [editDeal, setEditDeal] = useState<any>(null);

  /* ================= FETCH ================= */
  useEffect(() => {
    dispatch(getAllDeals());
  }, [dispatch]);

  /* ================= HANDLERS ================= */

  const handleToggle = (deal: any) => {
    dispatch(
      updateDeals({
        id: deal._id,
        deal: { active: !deal.active },
      })
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this deal?")) {
      dispatch(deleteDeals(id));
    }
  };

  const handleEdit = (deal: any) => {
    setEditDeal(deal);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditDeal(null);
  };

  return (
    <Box className="bg-[#FFFDF9] min-h-screen p-4">
      {/* HEADER */}
      <Box className="mb-6 flex items-center justify-between">
        <div>
          <Typography variant="h5" className="font-semibold text-[#4A1F2A]">
            Deals & Banners
          </Typography>
          <Typography variant="body2" className="text-[#7A6A58]">
            Manage homepage offers & promotions
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: "#B9935A",
            "&:hover": { backgroundColor: "#A8844E" },
          }}
          onClick={() => setOpenForm(true)}
        >
          Add New Deal
        </Button>
      </Box>

      {/* LOADING */}
      {loading && <Typography>Loading deals...</Typography>}

      {/* LIST */}
      <div className="space-y-4">
        {deals.map((deal: any) => (
          <Paper
            key={deal._id}
            elevation={0}
            className="rounded-2xl p-5"
            sx={{
              background: "#FFFCF7",
              border: "1px solid #E3D4B6",
            }}
          >
            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div>
                <Typography className="font-semibold text-[#4A1F2A]">
                  {deal.title}
                </Typography>
                <Typography variant="body2">
                  {deal.startDate} → {deal.endDate}
                </Typography>
              </div>

              <div className="flex gap-3 items-center">
                <Chip label={`${deal.discountType} ${deal.discountValue}`} />
                <Chip
                  label={deal.active ? "Active" : "Inactive"}
                  color={deal.active ? "success" : "error"}
                />
              </div>

              <div className="flex gap-2 items-center">
                <Switch
                  checked={deal.active}
                  onChange={() => handleToggle(deal)}
                />

                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleEdit(deal)}
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  color="error"
                  startIcon={<Delete />}
                  onClick={() => handleDelete(deal._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <Divider className="mt-4" />
          </Paper>
        ))}
      </div>

      {/* EMPTY */}
      {!loading && deals.length === 0 && (
        <Typography>No deals created yet</Typography>
      )}

      {/* MODAL */}
      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogContent>
          <DealForm deal={editDeal} onClose={handleCloseForm} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Deal;
