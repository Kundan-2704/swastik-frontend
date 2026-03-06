// import React from "react";
// import { Drawer, Button, IconButton, Avatar } from "@mui/material";
// import { Close } from "@mui/icons-material";
// import type { NavigateFunction } from "react-router-dom";

// interface Category {
//   categoryId: string;
//   name: string;
// }

// interface SellerAuth {
//   jwt?: string | null;
// }

// interface User {
//   fullName?: string;
//   email: string;
// }

// interface UserState {
//   user?: User | null;
// }

// interface MobileDrawerProps {
//   mobileMenu: boolean;
//   setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
//   userState: UserState;
//   isAuthLoading: boolean;
//   mainCategory: Category[];
//   sellerAuth: SellerAuth;
//   navigate: NavigateFunction;
//   onLogout: () => void;
// }

// const MobileDrawer: React.FC<MobileDrawerProps> = ({
//   mobileMenu,
//   setMobileMenu,
//   userState,
//   isAuthLoading,
//   mainCategory,
//   sellerAuth,
//   navigate,
//   onLogout,
// }) => {
//   return (
//     <Drawer
//       anchor="left"
//       open={mobileMenu}
//       onClose={() => setMobileMenu(false)}
//     >
//       <div className="w-[280px] h-full flex flex-col ">

//         {/* HEADER */}
//         <div className="flex items-center justify-between px-4 py-3 border-b " >
//           <h2 className="font-semibold text-lg">Menu</h2>
//           <IconButton onClick={() => setMobileMenu(false)}>
//             <Close />
//           </IconButton>
//         </div>

//         {/* USER CARD */}
//         {userState.user && (
//           <div
//             className="mx-4 my-4 p-3 rounded-lg flex items-center gap-3 cursor-pointer"
//             style={{ backgroundColor: "#F7EFE6" }}   // ✅ PRESERVED
//             onClick={() => {
//               navigate("/account");
//               setMobileMenu(false);
//             }}
//           >
//             <Avatar sx={{ bgcolor: "#4A1F2A" }}>
//               {(userState.user.fullName || userState.user.email)
//                 ?.charAt(0)
//                 .toUpperCase()}
//             </Avatar>

//             <div className="text-sm">
//               <p className="font-semibold">
//                 {userState.user.fullName || "My Account"}
//               </p>
//               <p className="text-gray-600 text-xs">
//                 {userState.user.email}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* CATEGORIES */}
//         <div className="flex-1 overflow-y-auto px-4">
//           {mainCategory.map((item) => (
//             <div
//               key={item.categoryId}
//               className="py-3 border-b text-sm font-medium cursor-pointer"
//               onClick={() => {
//                 navigate(`/products/${item.categoryId}`);
//                 setMobileMenu(false);
//               }}
//             >
//               {item.name}
//             </div>
//           ))}
//         </div>

//         {/* ACTIONS */}
//         <div className="p-4 border-t flex flex-col gap-3">

//   <Button
//     fullWidth
//     variant="outlined"
//     onClick={() => {
//       navigate("/cart");
//       setMobileMenu(false);
//     }}
//   >
//     Cart
//   </Button>

//   {!userState.user ? (
//     <Button
//       fullWidth
//       variant="contained"
//       sx={{ backgroundColor: "#4A1F2A" }}
//       onClick={() => {
//         navigate("/login");
//         setMobileMenu(false);
//       }}
//     >
//       Login
//     </Button>
//   ) : (
//     <Button
//       fullWidth
//       variant="outlined"
//       color="error"
//       onClick={() => {
//         onLogout();              // ✅ LOGOUT CALL
//         setMobileMenu(false);
//       }}
//     >
//       Logout
//     </Button>
//   )}

//   <Button
//     fullWidth
//     variant="outlined"
//     onClick={() => {
//       navigate(
//         sellerAuth.jwt ? "/seller" : "/become-seller"
//       );
//       setMobileMenu(false);
//     }}
//   >
//     {sellerAuth.jwt
//       ? "Seller Dashboard"
//       : "Become Seller"}
//   </Button>

// </div>
//       </div>
//     </Drawer>
//   );
// };

// export default MobileDrawer;




import React from "react";
import { Drawer, Button, IconButton, Avatar, Skeleton } from "@mui/material";
import { Close } from "@mui/icons-material";
import type { NavigateFunction } from "react-router-dom";

interface Category {
  categoryId: string;
  name: string;
}

interface SellerAuth {
  jwt?: string | null;
}

interface User {
  fullName?: string;
  email: string;
}

interface UserState {
  user?: User | null;
}

interface MobileDrawerProps {
  mobileMenu: boolean;
  setMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  userState: UserState;
  isAuthLoading: boolean;
  mainCategory: Category[];
  sellerAuth: SellerAuth;
  navigate: NavigateFunction;
  onLogout: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  mobileMenu,
  setMobileMenu,
  userState,
  isAuthLoading,
  mainCategory,
  sellerAuth,
  navigate,
  onLogout,
}) => {
  return (
    <Drawer
      anchor="left"
      open={mobileMenu}
      onClose={() => setMobileMenu(false)}
    >
      <div className="w-[280px] h-full flex flex-col ">

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 border-b " >
          <h2 className="font-semibold text-lg">Menu</h2>
          <IconButton onClick={() => setMobileMenu(false)}>
            <Close />
          </IconButton>
        </div>

        {/* ✅ USER CARD - AB FLICKER-FREE (Skeleton + Avatar same container) */}
        {(isAuthLoading || userState.user) && (
          <div
            className="mx-4 my-4 p-3 rounded-lg flex items-center gap-3 cursor-pointer"
            style={{ backgroundColor: "#F7EFE6" }}
            onClick={() => {
              if (userState.user) {
                navigate("/account");
                setMobileMenu(false);
              }
            }}
          >
            {isAuthLoading ? (
              <>
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ bgcolor: "#4A1F2A" }}
                />
                <div className="flex-1 space-y-1">
                  <Skeleton variant="text" width="65%" height={20} />
                  <Skeleton variant="text" width="85%" height={16} />
                </div>
              </>
            ) : (
              <>
                <Avatar sx={{ bgcolor: "#4A1F2A" }}>
                  {(userState.user!.fullName || userState.user!.email)
                    .charAt(0)
                    .toUpperCase()}
                </Avatar>
                <div className="text-sm">
                  <p className="font-semibold">
                    {userState.user!.fullName || "My Account"}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {userState.user!.email}
                  </p>
                </div>
              </>
            )}
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
        <div className="p-4 border-t flex flex-col gap-3">
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

          {!userState.user ? (
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
          ) : (
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={() => {
                onLogout();
                setMobileMenu(false);
              }}
            >
              Logout
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
  );
};

export default MobileDrawer;