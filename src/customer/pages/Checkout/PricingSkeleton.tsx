import { Skeleton } from "@mui/material";

const PricingSkeleton = () => {
  return (
    <div className="p-5 space-y-3">
      <Skeleton width="60%" height={20} />
      <Skeleton width="100%" height={14} />
      <Skeleton width="100%" height={14} />
      <Skeleton width="100%" height={14} />
      <Skeleton width="80%" height={18} />
    </div>
  );
};

export default PricingSkeleton;
