import { Skeleton } from "@mui/material";

const CouponSkeleton = () => (
  <div className="border border-[#E3D4B6] bg-[#FDF9F2] rounded-xl p-5 space-y-4">
    <Skeleton width={140} height={20} />
    <Skeleton variant="rounded" width="100%" height={40} />
  </div>
);

export default CouponSkeleton;
