import Loading from "@/components/loading/Loading";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const SecureAuth = ({ userTypes, children }) => {
   const { user, isLoading } = useAuth();
   const location = useLocation();

   if (isLoading) {
      return <Loading />;
   }

   if (user && user?.userType && userTypes?.includes(user?.userType)) {
      return children;
   }

   return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default SecureAuth;
