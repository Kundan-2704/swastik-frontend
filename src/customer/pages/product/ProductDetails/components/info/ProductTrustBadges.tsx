import {
  Shield,
  WorkspacePremium,
  LocalShipping,
  Wallet,
} from "@mui/icons-material";

const ProductTrustBadges = () => {
  return (
    <div className="mt-5 space-y-3 text-sm text-[#5A4A3C]">
      <div className="flex items-center gap-3">
        <Shield sx={{ color: "#B9935A" }} />
        <p>Authentic & quality assured handloom product</p>
      </div>

      <div className="flex items-center gap-3">
        <WorkspacePremium sx={{ color: "#B9935A" }} />
        <p>100% money back guarantee on authenticity</p>
      </div>

      <div className="flex items-center gap-3">
        <LocalShipping sx={{ color: "#B9935A" }} />
        <p>Free shipping & easy returns</p>
      </div>

      <div className="flex items-center gap-3">
        <Wallet sx={{ color: "#B9935A" }} />
        <p>Pay on delivery may be available</p>
      </div>
    </div>
  );
};

export default ProductTrustBadges;
