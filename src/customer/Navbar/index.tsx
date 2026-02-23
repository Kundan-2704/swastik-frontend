// import React, { useEffect, useState } from "react";
// import { Box, useMediaQuery, useTheme } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// import { mainCategory } from "../../Data/Category/mainCategory";
// import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
// import { fetchCart } from "../../Redux Toolkit/Features/Customer/CartSlice";
// import SearchBar from "./SearchBar";
// import LogoSection from "./LogoSection";
// import DesktopMenu from "./DesktopMenu";
// import MobileDrawer from "./MobileDrawer";
// import RightSection from "./RightSection";


// const Navbar = () => {
//   const theme = useTheme();
//   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

//   const [showSheet, setShowSheet] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("sarees");
//   const [showSearch, setShowSearch] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [mobileMenu, setMobileMenu] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();

//   const userState = useAppSelector((state) => state.user);
//   const sellerAuth = useAppSelector((state) => state.seller.sellerAuth);
//   const cart = useAppSelector((state) => state.cart.cart);
//   const wishlistItems = useAppSelector((state) => state.wishlist.items);

//   const jwt = localStorage.getItem("jwt");

//   useEffect(() => {
//     if (jwt) dispatch(fetchCart(jwt));
//   }, [jwt, dispatch]);

//   const handleSearch = () => {
//     if (!searchQuery.trim()) return;
//     navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
//     setShowSearch(false);
//     setSearchQuery("");
//     setMobileMenu(false);
//   };

//   const cartCount =
//     cart?.cartItems?.reduce(
//       (total, item) => total + item.quantity,
//       0
//     ) || 0;

//   const wishlistCount = Object.keys(wishlistItems || {}).length;

//   if (userState.loading) {
//     return <div style={{ height: "95px" }} />;
//   }

//   const showLogin = userState.authChecked && !userState.user;

//   return (
//     <Box className="sticky top-0 z-50 bg-[#F8F3E8] shadow-md">

//       <SearchBar
//         showSearch={showSearch}
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         handleSearch={handleSearch}
//       />

//       <div className="flex items-center justify-between px-4 md:px-10 lg:px-20 h-[95px]">

//         <LogoSection

//           isLarge={isLarge}
//           setMobileMenu={setMobileMenu}
//           navigate={navigate}
//         />

//         {isLarge && (
//           <DesktopMenu
//             mainCategory={mainCategory}
//             setSelectedCategory={setSelectedCategory}
//             setShowSheet={setShowSheet}
//             selectedCategory={selectedCategory}
//             showSheet={showSheet}
//             navigate={navigate}
//           />
//         )}

//       <RightSection
//   isLarge={isLarge}
//   showSearch={showSearch}
//   setShowSearch={setShowSearch}
//   cartCount={cartCount}
//   wishlistCount={wishlistCount}
//   showLogin={showLogin}
//   userState={userState}
//   sellerAuth={sellerAuth}
//   navigate={navigate}
// />
//       </div>

//       <MobileDrawer
//         mobileMenu={mobileMenu}
//         setMobileMenu={setMobileMenu}
//         userState={userState}
//         mainCategory={mainCategory}
//         sellerAuth={sellerAuth}
//         navigate={navigate}
//       />

//     </Box>
//   );
// };

// export default Navbar;