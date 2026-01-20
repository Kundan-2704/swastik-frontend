import { Skeleton } from "@mui/material";

const ProductDetailsSkeleton = () => {
  return (
    <div className="min-h-screen px-5 lg:px-20 pt-10 bg-[#FFFCF7]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery Skeleton */}
        <div className="space-y-4">
          <Skeleton variant="rectangular" height={520} sx={{ borderRadius: 3 }} />
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rectangular" width={80} height={80} sx={{ borderRadius: 2 }} />
            ))}
          </div>
        </div>

        {/* Info Skeleton */}
        <div className="space-y-4">
          <Skeleton width="80%" height={40} />
          <Skeleton width="40%" height={32} />
          <Skeleton width="30%" height={24} />
          <Skeleton width="50%" height={24} />

          <Skeleton width="100%" height={50} sx={{ borderRadius: 999 }} />
          <Skeleton width="100%" height={50} sx={{ borderRadius: 999 }} />

          <Skeleton width="100%" height={120} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
