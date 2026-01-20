// import { Button, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
// import { teal } from '@mui/material/colors';
// import React, { useState } from 'react';
// import { colors } from '../../../Data/Filter/color';
// import { price } from '../../../Data/Filter/price';

// const FilterSection = () => {

//   const [expendColor, setExpendColor] = useState(false)

//   const handleExpendColor = () => setExpendColor(!expendColor)




//   return (
//     <div className='-z-50 space-y-5 bg-white'>
//       <div className='flex items-center justify-between h-10 px-9 lg:border-r'>
//         <p className='text-lg font-semibold'>Filters</p>
//         <Button>clear all</Button>
//       </div>
//       <Divider />

//       <div className='px-9 space-y-6 mt-5'>
//         <section>
//           <FormControl sx={{ zIndex: 0 }}>
//             <FormLabel sx={{
//               fontSize: "16px",
//               fontWeight: "bold",
//               color: teal[600],

//             }}>
//               Color
//             </FormLabel>

//             <RadioGroup
//               aria-labelledby="demo-radio-buttons-group-label"
//               defaultValue="female"
//               name="radio-buttons-group"
//             >
//               {colors.slice(0, expendColor ? colors.length : 5).map((item: any) => <FormControlLabel value={item.name} control={<Radio />} label={item.name} />)}

//             </RadioGroup>

//           </FormControl>

//           <div>
//             <Button onClick={handleExpendColor}>{expendColor ? "hide" : `+ ${colors.length - 5} more`}</Button>
//           </div>

//           <Divider />

//         </section>


//         <section>
//           <FormControl sx={{ zIndex: 0 }}>
//             <FormLabel sx={{
//               fontSize: "16px",
//               fontWeight: "bold",
//               color: teal[600],

//             }}>
//               Price
//             </FormLabel>

//             <RadioGroup
//               aria-labelledby="demo-radio-buttons-group-label"
//               defaultValue="female"
//               name="radio-buttons-group"
//             >
//               {price.map((item: any) => <FormControlLabel value={item.value} control={<Radio />} label={item.name} />)}

//             </RadioGroup>

//           </FormControl>

//           <Divider />

//         </section>



//         <section>
//           <FormControl sx={{ zIndex: 0 }}>
//             <FormLabel sx={{
//               fontSize: "16px",
//               fontWeight: "bold",
//               color: teal[600],

//             }}>
//               Discount
//             </FormLabel>

//             <RadioGroup
//               aria-labelledby="demo-radio-buttons-group-label"
//               defaultValue="female"
//               name="radio-buttons-group"
//             >
//               {price.map((item: any) => <FormControlLabel value={item.value} control={<Radio />} label={item.name} />)}

//             </RadioGroup>

//           </FormControl>

//         </section>

//       </div>

//     </div>
//   );
// }

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
import { colors } from "../../../Data/Filter/color";
import { price } from "../../../Data/Filter/price";

const FilterSection = () => {
  const [expendColor, setExpendColor] = useState(false);

  const handleExpendColor = () => setExpendColor(!expendColor);

  return (
    <div className="space-y-5 bg-[#F8F3E8] border-[#E3D4B6]">
      {/* Top bar */}
      <div className="flex items-center justify-between h-12 px-5 border-b border-[#E3D4B6]">
        <p className="text-sm font-semibold tracking-wide text-[#4A1F2A]">
          Filters
        </p>
        <Button
          size="small"
          sx={{
            textTransform: "none",
            fontSize: "12px",
            color: "#7A6A58",
            "&:hover": { color: "#4A1F2A", backgroundColor: "transparent" },
          }}
        >
          Clear all
        </Button>
      </div>

      <div className="px-5 pb-6 space-y-6 mt-2">
        {/* -------- COLOR FILTER -------- */}
        <section>
          <FormControl sx={{ zIndex: 0 }} component="fieldset">
            <FormLabel
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#4A1F2A",
                mb: 1,
              }}
            >
              Color
            </FormLabel>

            <RadioGroup name="color">
              {colors
                .slice(0, expendColor ? colors.length : 5)
                .map((item: any) => (
                  <FormControlLabel
                    key={item.name}
                    value={item.name}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          color: "#B5933A",
                          "&.Mui-checked": {
                            color: "#4A1F2A",
                          },
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

          <div className="mt-1">
            {colors.length > 5 && (
              <Button
                onClick={handleExpendColor}
                size="small"
                sx={{
                  textTransform: "none",
                  fontSize: "12px",
                  paddingLeft: 0,
                  color: "#7A6A58",
                  "&:hover": { color: "#4A1F2A", background: "transparent" },
                }}
              >
                {expendColor ? "Hide" : `+ ${colors.length - 5} more`}
              </Button>
            )}
          </div>

          <Divider sx={{ mt: 2, borderColor: "#E3D4B6" }} />
        </section>

        {/* -------- PRICE FILTER -------- */}
        <section>
          <FormControl sx={{ zIndex: 0 }} component="fieldset">
            <FormLabel
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#4A1F2A",
                mb: 1,
              }}
            >
              Price
            </FormLabel>

            <RadioGroup name="price">
              {price.map((item: any) => (
                <FormControlLabel
                  key={item.value}
                  value={item.value}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: "#B5933A",
                        "&.Mui-checked": {
                          color: "#4A1F2A",
                        },
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

          <Divider sx={{ mt: 2, borderColor: "#E3D4B6" }} />
        </section>

        {/* -------- DISCOUNT FILTER -------- */}
        <section>
          <FormControl sx={{ zIndex: 0 }} component="fieldset">
            <FormLabel
              sx={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#4A1F2A",
                mb: 1,
              }}
            >
              Discount
            </FormLabel>

            <RadioGroup name="discount">
              {price.map((item: any) => (
                <FormControlLabel
                  key={`discount-${item.value}`}
                  value={item.value}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: "#B5933A",
                        "&.Mui-checked": {
                          color: "#4A1F2A",
                        },
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
        </section>
      </div>
    </div>
  );
};

export default FilterSection;
