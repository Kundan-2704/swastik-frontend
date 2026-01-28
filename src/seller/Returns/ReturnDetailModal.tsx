import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Chip,
  Button,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";
import {
  CheckCircle,
  Close,
  LocalShipping,
} from "@mui/icons-material";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ReturnDetailModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Box className="space-y-6">
          {/* Header */}
          <Box className="flex justify-between items-center">
            <Typography variant="h6" fontWeight={700}>
              Return Request - ORD-12031
            </Typography>
            <Chip label="PENDING" color="warning" />
          </Box>

          <Divider />

          {/* Product */}
          <Box className="flex gap-4">
            <Avatar
              variant="rounded"
              src="https://via.placeholder.com/80"
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography fontWeight={600}>Tussar Saree</Typography>
              <Typography className="text-sm text-gray-500">
                Reason: Size issue
              </Typography>
              <Typography className="text-sm text-gray-500">
                Quantity: 1
              </Typography>
            </Box>
          </Box>

          {/* Images */}
          <Stack direction="row" spacing={2}>
            {[1, 2, 3].map((i) => (
              <Avatar
                key={i}
                variant="rounded"
                src="https://via.placeholder.com/100"
                sx={{ width: 70, height: 70 }}
              />
            ))}
          </Stack>

          <Divider />

          {/* Actions */}
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              startIcon={<Close />}
              color="error"
              variant="outlined"
            >
              Reject
            </Button>
            <Button
              startIcon={<CheckCircle />}
              color="success"
              variant="contained"
            >
              Approve
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ReturnDetailModal;
