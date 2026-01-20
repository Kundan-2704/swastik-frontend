import { Skeleton } from "@mui/material";

const ProductSkeleton = () => {
    return (
        <div className="px-4 space-y-3">
            <Skeleton
                variant="rectangular"
                height={360}
                className="rounded-2xl"
            />

            <Skeleton height={20} width="60%" />
            <Skeleton height={40} />
            <Skeleton height={18} width="40%" />

            <div className="flex gap-2">
                <Skeleton height={24} width={80} />
                <Skeleton height={24} width={60} />
            </div>
        </div>
    );
};

export default ProductSkeleton;
