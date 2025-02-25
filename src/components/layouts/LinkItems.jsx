import { LayoutDashboard, Settings } from "lucide-react";

export const items = [
   {
      to: "/dashboard",
      label: "To-Do List",
      icon: <LayoutDashboard className="h-5 w-5" />,
   },
   {
      to: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-5 w-5" />,

   },

];
