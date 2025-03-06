import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const Main = () => {
   return (
      <div>
         <Outlet />
         <Toaster position="top-center" richColors />
      </div>
   );
};

export default Main;
