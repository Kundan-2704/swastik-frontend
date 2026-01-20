
const ProductDescription = ({ description }: { description: string }) => {
  return (
    <div className="mt-5 text-sm text-[#5A4A3C] leading-relaxed">
      <p>{description}</p>
    </div>
  );
};

export default ProductDescription;
