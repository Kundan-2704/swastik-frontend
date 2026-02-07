// FilterConfig.js

import { colors } from "../Data/Filter/color";
import { price } from "../Data/Filter/price";


export const filterConfig = [
  {
    id: "color",
    label: "Color",
    options: colors,
    expandable: true,
  },
  {
    id: "price",
    label: "Price",
    options: price,
  },
  {
    id: "discount",
    label: "Discount",
    options: [
      { name: "10% and above", value: "10" },
      { name: "20% and above", value: "20" },
      { name: "30% and above", value: "30" },
      { name: "40% and above", value: "40" },
    ],
  },
];
