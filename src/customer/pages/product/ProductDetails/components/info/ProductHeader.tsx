
const ProductHeader = ({ product }: any) => {
  return (
    <div>
      <h1 className="font-semibold text-xl text-[#4A1F2A]">
         {product.seller?.businessDetails?.businessName ||
            "Swastik Handloom"}
      </h1>
      <p className="text-sm md:text-base text-[#5A4A3C] mt-1">
        {product.title}
      </p>
    </div>
  );
};

export default ProductHeader;
