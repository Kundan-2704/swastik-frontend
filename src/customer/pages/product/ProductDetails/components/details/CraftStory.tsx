import React from "react";

type Props = {
  story?: string;
};

const CraftStory: React.FC<Props> = ({ story }) => {
  if (!story) return null;

  return (
    <section className="mt-12 rounded-3xl border border-[#E8DCCF] bg-[#FFF9F3] p-6 md:p-7">
      {/* Heading */}
      <h2 className="mb-3 text-xs font-semibold tracking-widest uppercase text-[#4A1F2A]">
        Crafted by Artisans
      </h2>

      {/* Story */}
      <p className="text-sm text-[#5A4A3C] leading-relaxed md:leading-loose">
        {story}
      </p>
    </section>
  );
};

export default CraftStory;
