// import { Button } from "@mui/material";
// import React, { useState } from "react";
// import SellerLogin from "../Login/SellerLogin";
// import SellerAccountForm from "./SellerAccountForm";

// const BecomeSeller = () => {
//   const [isLogin, setIsLogin] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#FFFCF7] flex items-center justify-center px-4 py-10">

//       <div
//         className="
//           w-full max-w-4xl
//           bg-white/70 backdrop-blur-md
//           border border-[#E3D4B6]
//           rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.12)]
//           p-8 md:p-12
//           space-y-10
//         "
//       >
//         {/* TITLE */}
//         <div className="text-center space-y-2">
//           <p className="text-xs tracking-[0.25em] uppercase text-[#B9935A]">
//             Become a Seller
//           </p>

//           <h1 className="text-3xl font-semibold text-[#4A1F2A] tracking-wide">
//             Start Your Premium Saree Business
//           </h1>

//           <p className="text-sm text-[#7A6A58]">
//             Sell exclusive Kosa • Tassar • Handloom sarees on Swastik Marketplace.
//           </p>
//         </div>

//         {/* FORM */}
//         <div>{isLogin ? <SellerLogin /> : <SellerAccountForm />}</div>

//         {/* LOGIN/REGISTER BUTTON */}
//         <div className="space-y-2">
//           <h2 className="text-center text-sm font-medium text-[#4A1F2A]">
//             {isLogin ? "New to Swastik Seller?" : "Already have an account?"}
//           </h2>

//           <Button
//             onClick={() => setIsLogin(!isLogin)}
//             sx={{
//               py: "12px",
//               borderRadius: "999px",
//               fontWeight: 600,
//               textTransform: "none",
//               background:
//                 "linear-gradient(135deg, #8B5E34 0%, #C58B4E 40%, #E5B676 100%)",
//               "&:hover": {
//                 background:
//                   "linear-gradient(135deg, #6B4423 0%, #A86C34 40%, #D49A54 100%)",
//               },
//             }}
//             fullWidth
//             variant="contained"
//           >
//             {isLogin ? "Create Seller Account" : "Login"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BecomeSeller;




import { Button } from "@mui/material";
import  { useState } from "react";
import SellerLogin from "../Login/SellerLogin";
import SellerAccountForm from "./SellerAccountForm";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFCF7] flex items-center justify-center px-4 py-10">
      <div
        className={`
          w-full max-w-4xl
          bg-white/70 backdrop-blur-md
          border border-[#E3D4B6]
          rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.12)]
          p-8 md:p-12
          transition-all duration-300
          ${isLogin ? "py-16" : "space-y-10"}
        `}
      >
        {/* HEADER (ONLY FOR REGISTER FLOW) */}
        {!isLogin && (
          <div className="text-center space-y-2">
            <p className="text-xs tracking-[0.25em] uppercase text-[#B9935A]">
              Become a Seller
            </p>

            <h1 className="text-3xl font-semibold text-[#4A1F2A] tracking-wide">
              Start Your Premium Saree Business
            </h1>

            <p className="text-sm text-[#7A6A58]">
              Sell exclusive Kosa • Tassar • Handloom sarees on Swastik Marketplace.
            </p>
          </div>
        )}

        {/* CONTENT */}
        <div className="flex justify-center">
          {isLogin ? <SellerLogin embedded /> : <SellerAccountForm />}
        </div>

        {/* TOGGLE BUTTON */}
        <div className="space-y-2 pt-6">
          <h2 className="text-center text-sm font-medium text-[#4A1F2A]">
            {isLogin ? "New to Swastik Seller?" : "Already have an account?"}
          </h2>

          <Button
            onClick={() => setIsLogin(!isLogin)}
            sx={{
              py: "12px",
              borderRadius: "999px",
              fontWeight: 600,
              textTransform: "none",
              background:
                "linear-gradient(135deg, #8B5E34 0%, #C58B4E 40%, #E5B676 100%)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #6B4423 0%, #A86C34 40%, #D49A54 100%)",
              },
            }}
            fullWidth
            variant="contained"
          >
            {isLogin ? "Create Seller Account" : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;
