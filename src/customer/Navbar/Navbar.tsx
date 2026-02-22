import React, { useEffect, useState } from "react";
import {
  AddShoppingCart,
  Menu,
  Search,
  Storefront,
  Close,
  Favorite,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { mainCategory } from "../../Data/Category/mainCategory";
import CategorySheet from "./CategorySheet";
import Logo from "../../assets/swastik-logo.png";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import NotificationBell from "../../components/NotificationBell";
import { fetchCart } from "../../Redux Toolkit/Features/Customer/CartSlice";

const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("sarees");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  



  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const userState = useAppSelector((state) => state.user);
  const sellerAuth = useAppSelector((state) => state.seller.sellerAuth);
  
  const cart = useAppSelector((state) => state.cart.cart);

  const jwt = localStorage.getItem("jwt");



  useEffect(() => {
  if (jwt) {
    dispatch(fetchCart(jwt));
  }
}, [jwt, dispatch]);

  

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    setShowSearch(false);
    setSearchQuery("");
    setMobileMenu(false);
  };



  const userId = useAppSelector(
  (state) => state.user.user?.id
);


const cartCount =
  cart?.cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  ) || 0;


  const wishlistItems = useAppSelector(
  (state) => state.wishlist.items
);

const wishlistCount = Object.keys(wishlistItems || {}).length;

  return (
    <Box className="sticky top-0 z-50 bg-[#F8F3E8] shadow-md">
      {/* SEARCH BAR */}
      {showSearch && (
        <div className="px-4 md:px-10 py-3 border-t border-[#ECDCC2]">
          <div className="flex gap-2 max-w-3xl mx-auto">
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search sarees, handloom, kosa silk..."
              className="w-full px-4 py-2 rounded-full border border-[#B5933A]"
            />
            <Button
              onClick={handleSearch}
              variant="contained"
              sx={{ backgroundColor: "#4A1F2A", borderRadius: "999px" }}
            >
              Search
            </Button>
          </div>
        </div>
      )}

      {/* TOP BAR */}
      {/* TOP BAR */}
<div className="flex items-center justify-between px-4 md:px-10 lg:px-20 h-[95px]">
  {/* LEFT */}
 <div className="flex items-center gap-2 sm:gap-3">
  {/* MOBILE MENU */}
  {!isLarge && (
    <IconButton
      onClick={() => setMobileMenu(true)}
      aria-label="Open menu"
      size="small"
    >
      <Menu sx={{ color: "#B5933A" }} />
    </IconButton>
  )}

  {/* LOGO + BRAND */}
  <div
    role="button"
    tabIndex={0}
    onClick={() => navigate("/")}
    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter") navigate("/");
    }}
    className="
      group
      flex items-center
      gap-2 sm:gap-3.5
      cursor-pointer
      select-none
      min-w-0
    "
  >
    {/* LOGO ICON */}
    <div
      className="
        relative
        w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12
        rounded-full
        bg-white
        ring-[0.5px] ring-[#C9A24D]/35
        shadow-sm
        flex items-center justify-center
        transition-transform duration-300
        group-hover:scale-[1.04]
        flex-shrink-0
      "
    >
      <img
        src={Logo}
        alt="Swastik Heritage Handloom Logo"
        className="w-full h-full rounded-full object-cover"
        draggable={false}
      />
    </div>

    {/* BRAND TEXT */}
    <div className="leading-tight truncate">
      <h1
        className="
          logo
          text-[1.25rem] sm:text-[1.45rem] md:text-[1.7rem]
          text-[#4A1F2A]
          tracking-wide
          truncate
        "
      >
        Swastik
      </h1>

      <p
        className="
          hidden sm:block
          text-[10px]
          uppercase
          tracking-[0.28em]
          text-[#A8824F]/70
          mt-0.5
        "
      >
        Heritage Woven Luxury
      </p>
    </div>
  </div>
</div>


  {/* CENTER */}
  {isLarge && (
    <div
      className="relative"
      onMouseLeave={() => setShowSheet(false)}
    >
      <ul className="flex gap-10 text-[15px] font-medium text-[#4A1F2A]">
        {mainCategory.slice(0, 5).map((item) => (
          <li
            key={item.categoryId}
            className="cursor-pointer hover:text-[#B5933A]"
            onMouseEnter={() => {
              setSelectedCategory(item.categoryId);
              setShowSheet(true);
            }}
            onClick={() => navigate(`/products/${item.categoryId}`)}
          >
            {item.name}
          </li>
        ))}
      </ul>

      {showSheet && (
        <div className="absolute left-0 top-full w-full">
          <CategorySheet
            selectedCategory={selectedCategory}
            onClose={() => setShowSheet(false)}
          />
        </div>
      )}
    </div>
  )}

  {/* RIGHT */}
  <div className="flex items-center gap-3">
    <IconButton onClick={() => setShowSearch(!showSearch)}>
      <Search sx={{ color: "#B5933A" }} />
    </IconButton>

    {/* 🔥 CART ICON (ALWAYS IN DOM) */}
    

  <IconButton
  id="cart-icon"
  onClick={() => navigate("/cart")}
  sx={{
    display: !isLarge && !userState.user?.fullName ? "none" : "flex",
    padding: { xs: 0.5, sm: 1 },
  }}
>
  <Badge
    badgeContent={cartCount}
    invisible={cartCount === 0}
    overlap="circular"
    sx={{
      "& .MuiBadge-badge": {
        backgroundColor: "#7A1F2B", // same as notification
        color: "#fff",
        fontSize: "10px",
        height: 16,
        minWidth: 16,
        boxShadow: "0 0 0 2px #F8F3E8",
      },
    }}
  >
    <AddShoppingCart
      sx={{
        color: "#B5933A",
        fontSize: { xs: 20, sm: 24 },
      }}
    />
  </Badge>
</IconButton>

<IconButton
  onClick={() => navigate("/wishlist")}
  sx={{
    padding: { xs: 0.5, sm: 1 },
  }}
>
  <Badge
    badgeContent={wishlistCount}
    invisible={wishlistCount === 0}
    overlap="circular"
    sx={{
      "& .MuiBadge-badge": {
        backgroundColor: "#7A1F2B",
        color: "#fff",
        fontSize: "10px",
        height: 16,
        minWidth: 16,
        boxShadow: "0 0 0 2px #F8F3E8",
      },
    }}
  >
    <Favorite
      sx={{
        color: "#B5933A",
        fontSize: { xs: 20, sm: 24 },
      }}
    />
  </Badge>
</IconButton>

    {/* MOBILE LOGIN */}
    {!isLarge && !userState.user?.fullName && (
      <Button
        onClick={() => navigate("/login")}
        size="small"
        variant="contained"
        sx={{ backgroundColor: "#4A1F2A", borderRadius: "999px" }}
      >
        Login
      </Button>
    )}

    {/* NOTIFICATION */}
    { userState.user?.fullName && <NotificationBell  />} 

    {/* MOBILE ACCOUNT AVATAR */}
{!isLarge && userState.user && (
  <IconButton onClick={() => navigate("/account")}>
    <Avatar
      sx={{
        width: 28,
        height: 28,
        bgcolor: "#4A1F2A",
        fontSize: 14,
      }}
    >
      {(userState.user.fullName || userState.user.email)
        .charAt(0)
        .toUpperCase()}
    </Avatar>
  </IconButton>
)}


    {/* DESKTOP USER */}
    {isLarge &&
      (userState.user?.fullName ? (
        <Button onClick={() => navigate("/account")}>
          {/* <Avatar sx={{ width: 28, height: 28 }} /> */}
           <Avatar
        sx={{
          width: 28,
          height: 28,
          bgcolor: "#4A1F2A",
          fontSize: 14,
        }}
      >
        {userState.user.email.charAt(0).toUpperCase()}
      </Avatar>
        </Button>
      ) : (
        <Button
          onClick={() => navigate("/login")}
          variant="contained"
          sx={{ backgroundColor: "#4A1F2A" }}
        >
          Login
        </Button>
      ))}

    {/* SELLER */}
    {isLarge && (
      <Button
        onClick={() =>
          navigate(sellerAuth.jwt ? "/seller" : "/become-seller")
        }
        variant="outlined"
        startIcon={<Storefront />}
      >
        {sellerAuth.jwt ? "Seller Dashboard" : "Become Seller"}
      </Button>
    )}
  </div>
</div>


{/* MOBILE DRAWER */}
<Drawer
  anchor="left"
  open={mobileMenu}
  onClose={() => setMobileMenu(false)}
>
  <div className="w-[280px] h-full flex flex-col">

    {/* HEADER */}
    <div className="flex items-center justify-between px-4 py-3 border-b">
      <h2 className="font-semibold text-lg">Menu</h2>
      <IconButton onClick={() => setMobileMenu(false)}>
        <Close />
      </IconButton>
    </div>

    {/* USER CARD */}
    {userState.user && (
      <div
        className="mx-4 my-4 p-3 rounded-lg flex items-center gap-3 cursor-pointer"
        style={{ backgroundColor: "#F7EFE6" }}
        onClick={() => {
          navigate("/account");
          setMobileMenu(false);
        }}
      >
        <Avatar sx={{ bgcolor: "#4A1F2A" }}>
          {(
            userState.user.fullName ||
            userState.user.email
          )
            ?.charAt(0)
            .toUpperCase()}
        </Avatar>

        <div className="text-sm">
          <p className="font-semibold">
            {userState.user.fullName || "My Account"}
          </p>
          <p className="text-gray-600 text-xs">
            {userState.user.email}
          </p>
        </div>
      </div>
    )}

    {/* CATEGORIES */}
    <div className="flex-1 overflow-y-auto px-4">
      {mainCategory.map((item) => (
        <div
          key={item.categoryId}
          className="py-3 border-b text-sm font-medium cursor-pointer"
          onClick={() => {
            navigate(`/products/${item.categoryId}`);
            setMobileMenu(false);
          }}
        >
          {item.name}
        </div>
      ))}
    </div>

    {/* ACTIONS */}
    <div className="p-4 space-y-2 border-t">
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          navigate("/cart");
          setMobileMenu(false);
        }}
      >
        Cart
      </Button>

      {!userState.user && (
        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#4A1F2A" }}
          onClick={() => {
            navigate("/login");
            setMobileMenu(false);
          }}
        >
          Login
        </Button>
      )}

      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          navigate(sellerAuth.jwt ? "/seller" : "/become-seller");
          setMobileMenu(false);
        }}
      >
        {sellerAuth.jwt ? "Seller Dashboard" : "Become Seller"}
      </Button>
    </div>
  </div>
</Drawer>



    </Box>
  );
};

export default Navbar;
