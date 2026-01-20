// import { Button } from "@mui/material";
// import { AddShoppingCart } from "@mui/icons-material";

// type Props = {
//   visible: boolean;
//   price: number;
//   onAdd: () => void;
//   disabled: boolean;
// };

// const StickyDesktopCTA = ({ visible, price, onAdd, disabled }: Props) => {
//   if (!visible) return null;

//   return (
//     <div
//       className="
//         hidden lg:flex
//         fixed bottom-0 left-0 right-0
//         bg-white z-50
//         border-t
//         shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
//       "
//     >
//       <div className="max-w-7xl mx-auto w-full px-20 py-4 flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-500">Price</p>
//           <p className="text-lg font-semibold">₹{price}</p>
//         </div>

//         <Button
//           variant="contained"
//           startIcon={<AddShoppingCart />}
//           onClick={onAdd}
//           disabled={disabled}
//           sx={{
//             borderRadius: "999px",
//             px: 5,
//             py: 1.2,
//             backgroundColor: "#4A1F2A",
//             textTransform: "none",
//             fontWeight: 600,
//             "&:hover": { backgroundColor: "#4A1F2A" },
//           }}
//         >
//           Add to Bag
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default StickyDesktopCTA;







import { Button } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";

type Props = {
  visible: boolean;
  price: number;
  onAdd: () => void;
  disabled: boolean;
};

const StickyDesktopCTA = ({ visible, price, onAdd, disabled }: Props) => {
  if (!visible) return null;

  return (
    <div
      className="
        hidden lg:flex
        fixed bottom-0 left-0 right-0
        z-50
        bg-[#F6F1E8]
        border-t border-[#E5D7C3]
        shadow-[0_-6px_24px_rgba(0,0,0,0.08)]
        backdrop-blur-sm
      "
    >
      <div className="max-w-7xl mx-auto w-full px-20 py-4 flex items-center justify-between">
        {/* Price */}
        <div>
          <p className="text-sm text-[#7A5A3A]">Price</p>
          <p className="text-xl font-semibold text-[#4A1F2A]">
            ₹{price.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Button */}
        <Button
          variant="contained"
          startIcon={<AddShoppingCart />}
          onClick={onAdd}
          disabled={disabled}
          sx={{
            borderRadius: "999px",
            px: 5,
            py: 1.3,
            fontSize: "1rem",
            fontWeight: 600,
            textTransform: "none",
            color: "#fff",

            background: disabled
              ? "#C9B8A3"
              : "linear-gradient(135deg, #C08A4D, #9C6B3D)",

            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",

            "&:hover": {
              background: disabled
                ? "#C9B8A3"
                : "linear-gradient(135deg, #9C6B3D, #7A4F2A)",
              boxShadow: "0 10px 26px rgba(0,0,0,0.2)",
            },
          }}
        >
          Add to Bag
        </Button>
      </div>
    </div>
  );
};

export default StickyDesktopCTA;
