import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
   { path: "/", label: "Home" },
   { path: "/about", label: "About" },
   { path: "/find-donor", label: "Find Donor" },
   { path: "/contact", label: "Contact" },
];

const Header = () => {
   return (
      <header className="sticky bg-[#FF2156] top-0 z-50 w-full  ">
         <div className="main-container flex h-16 items-center justify-between">
            <NavLink to="/" className="flex items-center space-x-2">
               <span className="font-bold text-xl text-white">Date to Donate</span>
            </NavLink>
            <div className="flex items-center gap-10">
               <DesktopNav />
               <MobileNav />
               <div className="hidden md:block">
                  <button className="secondary-btn">LOG IN</button>
               </div>
            </div>
         </div>
      </header>
   );
};

function NavItem({ item }) {
   return (
      <NavLink
         to={item.path}
         className={({ isActive }) =>
            `text-sm font-medium transition-colors  hover:text-primary ${isActive ? "text-[#ffffff]" : "text-[#ffffff]"
            }`
         }
      >
         {item.label}
      </NavLink>
   );
}

function DesktopNav() {
   return (
      <nav className="hidden md:flex items-center space-x-8">
         {navItems.map((item) => (
            <NavItem key={item.path} item={item} />
         ))}
      </nav>
   );
}

function MobileNav() {
   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button
               variant="ghost"
               className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
               <Menu className="h-6 w-6" />
               <span className="sr-only">Toggle Menu</span>
            </Button>
         </SheetTrigger>
         <SheetContent side="right">
            <nav className="flex flex-col space-y-4">
               {navItems.map((item) => (
                  <NavItem key={item.path} item={item} />
               ))}
               <button className="secondary-btn">LOG IN</button>
            </nav>
         </SheetContent>
      </Sheet>
   );
}

export default Header;
