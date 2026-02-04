import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  IconButton,
  Menu,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppDispatch, useAppSelector } from "../Redux Toolkit/Store";
import {
  clearAllNotifications,
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "../Redux Toolkit/Features/Notification/notificationSlice";
const NotificationBell = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, unreadCount, loading } = useAppSelector(
    (state) => state.notification
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(fetchNotifications());

    const interval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 8000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleClickNotification = (n: any) => {
    dispatch(markNotificationRead(n._id));
    handleClose();

    if (n.type === "ORDER" && n.data?.orderId) {
      navigate(`/orders/${n.data.orderId}`);
    }
  };

  const handleMarkAllRead = () => {
  dispatch(markAllNotificationsRead());
};

const handleClearAll = () => {
  dispatch(clearAllNotifications());
  handleClose();
};


  return (
    <>
      <IconButton
  onClick={handleOpen}
  size="small"
  sx={{
    padding: { xs: 0.5, sm: 1 },
  }}
>
  <Badge
  badgeContent={unreadCount}
  overlap="circular"
  sx={{
    "& .MuiBadge-badge": {
      backgroundColor: "#7A1F2B",
      color: "#fff",
      fontSize: "10px",
      height: 16,
      minWidth: 16,
    },
  }}
>
  <NotificationsIcon
    sx={{
      color: "#B5933A",
      fontSize: { xs: 20, sm: 24 },
    }}
  />
</Badge>

</IconButton>


      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 360, maxHeight: 420 },
        }}
      >
        {/* <Box px={2} py={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            Notifications
          </Typography>
        </Box> */}


        <Box
  px={2}
  py={1}
  display="flex"
  alignItems="center"
  justifyContent="space-between"
>
  <Typography variant="subtitle1" fontWeight={600}>
    Notifications
  </Typography>

  <Box display="flex" gap={1}>
    <Typography
      variant="caption"
      sx={{ cursor: "pointer", color: "primary.main" }}
      onClick={handleMarkAllRead}
    >
      Mark all read
    </Typography>

    <Typography
      variant="caption"
      sx={{ cursor: "pointer", color: "error.main" }}
      onClick={handleClearAll}
    >
      Clear all
    </Typography>
  </Box>
</Box>


        <Divider />

        {loading && (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress size={20} />
          </Box>
        )}

        {!loading && items.length === 0 && (
          <Typography p={2} variant="body2" color="text.secondary">
            No notifications yet
          </Typography>
        )}

        <List disablePadding>
          {items.map((n) => (
            <ListItemButton
              key={n._id}
              onClick={() => handleClickNotification(n)}
              sx={{
                bgcolor: n.isRead ? "transparent" : "rgba(25,118,210,0.08)",
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="body2" fontWeight={600}>
                    {n.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="caption" color="text.secondary">
                      {n.message}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="text.disabled">
                      {new Date(n.createdAt).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Menu>
    </>
  );
};

export default NotificationBell;
