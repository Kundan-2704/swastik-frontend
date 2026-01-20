import { Skeleton } from "@mui/material";

const PricingSkeleton = () => (
  <div className="border border-[#E3D4B6] rounded-xl bg-white p-5 space-y-4">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex justify-between">
        <Skeleton width={120} />
        <Skeleton width={80} />
      </div>
    ))}
    <Skeleton variant="rounded" width="100%" height={48} />
  </div>
);

export default PricingSkeleton;
