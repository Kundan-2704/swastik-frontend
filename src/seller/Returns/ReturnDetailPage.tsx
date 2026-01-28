import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { approveReturn, fetchSellerReturnById, rejectReturn } from "../../Redux Toolkit/Features/Seller/SellerReturnSlice";

const ReturnDetailPage = ({ returnId }: { returnId: string }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedReturn, loading } = useAppSelector(
    (state) => state.sellerReturns
  );

  useEffect(() => {
    dispatch(fetchSellerReturnById(returnId));
  }, [dispatch, returnId]);

  if (loading || !selectedReturn) return <div>Loading...</div>;

  return (
    <Box className="p-8">
      <Button onClick={() => navigate(-1)}>← Back</Button>

      <Card>
        <CardContent className="space-y-4">
          <Typography variant="h6">
            Return {selectedReturn.orderId}
          </Typography>

          <Chip label={selectedReturn.status} />

          <Typography>{selectedReturn.reason}</Typography>

          <Stack direction="row" spacing={2}>
            <Button
              color="success"
              variant="contained"
              onClick={() =>
                dispatch(approveReturn(selectedReturn._id))
              }
            >
              Approve
            </Button>

            <Button
              color="error"
              variant="outlined"
              onClick={() =>
                dispatch(
                  rejectReturn({
                    id: selectedReturn._id,
                    note: "Rejected by seller",
                  })
                )
              }
            >
              Reject
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReturnDetailPage;
