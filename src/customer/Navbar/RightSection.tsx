import React from "react";
import {
  IconButton,
  Badge,
  Button,
  Avatar,
} from "@mui/material";

import {
  Search,
  AddShoppingCart,
  Favorite,
  Storefront,
} from "@mui/icons-material";

import NotificationBell from "../../components/NotificationBell";
import type { NavigateFunction } from "react-router-dom";

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

interface RightSectionProps {
  isLarge: boolean;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  cartCount: number;
  wishlistCount: number;
  userState: UserState;
  sellerAuth: SellerAuth;
  navigate: NavigateFunction;
}

const badgeStyles = {
  "& .MuiBadge-badge": {
    backgroundColor: "#7A1F2B",
    color: "#fff",
    fontSize: "10px",
    height: 16,
    minWidth: 16,
    boxShadow: "0 0 0 2px #F8F3E8",
  },
};

const avatarStyles = {
  width: 28,
  height: 28,
  bgcolor: "#4A1F2A",
  fontSize: 14,
};

const RightSection: React.FC<RightSectionProps> = ({
  isLarge,
  showSearch,
  setShowSearch,
  cartCount,
  wishlistCount,
  userState,
  sellerAuth,
  navigate,
}) => {

  const user = userState.user;

  const isAuthChecking = user === undefined;
  const isLoggedIn = user !== null && user !== undefined;

  return (
    <div className="flex items-center gap-3">

      <IconButton onClick={() => setShowSearch(!showSearch)}>
        <Search sx={{ color: "#B5933A" }} />
      </IconButton>

      <IconButton onClick={() => navigate("/cart")}>
        <Badge badgeContent={cartCount} invisible={cartCount === 0} sx={badgeStyles}>
          <AddShoppingCart sx={{ color: "#B5933A" }} />
        </Badge>
      </IconButton>

      <IconButton onClick={() => navigate("/wishlist")}>
        <Badge badgeContent={wishlistCount} invisible={wishlistCount === 0} sx={badgeStyles}>
          <Favorite sx={{ color: "#B5933A" }} />
        </Badge>
      </IconButton>

      <NotificationBell />

      {/* ✅ MOBILE */}
      {!isLarge && (
        <div style={{ width: 70 }}>   {/* 👈 LOCK WIDTH */}
          {isLoggedIn ? (
            <IconButton
              onClick={() => navigate("/account")}
              sx={{ visibility: isAuthChecking ? "hidden" : "visible" }}  // 🔥 FIX
            >
              <Avatar sx={avatarStyles}>
                {(user?.fullName || user?.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </Avatar>
            </IconButton>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              size="small"
              variant="contained"
              sx={{
                backgroundColor: "#4A1F2A",
                borderRadius: "999px",
                visibility: isAuthChecking ? "hidden" : "visible", // 🔥 FIX
              }}
            >
              Login
            </Button>
          )}
        </div>
      )}

      {/* ✅ DESKTOP */}
      {isLarge && (
        <div style={{ width: 90 }}>   {/* 👈 LOCK WIDTH */}
          {isLoggedIn ? (
            <Button
              onClick={() => navigate("/account")}
              sx={{ visibility: isAuthChecking ? "hidden" : "visible" }} // 🔥 FIX
            >
              <Avatar sx={avatarStyles}>
                {(user?.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </Avatar>
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="contained"
              sx={{
                backgroundColor: "#4A1F2A",
                visibility: isAuthChecking ? "hidden" : "visible", // 🔥 FIX
              }}
            >
              Login
            </Button>
          )}
        </div>
      )}

      {isLarge && (
        <Button
          onClick={() =>
            navigate(
              sellerAuth.jwt
                ? "/seller"
                : "/become-seller"
            )
          }
          variant="outlined"
          startIcon={<Storefront />}
        >
          {sellerAuth.jwt
            ? "Seller Dashboard"
            : "Become Seller"}
        </Button>
      )}
    </div>
  );
};

export default RightSection;