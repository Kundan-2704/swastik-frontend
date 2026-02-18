/* ================= TYPES ================= */
interface HomeCategoryCardProps {
  item: {
    name: string;
    image?: string;
  };
}

const HomeCategoryCard: React.FC<HomeCategoryCardProps> = ({ item }) => {
  const imageSrc = item.image || "/placeholder.webp";

  return (
    <div
      role="button"
      tabIndex={0}
      className="
        flex flex-col justify-center items-center gap-4
        group cursor-pointer
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#D9A86C]
        rounded-xl
      "
    >
      {/* IMAGE */}
      <div
        className="
          w-[150px] lg:w-[230px]
          h-[150px] lg:h-[230px]
          rounded-full
          overflow-hidden
          bg-[#FAF3E0]
          border border-[#D9A86C]
          shadow-md
          group-hover:shadow-xl
          transition-all duration-500
          group-hover:-translate-y-1
        "
      >
        <img
          src={imageSrc}
          alt={item.name}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.webp";
          }}
          className="
            w-full h-full
            object-cover object-top
            transition-transform duration-700
            group-hover:scale-105
          "
        />
      </div>

      {/* TITLE */}
      <h2
        className="
          font-semibold text-[#3B302A]
          text-lg tracking-wide
          transition-colors duration-300
          group-hover:text-[#8B5E34]
        "
      >
        {item.name}
      </h2>
    </div>
  );
};

export default HomeCategoryCard;
