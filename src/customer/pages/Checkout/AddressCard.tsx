// import { Radio } from '@mui/material';
// import React from 'react';

// const AddressCard = ({value,selectedValue,handleChange,item}:any) => {
//   return (
//     <div className='p-5 border border-gray-300 rounded-md flex'>
//       <div>
//         <Radio 
//         checked={selectedValue == value}
//         value={value}
//         onChange={handleChange}
//         name='radio-buttons'/>
//       </div>

//       <div className='space-y-3 pt-3'>
//         <h1>{"Kudan Dewangan"}</h1>
//         <p>{"Ward No 21, champa, 495671, Chhattisgarh, india"}</p>
//         <p>
//             <strong>Mobile: </strong> 9669976624
//         </p>
//       </div>

//     </div>
//   );
// }

// export default AddressCard;



import { Radio } from "@mui/material";
import React from "react";

const AddressCard = ({ value, selectedValue, handleChange, item }: any) => {
  const isSelected = selectedValue == value;

  return (
    <div
      className={`
        p-5 rounded-xl flex gap-4 cursor-pointer 
        transition-all duration-300
        ${isSelected 
          ? "border-2 border-[#B9935A] bg-[#FFF9F1] shadow-md"
          : "border border-[#E3D4B6] bg-white shadow-sm"
        }
      `}
      onClick={() => handleChange({ target: { value } })}
    >
      {/* RADIO BUTTON */}
      <Radio
        checked={isSelected}
        value={value}
        onChange={handleChange}
        sx={{
          color: "#B9935A",
          "&.Mui-checked": { color: "#4A1F2A" },
        }}
      />

      {/* ADDRESS DETAILS */}
      <div className="space-y-2 text-sm">
        <h1 className="font-semibold text-[#4A1F2A]">
          {item?.name || "Kundan Dewangan"}
        </h1>

        <p className="text-[#5A4A3C] leading-snug">
          {item?.address ||
            "Ward No 21, Champa, 495671, Chhattisgarh, India"}
        </p>

        <p className="text-[#7A6A58]">
          <strong>Mobile: </strong> {item?.mobile || "9669976624"}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
