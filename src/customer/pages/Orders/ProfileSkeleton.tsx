import { Skeleton } from "@mui/material";

const ProfileSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <Skeleton
        key={i}
        height={70}
        sx={{ borderRadius: 2 }}
      />
    ))}
  </div>
);
