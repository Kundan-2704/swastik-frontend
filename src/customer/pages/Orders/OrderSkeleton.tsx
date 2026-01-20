import { Skeleton } from "@mui/material";

const OrderSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-5 border rounded-xl bg-[#FFFDF8] space-y-3"
        >
          <div className="flex gap-3 items-center">
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton width={120} height={18} />
          </div>

          <div className="flex gap-3">
            <Skeleton variant="rectangular" width={70} height={70} />
            <div className="flex-1 space-y-2">
              <Skeleton width="80%" />
              <Skeleton width="60%" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSkeleton;
