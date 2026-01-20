import {
  Badge,
  Box,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

export default function NotificationBell({ role }: { role: "CUSTOMER" | "SELLER" | "ADMIN" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // close on outside click
  useOnClickOutside(ref, () => setOpen(false));

  // role based selector
  const { list, unread } = useAppSelector((state) => {
    if (role === "CUSTOMER") return state.customerNotifications;
    if (role === "SELLER") return state.sellerNotifications;
    return state.adminNotifications;
  });

  const handleClick = (n: any) => {
    dispatch({ type: "notifications/markRead", payload: n._id }); // already in slice
    setOpen(false);
    navigate(n.link);
  };

  return (
    <Box ref={ref} sx={{ position: "relative" }}>
      {/* 🔔 BELL */}
      <IconButton onClick={() => setOpen(!open)}>
        <Badge badgeContent={unread} color="error">
          <NotificationsIcon sx={{ color: "#8B5E34" }} />
        </Badge>
      </IconButton>

      {/* 📥 DROPDOWN */}
      {open && (
        <Paper
          elevation={6}
          sx={{
            position: "absolute",
            right: 0,
            mt: 1,
            width: 360,
            maxHeight: 420,
            overflow: "hidden",
            borderRadius: 3,
            zIndex: 50,
          }}
        >
          {/* HEADER */}
          <Box p={2} display="flex" justifyContent="space-between">
            <Typography fontWeight={600}>Notifications</Typography>
            <Typography
              sx={{ cursor: "pointer", fontSize: 13 }}
              color="primary"
            >
              Mark all read
            </Typography>
          </Box>

          <Divider />

          {/* LIST */}
          <Box sx={{ maxHeight: 330, overflowY: "auto" }}>
            {list.length === 0 ? (
              <Box p={4} textAlign="center">
                <Typography color="text.secondary">
                  No notifications yet
                </Typography>
              </Box>
            ) : (
              list.slice(0, 10).map((n: any) => (
                <Box
                  key={n._id}
                  onClick={() => handleClick(n)}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    background: n.isRead ? "#fff" : "#FFF6ED",
                    borderBottom: "1px solid #eee",
                    "&:hover": { background: "#f9f9f9" },
                  }}
                >
                  <Typography fontWeight={n.isRead ? 400 : 600}>
                    {n.title}
                  </Typography>
                  <Typography fontSize={13} color="text.secondary">
                    {n.message}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
}
