// import React from 'react';

// const ElectronicCategoryCard = ({item}:any) => {
//   return (
//     <div className='flex w-20 flex-col items-center gap-3 cursor-pointer'>
//       <img className='object-contain h-10' src={item.image} alt="" />
//       <h2 className='font-semibold text-sm'>{item.name}</h2>
//     </div>
//   );
// }

// export default ElectronicCategoryCard;


import React from "react";

const ElectronicCategoryCard = ({ item }: any) => {
  return (
    <div
      className="
        flex flex-col items-center 
        gap-3 cursor-pointer 
        w-24 lg:w-28
        p-3 rounded-xl
        transition-all duration-300

        text-[#4A1F2A] 
        hover:bg-[#FFF5E7]
        hover:shadow-md
        hover:-translate-y-1
      "
    >
      <img
        className="object-contain h-10 md:h-12 drop-shadow-sm"
        src={item.image}
        alt={item.name}
      />

      <h2 className="font-medium text-xs md:text-sm tracking-wide">
        {item.name}
      </h2>
    </div>
  );
};

export default ElectronicCategoryCard;
