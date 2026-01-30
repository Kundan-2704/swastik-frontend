// import React, { useState } from "react";

// import {
//   AccountCircle,
//   AddShoppingCart,
//   FavoriteBorder,
//   Menu,
//   Search,
//   Storefront,
// } from "@mui/icons-material";
// import {
//   Avatar,
//   Box,
//   Button,
//   IconButton,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";

// import { mainCategory } from "../../Data/Category/mainCategory";
// import CategorySheet from "./CategorySheet";

// // logo
// import Logo from "../../assets/swastik-logo.png";

// import { useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../Redux Toolkit/Store";

// const Navbar = () => {

//   const theme = useTheme();
//   const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

//   const [showSheet, setShowSheet] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("sarees");

//   const [showSearch, setShowSearch] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");


//   const navigate = useNavigate();

//   const handleSearch = () => {
//     if (!searchQuery.trim()) return;

//     navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
//     console.log("SEARCH QUERY 👉", searchQuery);
//     setShowSearch(false);
//     setSearchQuery("");
//   };


//   // ✅ correct selector (NO warning)
//   const userState = useAppSelector((state) => state.user);
//   // console.log("USER STATE 👉", userState);

//   const sellerAuth = useAppSelector(state => state.seller.sellerAuth);


//   return (
//     <Box className="sticky top-0 left-0 right-0 z-50 bg-[#F8F3E8] shadow-[0_4px_12px_rgba(0,0,0,0.05)] backdrop-blur-md">

//       {showSearch && (
//         <div className="w-full bg-[#F8F3E8] border-t border-[#ECDCC2] px-4 md:px-10 lg:px-20 py-3">
//           <div className="max-w-3xl mx-auto flex items-center gap-3">
//             <input
//               type="text"
//               placeholder="Search sarees, handloom, kosa silk..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//               className="w-full px-4 py-2 rounded-full border border-[#B5933A] focus:outline-none focus:ring-2 focus:ring-[#B5933A]"
//             />

//             <Button
//               onClick={handleSearch}
//               variant="contained"
//               sx={{
//                 backgroundColor: "#4A1F2A",
//                 borderRadius: "999px",
//                 px: "22px",
//                 textTransform: "none",
//                 "&:hover": { backgroundColor: "#34121C" },
//               }}
//             >
//               Search
//             </Button>
//           </div>
//         </div>
//       )}


//       {/* TOP BAR */}
//       <div className="flex items-center justify-between px-4 md:px-10 lg:px-20 h-[95px] border-b border-[#ECDCC2]">

//         {/* LEFT : LOGO */}
//         <div className="flex items-center gap-4">
//           {!isLarge && (
//             <IconButton>
//               <Menu sx={{ fontSize: 30, color: "#B5933A" }} />
//             </IconButton>
//           )}

//           <div className="flex items-center gap-3">
//             <img
//               src={Logo}
//               alt="Swastik Logo"
//               className="w-10 h-10 md:w-12 md:h-12 object-contain"
//             />

//             <div className="flex flex-col leading-tight">
//               <h1
//                 onClick={() => navigate("/")}
//                 className="logo text-2xl md:text-3xl text-[#4A1F2A] cursor-pointer"
//               >
//                 Swastik
//               </h1>
//               <span className="text-[9px] md:text-[10.5px] tracking-[0.32em] uppercase text-[#A8824F] font-medium -mt-1">
//                 Kosa • Tassar • Handcrafted
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* CENTER : NAV LINKS */}
//         <ul className="hidden md:flex items-center gap-10 text-[15px] font-medium text-[#4A1F2A]">
//           {mainCategory.slice(0, 5) // 👈 sirf first 5 categories
//             .map((item) => (
//               <li
//                 key={item.categoryId}
//                 // onClick={() => 
//                 //   navigate(`/products/${item.categoryid}`)
//                 // }
//                 onClick={() =>
//                   navigate(`/products/${item.categoryId}`)
//                 }
//                 onMouseEnter={() => {
//                   setSelectedCategory(item.categoryId);
//                   setShowSheet(true);
//                 }}
//                 onMouseLeave={() => {
//                   setSelectedCategory(item.categoryId);
//                   setShowSheet(false);
//                 }}

//                 className="relative group cursor-pointer py-2 hover:text-[#B5933A] transition-all"
//               >
//                 {item.name}

//                 <span
//                   className="
//           absolute left-0 -bottom-[6px] w-0 h-[2px]
//           bg-[#B5933A] transition-all duration-300
//           group-hover:w-full
//         "
//                 />
//               </li>
//             ))}
//         </ul>


//         {/* RIGHT : ACTIONS */}
//         <div className="flex items-center gap-3 md:gap-5">
//           <IconButton onClick={() => setShowSearch(!showSearch)}>
//             <Search sx={{ fontSize: 26, color: "#B5933A" }} />
//           </IconButton>


