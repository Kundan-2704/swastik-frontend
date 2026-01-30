// import { LocalShipping } from "@mui/icons-material";

// const DeliveryInfo = () => {
//   return (
//     <div className="mt-5 p-3 border border-[#E8DCC8] rounded-xl bg-[#FDF9F2]">
//       <div className="flex items-center gap-2">
//         <LocalShipping sx={{ fontSize: 18, color: "#B9935A" }} />
//         <p className="text-sm text-[#4A1F2A] font-medium">
//           Delivery in 5–7 working days
//         </p>
//       </div>
//       <p className="text-xs text-[#7A6A58] mt-1">
//         Free delivery above ₹7000 | Easy returns
//       </p>
//     </div>
//   );
// };

// export default DeliveryInfo;





import { useMemo } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

type DeliveryWindow = {
  min: string;
  max: string;
};

const getDeliveryWindow = (): DeliveryWindow => {
  const key = "delivery_window";

  const saved = sessionStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  }

  const today = new Date();

  const minDays = 4;
  const maxDays = 7;

  const minDate = new Date(today);
  minDate.setDate(today.getDate() + minDays);

  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + maxDays);

  const format = (d: Date) =>
    d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  const window = {
    min: format(minDate),
    max: format(maxDate),
  };

  sessionStorage.setItem(key, JSON.stringify(window));

  return window;
};

const DeliveryInfo = () => {
  const delivery = useMemo(() => getDeliveryWindow(), []);

  return (
    <div className="flex items-start gap-2 text-sm">
      <LocalShippingIcon fontSize="small" sx={{ color: "#8B5E34" }} />
      <div>
        <p className="font-medium text-[#4A1F2A]">
          Arrives between  {delivery.min} – {delivery.max}
        </p>
        <p className="text-xs text-[#7A6A55]">
          Handwoven • Carefully packed • Insured shipping
        </p>
      </div>
    </div>
  );
};

export default DeliveryInfo;
