import { Menu } from '@mui/icons-material';
import { Drawer, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import store, { useAppDispatch, useAppSelector } from '../Redux Toolkit/Store';
import NotificationBell from '../Components/Notifications/NotificationBell';
import { socket } from '../socket';
import { fetchAdminNotifications } from '../Redux Toolkit/Features/Admin/NotificationSlice';
import { fetchSellerNotifications } from '../Redux Toolkit/Features/Seller/NotificationSlice';

const Navbar = ({ DrawerList }: any) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const role = useAppSelector((state) => state.auth.role);

  const unread = useAppSelector((state) => {
    if (role === "SELLER") return state.sellerNotifications.unread;
    if (role === "ADMIN") return state.adminNotifications.unread;
    return 0;
  });


  const dispatch = useAppDispatch();

useEffect(() => {
  if (!role) return;

  if (role === "SELLER") {
    const sellerId = store.getState().sellerManagement.profile?._id;
    if (!sellerId) return;

    socket.emit("join", sellerId);

    socket.on("notification", () => {
      
      dispatch(fetchSellerNotifications());
    });
  }

  if (role === "ADMIN") {
    socket.emit("join", "ADMIN");

    socket.on("notification", () => {
      dispatch(fetchAdminNotifications());
    });
  }

  return () => {
    socket.off("notification");
  };
}, [role, dispatch]);



  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="h-12 px-5 border-b bg-[#FFFCF7] flex items-center justify-between shadow-sm">

      {/* LEFT : MENU BUTTON + LOGO */}
      <div className="flex items-center gap-3">
        <IconButton onClick={toggleDrawer(true)} color="primary">
          <Menu sx={{ fontSize: 28, color: "#8B5E34" }} />
        </IconButton>

        <h1
          onClick={() => navigate("/")}
          className="logo text-2xl cursor-pointer text-[#4A1F2A] tracking-wide"
        >
          Swastik
        </h1>
      </div>

      {/* RIGHT : EMPTY (future: cart / profile / search) */}
      <div className="flex items-center gap-3">
        <NotificationBell role={role as any} />

      </div>


      <Drawer open={open} onClose={toggleDrawer(false)}>
        <div className="w-72 bg-[#FFF8ED] h-full p-5">
          <DrawerList toggleDrawer={toggleDrawer} />
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
