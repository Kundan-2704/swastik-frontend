import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Skeleton,
  Typography,
  Chip,
  Button,
  Tabs,
  Tab,
  IconButton,
  Stack,
} from "@mui/material";
import {
  Replay,
  CheckCircle,
  HourglassBottom,
  Close,
  Visibility,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import ReturnDetailPage from "./ReturnDetailPage";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { fetchSellerReturns } from "../../Redux Toolkit/Features/Seller/SellerReturnSlice";

const Returns = () => {
  const navigate = useNavigate();
  const { returnId } = useParams<{ returnId: string }>();
  const dispatch = useAppDispatch();

  const { returns, loading } = useAppSelector(
    (state) => state.sellerReturns
  );

  const [tab, setTab] = React.useState(0);

  useEffect(() => {
    dispatch(fetchSellerReturns());
  }, [dispatch]);

  /* DETAIL MODE */
  if (returnId) {
    return <ReturnDetailPage returnId={returnId} />;
  }

  const filtered = returns.filter((r) => {
    if (tab === 1) return r.status === "PENDING";
    if (tab === 2) return r.status === "APPROVED";
    if (tab === 3) return r.status === "REJECTED";
    return true;
  });

  return (
    <Box className="p-8 bg-[#fdf9f3] min-h-screen space-y-8">
      {/* Header */}
      <Box className="flex justify-between items-center">
        <Typography variant="h4" fontWeight={700}>
          Returns & Refunds
        </Typography>

        <Button
          onClick={() => dispatch(fetchSellerReturns())}
          variant="contained"
          startIcon={<Replay />}
        >
          Refresh
        </Button>
      </Box>

      {/* Tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)}>
        <Tab label="All" />
        <Tab label="Pending" />
        <Tab label="Approved" />
        <Tab label="Rejected" />
      </Tabs>

      {/* List */}
      <Card>
        <CardContent>
          <Divider />

          {loading ? (
            [...Array(4)].map((_, i) => (
              <Skeleton key={i} height={60} className="mb-4" />
            ))
          ) : (
            <Stack spacing={2}>
              {filtered.map((r) => (
                <Box
                  key={r._id}
                  className="flex justify-between items-center border p-4 rounded-xl"
                >
                  <Box>
                    <Typography fontWeight={600}>{r.orderId}</Typography>
                    <Typography className="text-sm text-gray-600">
                      {r.reason}
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    <Chip label={r.status} />
                    <IconButton
                      onClick={() =>
                        navigate(`/seller/returns/${r._id}`)
                      }
                    >
                      <Visibility />
                    </IconButton>
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Returns;