//           {/* LOGIN / USER */}
//           {userState.user?.fullName
//             ? (
//               <Button
//                 onClick={() => navigate("/account")}
//                 className="flex items-center gap-2"
//               >
//                 <Avatar sx={{ width: 28, height: 28 }} />
//                 <span className="hidden md:block text-sm font-medium text-[#4A1F2A]">
//                   {userState.user?.fullName
//                   }
//                 </span>
//               </Button>
//             ) : (
//               <Button
//                 onClick={() => navigate("/login")}
//                 variant="contained"
//                 startIcon={<AccountCircle />}
//                 sx={{
//                   backgroundColor: "#4A1F2A",
//                   borderRadius: "999px",
//                   px: "22px",
//                   py: "7px",
//                   textTransform: "none",
//                   fontWeight: 600,
//                   "&:hover": { backgroundColor: "#34121C" },
//                 }}
//               >
//                 Login
//               </Button>
//             )}

//           <IconButton>
//             <FavoriteBorder sx={{ fontSize: 24, color: "#B5933A" }} />
//           </IconButton>

//           <IconButton onClick={() => navigate("/cart")}>
//             <AddShoppingCart sx={{ fontSize: 24, color: "#B5933A" }} />
//           </IconButton>

//           {/* <Button
//             onClick={() => navigate("/become-seller")}
//             variant="outlined"
//             startIcon={<Storefront />}
//             className="hidden md:flex"
//             sx={{
//               borderColor: "#B5933A",
//               color: "#4A1F2A",
//               borderRadius: "999px",
//               textTransform: "none",
//               px: "18px",
//               "&:hover": {
//                 borderColor: "#4A1F2A",
//                 backgroundColor: "#EFE5D4",
//               },
//             }}
//           >
//             Become Seller
//           </Button> */}
//           {sellerAuth.jwt ? (
//             <Button
//               onClick={() => navigate("/seller")}
//               variant="contained"
//               startIcon={<Storefront />}
//             >
//               Seller Dashboard
//             </Button>
//           ) : (
//             <Button
//               onClick={() => navigate("/become-seller")} // ✅ FIXED
//               variant="outlined"
//               startIcon={<Storefront />}
//             >
//               Become Seller
//             </Button>
//           )}



//         </div>
//       </div>

//       {/* CATEGORY SHEET */}
//       {showSheet && (
//         <div
//           className="absolute left-0 right-0 top-[95px] pt-3"
//           onMouseEnter={() => setShowSheet(true)}
//           onMouseLeave={() => setShowSheet(false)}
//         >
//           <CategorySheet selectedCategory={selectedCategory} />
//         </div>
//       )}
//     </Box>
//   );
// };

// export default Navbar;







import React, { useEffect, useState } from "react";
import {
  AddShoppingCart,
  Menu,
  Search,
  Storefront,
  Close,
} from "@mui/icons-material";
import {
  Avatar,
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
import NotificationBell from "../../Components/NotificationBell";

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
  <div className="flex items-center gap-3">
    {!isLarge && (
      <IconButton onClick={() => setMobileMenu(true)}>
        <Menu sx={{ color: "#B5933A" }} />
      </IconButton>
    )}

    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <img src={Logo} className="w-10 h-10 md:w-12 md:h-12" />
      <div>
        <h1 className="logo text-2xl md:text-3xl text-[#4A1F2A]">
          Swastik
        </h1>
        <p className="text-[10px] tracking-widest text-[#A8824F]">
          KOSA • HANDLOOM
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
      }}
    >
      <AddShoppingCart sx={{ color: "#B5933A" }} />
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
    {userState.user?.fullName && <NotificationBell />}

    {/* DESKTOP USER */}
    {isLarge &&
      (userState.user?.fullName ? (
        <Button onClick={() => navigate("/account")}>
          <Avatar sx={{ width: 28, height: 28 }} />
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
        <div className="w-[280px] p-4 space-y-4">
          <div className="flex justify-between">
            <h2 className="font-bold">Menu</h2>
            <IconButton onClick={() => setMobileMenu(false)}>
              <Close />
            </IconButton>
          </div>

          {mainCategory.map((item) => (
            <div
              key={item.categoryId}
              className="py-2 border-b cursor-pointer"
              onClick={() => {
                navigate(`/products/${item.categoryId}`);
                setMobileMenu(false);
              }}
            >
              {item.name}
            </div>
          ))}

          <Button fullWidth onClick={() => navigate("/cart")}>
            Cart
          </Button>

          {userState.user?.fullName ? (
            <Button fullWidth onClick={() => navigate("/account")}>
              My Account
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          )}

          <Button
            fullWidth
            variant="outlined"
            onClick={() =>
              navigate(sellerAuth.jwt ? "/seller" : "/become-seller")
            }
          >
            {sellerAuth.jwt ? "Seller Dashboard" : "Become Seller"}
          </Button>
        </div>
      </Drawer>
    </Box>
  );
};

export default Navbar;
