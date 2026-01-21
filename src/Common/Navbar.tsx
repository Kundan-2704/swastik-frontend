import { Menu } from '@mui/icons-material';
import { Drawer, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import store, { useAppDispatch, useAppSelector } from '../Redux Toolkit/Store';

const Navbar = ({ DrawerList }: any) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const role = useAppSelector((state) => state.auth.role);



  const dispatch = useAppDispatch();




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
