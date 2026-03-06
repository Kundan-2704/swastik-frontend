


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
// import { performLogout } from "../../Redux Toolkit/Features/Auth/AuthSlice";
// import { useLocation } from "react-router-dom";

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
//   const { jwt } = useAppSelector((state) => state.auth);

//   /* ✅ Cart Fetch */
//   useEffect(() => {
//     if (jwt) dispatch(fetchCart(jwt));
//   }, [jwt, dispatch]);

//   /* ✅ Safe Auth State (🔥 KEY FIX) */
//   const isAuthLoading = !userState.authChecked;

//   const safeUserState = isAuthLoading
//     ? { ...userState, user: undefined }   // 👈 Prevent UI shift
//     : userState;

//   const handleSearch = () => {
//     if (!searchQuery.trim()) return;

//     navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
//     setShowSearch(false);
//     setSearchQuery("");
//     setMobileMenu(false);
//   };

//   const handleLogout = () => {
//     dispatch(performLogout());
//     navigate("/", { replace: true });
//   };

//   const cartCount =
//     cart?.cartItems?.reduce(
//       (total, item) => total + item.quantity,
//       0
//     ) || 0;

//   const wishlistCount = Object.keys(wishlistItems || {}).length;

//   const location = useLocation();

//   const isProductPage = location.pathname.startsWith("/product-details");

//   return (
//     <>
//       {/* ✅ TOP NAVBAR (ALWAYS RENDERED) */}
//       <Box
//         className={`
//           ${isLarge ? "sticky top-0" : "fixed top-0"}
//           w-full z-50 bg-[#F8F3E8] navbar-shadow
//         `}
//       >
//         <SearchBar
//           showSearch={showSearch}
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           handleSearch={handleSearch}
//         />

//         <div className="flex items-center justify-between px-4 md:px-10 lg:px-20 h-[95px]">

//           <LogoSection
//             isLarge={isLarge}
//             setMobileMenu={setMobileMenu}
//             navigate={navigate}
//           />

//           {isLarge && (
//             <DesktopMenu
//               mainCategory={mainCategory}
//               setSelectedCategory={setSelectedCategory}
//               setShowSheet={setShowSheet}
//               selectedCategory={selectedCategory}
//               showSheet={showSheet}
//               navigate={navigate}
//             />
//           )}

//           {isLarge && (
//             <RightSection
//               isLarge={isLarge}
//               showSearch={showSearch}
//               setShowSearch={setShowSearch}
//               cartCount={cartCount}
//               wishlistCount={wishlistCount}
//               userState={safeUserState}   // 👈 KEY FIX
//               sellerAuth={sellerAuth}
//               navigate={navigate}
//             />
//           )}
//         </div>

//         <MobileDrawer
//           mobileMenu={mobileMenu}
//           setMobileMenu={setMobileMenu}
//           userState={safeUserState}   // 👈 KEY FIX
//           mainCategory={mainCategory}
//           sellerAuth={sellerAuth}
//           navigate={navigate}
//           onLogout={handleLogout}
//         />
//       </Box>

//       {/* ✅ MOBILE BOTTOM BAR */}
//       {!isLarge && !isProductPage && (
//         <div className="mobile-bottom-bar">
//           <RightSection
//             isLarge={isLarge}
//             showSearch={showSearch}
//             setShowSearch={setShowSearch}
//             cartCount={cartCount}
//             wishlistCount={wishlistCount}
//             userState={safeUserState}   // 👈 KEY FIX
//             sellerAuth={sellerAuth}
//             navigate={navigate}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;




import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { mainCategory } from "../../Data/Category/mainCategory";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import { fetchCart } from "../../Redux Toolkit/Features/Customer/CartSlice";

import SearchBar from "./SearchBar";
import LogoSection from "./LogoSection";
import DesktopMenu from "./DesktopMenu";
import MobileDrawer from "./MobileDrawer";
import RightSection from "./RightSection";
import { performLogout } from "../../Redux Toolkit/Features/Auth/AuthSlice";
import { fetchUserProfile, resetUserState } from "../../Redux Toolkit/Features/Customer/UserSlice";

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
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const { jwt } = useAppSelector((state) => state.auth);

  // ✅ Dispatch profile fetch immediately (runs on every reload + route change)
  useEffect(() => {
    if (jwt && !userState.authChecked) {
      dispatch(fetchUserProfile());
    } else if (!jwt) {
      dispatch(resetUserState()); // makes authChecked = true instantly
    }
  }, [jwt, dispatch, userState.authChecked]);

  // ✅ Cart fetch (keep as-is)
  useEffect(() => {
    if (jwt) dispatch(fetchCart(jwt));
  }, [jwt, dispatch]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    setShowSearch(false);
    setSearchQuery("");
    setMobileMenu(false);
  };

  const handleLogout = () => {
    dispatch(performLogout());
    navigate("/", { replace: true });
  };

  const cartCount = cart?.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  const wishlistCount = Object.keys(wishlistItems || {}).length;

  const location = useLocation();
  const isProductPage = location.pathname.startsWith("/product-details");

  const isAuthLoading = !userState.authChecked;

  return (
    <>
      {/* TOP NAVBAR */}
      <Box className={`${isLarge ? "sticky top-0" : "fixed top-0"} w-full z-50 bg-[#F8F3E8] navbar-shadow`}>
        <SearchBar
          showSearch={showSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />

        <div className="flex items-center justify-between px-4 md:px-10 lg:px-20 h-[95px]">
          <LogoSection
            isLarge={isLarge}
            setMobileMenu={setMobileMenu}
            navigate={navigate}
          />

          {isLarge && (
            <DesktopMenu
              mainCategory={mainCategory}
              setSelectedCategory={setSelectedCategory}
              setShowSheet={setShowSheet}
              selectedCategory={selectedCategory}
              showSheet={showSheet}
              navigate={navigate}
            />
          )}

          {isLarge && (
            <RightSection
              isLarge={isLarge}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              cartCount={cartCount}
              wishlistCount={wishlistCount}
              userState={userState}          // ← no more safeUserState
              isAuthLoading={isAuthLoading}   // ← NEW
              sellerAuth={sellerAuth}
              navigate={navigate}
            />
          )}
        </div>

        <MobileDrawer
          mobileMenu={mobileMenu}
          setMobileMenu={setMobileMenu}
          userState={userState}           // ← no more safeUserState
          isAuthLoading={isAuthLoading}    // ← NEW
          mainCategory={mainCategory}
          sellerAuth={sellerAuth}
          navigate={navigate}
          onLogout={handleLogout}
        />
      </Box>

      {/* MOBILE BOTTOM BAR */}
      {!isLarge && !isProductPage && (
        <div className="mobile-bottom-bar">
          <RightSection
            isLarge={isLarge}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            userState={userState}
            isAuthLoading={isAuthLoading}   // ← NEW
            sellerAuth={sellerAuth}
            navigate={navigate}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;