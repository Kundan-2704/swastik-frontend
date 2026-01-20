import React from "react";

const ProductThumbnails = ({ images, current, setCurrent }: any) => {
  return (
    <div className="w-full lg:w-[18%] flex flex-row lg:flex-col gap-3">
      {images?.map((img: string, index: number) => (
        <button
          key={index}
          onMouseEnter={() => setCurrent(index)}
          onClick={() => setCurrent(index)}
          className={`rounded-xl overflow-hidden border transition-all
            ${current === index
              ? "border-[#B9935A] ring-2 ring-[#B9935A]"
              : "border-transparent opacity-80 hover:opacity-100"
            }
            w-[70px] h-[90px] lg:w-full lg:h-[90px]
          `}
        >
          <img
            loading="lazy"
            src={img}
            alt={`thumb-${index}`}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  );
};

export default ProductThumbnails;
