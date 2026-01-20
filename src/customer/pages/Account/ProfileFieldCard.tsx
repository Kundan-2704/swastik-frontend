


import { Divider } from "@mui/material";

const ProfileFieldCard = ({ keys, value }: any) => {
  return (
    <div
      className="
        p-5 lg:p-6 
        flex items-center 
        bg-[#FFF8ED] 
        rounded-xl 
        shadow-sm 
        border border-[#E3D4B6]
      "
    >
      {/* Label */}
      <p className="w-24 lg:w-40 pr-5 text-[#4A1F2A] font-medium tracking-wide">
        {keys}
      </p>

      {/* Divider */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          borderColor: "#D9B27C",
          borderRightWidth: 2,
        }}
      />

      {/* Value */}
      <p className="pl-4 lg:pl-10 font-semibold lg:text-lg text-[#3B302A]">
        {value}
      </p>
    </div>
  );
};

export default ProfileFieldCard;
