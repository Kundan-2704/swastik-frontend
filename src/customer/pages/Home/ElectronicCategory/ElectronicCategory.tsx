import React from 'react';
import ElectronicCategoryCard from './ElectronicCategoryCard';

const electronics = [
  {
    section: " ELECTRIC_CATEGORIES",
    name: "Laptop",
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/computer/m/3/7/-original-imahayjpgztvrfyj.jpeg?q=70&crop=false",
    categoryId: "laptops"
  },
  {
    section: " ELECTRIC_CATEGORIES",
    name: "Mobile",
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/0/p/g/-original-imahft6cfwg6yta2.jpeg?q=70&crop=false",
    categoryId: "mobiles"
  },
  {
    section: " ELECTRIC_CATEGORIES",
    name: "SmartWatch",
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/smartwatch/r/g/k/-original-imahf98j6ea4gkrf.jpeg?q=70&crop=false",
    categoryId: "smart_watches"
  },
  {
    section: " ELECTRIC_CATEGORIES",
    name: "Headphones",
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/o/o/s/-original-imahf77syamgxzfy.jpeg?q=70&crop=false",
    categoryId: "headphones_headsets"
  },
  {
    section: " ELECTRIC_CATEGORIES",
    name: "Speaker",
    image: "http://rukminim2.flixcart.com/image/832/832/xif0q/speaker/j/b/g/-original-imah3gaky8y9ydxj.jpeg?q=70&crop=false",
    categoryId: "speakers"
  },
  {
    section: " ELECTRIC_CATEGORIES",
    name: "Tv",
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/television/s/u/t/-original-imahg8zzargfxppg.jpeg?q=70&crop=false",
    categoryId: "television"
  },
  {
    section: " ELECTRIC_CATEGORIES",
    name: "Camera",
    image: "https://rukminim2.flixcart.com/image/832/832/l5fnhjk0/dslr-camera/f/t/m/eos-r10-24-2-r10-canon-original-imagg42fsbgv79da.jpeg?q=70&crop=false",
    categoryId: "cameras"
  },
]

// const ElectronicCategory = () => {
//   return (
//     <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b border-gray-300'>
//       {electronics.map((item)=> <ElectronicCategoryCard item = {item}/>)}
//     </div>
//   );
// }

const ElectronicCategory = () => {
  return (
    <div
      className="
        flex flex-wrap justify-around 
        py-8 lg:px-20 
        bg-[#FFFCF7] 
        border-b border-[#E3D4B6]
      "
    >
      {electronics.map((item, i) => (
        <ElectronicCategoryCard key={i} item={item} />
      ))}
    </div>
  );
};


export default ElectronicCategory;
