
import Loading from "@/components/loading/Loading";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

const Landing = () => {
   const { user, isLoading } = useAuth();
   if (isLoading) {
      return <Loading />;
   }
   if (user) {
      return <Navigate to="/dashboard"></Navigate>;
   }
   else {
      return <Navigate to="/auth/login"></Navigate>;
   }

};

export default Landing;
