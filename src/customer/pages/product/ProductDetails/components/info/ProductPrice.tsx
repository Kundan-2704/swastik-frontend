
const ProductPrice = ({ product }: any) => {
  return (
    <div className="space-y-1 pt-3">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-2xl text-[#4A1F2A]">
          ₹{product.sellingPrice}
        </span>
        <span className="text-sm line-through text-gray-400">
          ₹{product.mrpPrice}
        </span>
        <span className="font-semibold text-sm text-[#B9935A]">
          {product.discountPercent}% Off
        </span>
      </div>
      <p className="text-xs md:text-sm text-[#7A6A58]">
        Inclusive of all taxes. Free shipping above ₹7000
      </p>
    </div>
  );
};

export default ProductPrice;
