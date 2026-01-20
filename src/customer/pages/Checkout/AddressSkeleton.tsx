import { Skeleton } from "@mui/material";

const AddressSkeleton = () => {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-4 border rounded-xl bg-white shadow-sm"
        >
          <Skeleton width="40%" height={20} />
          <Skeleton width="80%" height={16} />
          <Skeleton width="60%" height={16} />
        </div>
      ))}
    </div>
  );
};

export default AddressSkeleton;
