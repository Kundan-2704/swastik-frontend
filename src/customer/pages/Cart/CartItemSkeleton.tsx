import { Skeleton } from "@mui/material";

const CartItemSkeleton = () => {
  return (
    <div className="border border-[#E3D4B6] rounded-xl p-5 bg-[#FFF9EF] flex gap-4">
      <Skeleton variant="rounded" width={110} height={140} />

      <div className="flex-1 space-y-3">
        <Skeleton width="60%" height={22} />
        <Skeleton width="80%" height={18} />
        <Skeleton width="40%" height={16} />

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            <Skeleton variant="rounded" width={36} height={36} />
            <Skeleton variant="rounded" width={36} height={36} />
            <Skeleton variant="rounded" width={36} height={36} />
          </div>
          <Skeleton width={80} height={22} />
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
