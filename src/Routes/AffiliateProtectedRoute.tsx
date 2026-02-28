import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AffiliateProtectedRoute = ({ children }: any) => {
  const { user } = useSelector((state: any) => state.auth);

  if (!user) return <Navigate to="/login" />;

  // Agar affiliate boolean use kar rahe ho
  if (!user.isAffiliate) return <Navigate to="/" />;

  return children;
};

export default AffiliateProtectedRoute;