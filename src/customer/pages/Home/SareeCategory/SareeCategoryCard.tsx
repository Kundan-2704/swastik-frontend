



import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SareeCategoryCard = ({ item }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/products/${item.categoryId}`);
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        group
        cursor-pointer
        rounded-2xl
        border border-[#E3D4B6]
        bg-[#FFF9F1]
        px-4 py-6
        flex flex-col items-center
        gap-4
        transition-all duration-300 ease-out
        hover:bg-[#FFF5E7]
        hover:shadow-2xl
        hover:-translate-y-2
        focus:outline-none
        focus:ring-2
        focus:ring-[#D9A86C]
      "
    >
      {/* IMAGE */}
      <div
        className="
          w-20 h-20
          rounded-full
          overflow-hidden
          border border-[#D9A86C]
          shadow-sm
          transition-transform duration-500
          group-hover:scale-110
        "
      >
        <img
          src={item.image || "/placeholder.jpg"}
          alt={item.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEXT */}
      <div className="text-center space-y-1">
        <h2 className="font-semibold text-sm text-[#4A1F2A] tracking-wide">
          {item.name}
        </h2>

        <p className="text-xs text-[#8B7A63] group-hover:text-[#8B5E34] transition-colors">
          Explore Collection
        </p>
      </div>
    </motion.div>
  );
};

export default SareeCategoryCard;
