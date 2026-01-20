
const CraftStory = ({ story }: { story: string }) => {
  if (!story) return null;

  return (
    <div className="mt-10">
      <h2 className="text-sm font-semibold text-[#4A1F2A] mb-2">
        Crafted by Artisans
      </h2>
      <p className="text-sm text-[#5A4A3C] leading-relaxed">
        {story}
      </p>
    </div>
  );
};

export default CraftStory;
