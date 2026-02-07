// import React, { useState } from "react";
// import {
//   Button,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
// import { colors } from "../../../Data/Filter/color";
// import { price } from "../../../Data/Filter/price";

// const FilterSection = () => {
//   const [expendColor, setExpendColor] = useState(false);

//   const handleExpendColor = () => setExpendColor(!expendColor);

//   return (
//     <div className="space-y-5 bg-[#F8F3E8] border-[#E3D4B6]">
//       {/* Top bar */}
//       <div className="flex items-center justify-between h-12 px-5 border-b border-[#E3D4B6]">
//         <p className="text-sm font-semibold tracking-wide text-[#4A1F2A]">
//           Filters
//         </p>
//         <Button
//           size="small"
//           sx={{
//             textTransform: "none",
//             fontSize: "12px",
//             color: "#7A6A58",
//             "&:hover": { color: "#4A1F2A", backgroundColor: "transparent" },
//           }}
//         >
//           Clear all
//         </Button>
//       </div>

//       <div className="px-5 pb-6 space-y-6 mt-2">
//         {/* -------- COLOR FILTER -------- */}
//         <section>
//           <FormControl sx={{ zIndex: 0 }} component="fieldset">
//             <FormLabel
//               sx={{
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#4A1F2A",
//                 mb: 1,
//               }}
//             >
//               Color
//             </FormLabel>

//             <RadioGroup name="color">
//               {colors
//                 .slice(0, expendColor ? colors.length : 5)
//                 .map((item: any) => (
//                   <FormControlLabel
//                     key={item.name}
//                     value={item.name}
//                     control={
//                       <Radio
//                         size="small"
//                         sx={{
//                           color: "#B5933A",
//                           "&.Mui-checked": {
//                             color: "#4A1F2A",
//                           },
//                         }}
//                       />
//                     }
//                     label={
//                       <span className="text-sm text-[#5A4A3C]">
//                         {item.name}
//                       </span>
//                     }
//                   />
//                 ))}
//             </RadioGroup>
//           </FormControl>

//           <div className="mt-1">
//             {colors.length > 5 && (
//               <Button
//                 onClick={handleExpendColor}
//                 size="small"
//                 sx={{
//                   textTransform: "none",
//                   fontSize: "12px",
//                   paddingLeft: 0,
//                   color: "#7A6A58",
//                   "&:hover": { color: "#4A1F2A", background: "transparent" },
//                 }}
//               >
//                 {expendColor ? "Hide" : `+ ${colors.length - 5} more`}
//               </Button>
//             )}
//           </div>

//           <Divider sx={{ mt: 2, borderColor: "#E3D4B6" }} />
//         </section>

//         {/* -------- PRICE FILTER -------- */}
//         <section>
//           <FormControl sx={{ zIndex: 0 }} component="fieldset">
//             <FormLabel
//               sx={{
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#4A1F2A",
//                 mb: 1,
//               }}
//             >
//               Price
//             </FormLabel>

//             <RadioGroup name="price">
//               {price.map((item: any) => (
//                 <FormControlLabel
//                   key={item.value}
//                   value={item.value}
//                   control={
//                     <Radio
//                       size="small"
//                       sx={{
//                         color: "#B5933A",
//                         "&.Mui-checked": {
//                           color: "#4A1F2A",
//                         },
//                       }}
//                     />
//                   }
//                   label={
//                     <span className="text-sm text-[#5A4A3C]">
//                       {item.name}
//                     </span>
//                   }
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>

//           <Divider sx={{ mt: 2, borderColor: "#E3D4B6" }} />
//         </section>

//         {/* -------- DISCOUNT FILTER -------- */}
//         <section>
//           <FormControl sx={{ zIndex: 0 }} component="fieldset">
//             <FormLabel
//               sx={{
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 color: "#4A1F2A",
//                 mb: 1,
//               }}
//             >
//               Discount
//             </FormLabel>

//             <RadioGroup name="discount">
//               {price.map((item: any) => (
//                 <FormControlLabel
//                   key={`discount-${item.value}`}
//                   value={item.value}
//                   control={
//                     <Radio
//                       size="small"
//                       sx={{
//                         color: "#B5933A",
//                         "&.Mui-checked": {
//                           color: "#4A1F2A",
//                         },
//                       }}
//                     />
//                   }
//                   label={
//                     <span className="text-sm text-[#5A4A3C]">
//                       {item.name}
//                     </span>
//                   }
//                 />
//               ))}
//             </RadioGroup>
//           </FormControl>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default FilterSection;










import React, { useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { filterConfig } from "../../../Config/FilterConfig";


const FilterSection = () => {
  const [expanded, setExpanded] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleFilterChange = (filterId, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterId]: value,
    }));
  };

  return (
    <div className="space-y-5 bg-[#F8F3E8] border-[#E3D4B6]">

      {/* Header */}
      <div className="flex items-center justify-between h-12 px-5 border-b border-[#E3D4B6]">
        <p className="text-sm font-semibold tracking-wide text-[#4A1F2A]">
          Filters
        </p>

        <Button
          size="small"
          onClick={() => setSelectedFilters({})}
          sx={{
            textTransform: "none",
            fontSize: "12px",
            color: "#7A6A58",
          }}
        >
          Clear all
        </Button>
      </div>

      <div className="px-5 pb-6 space-y-6 mt-2">

        {filterConfig.map((filter) => {
          const showAll = expanded[filter.id];

          const visibleOptions = filter.expandable
            ? filter.options.slice(0, showAll ? filter.options.length : 5)
            : filter.options;

          return (
            <section key={filter.id}>
              <FormControl component="fieldset">
                <FormLabel
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#4A1F2A",
                    mb: 1,
                  }}
                >
                  {filter.label}
                </FormLabel>

                <RadioGroup
                  value={selectedFilters[filter.id] || ""}
                  onChange={(e) =>
                    handleFilterChange(filter.id, e.target.value)
                  }
                >
                  {visibleOptions.map((item) => (
                    <FormControlLabel
                      key={item.value || item.name}
                      value={item.value || item.name}
                      control={
                        <Radio
                          size="small"
                          sx={{
                            color: "#B5933A",
                            "&.Mui-checked": { color: "#4A1F2A" },
                          }}
                        />
                      }
                      label={
                        <span className="text-sm text-[#5A4A3C]">
                          {item.name}
                        </span>
                      }
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              {/* Expand Button */}
              {filter.expandable && filter.options.length > 5 && (
                <Button
                  size="small"
                  onClick={() => toggleExpand(filter.id)}
                  sx={{
                    textTransform: "none",
                    fontSize: "12px",
                    paddingLeft: 0,
                    color: "#7A6A58",
                  }}
                >
                  {showAll
                    ? "Hide"
                    : `+ ${filter.options.length - 5} more`}
                </Button>
              )}

              <Divider sx={{ mt: 2, borderColor: "#E3D4B6" }} />
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;
