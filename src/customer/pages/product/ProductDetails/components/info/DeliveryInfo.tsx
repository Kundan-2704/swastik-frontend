



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
