
import { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { ChevronsLeft, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { items } from "./LinkItems";
import { ScrollArea } from "@/components/ui/scroll-area";
import Logo from "@/assets/logo/Logo";

export default function Sidebar({ setToggle }) {
   const [openItems, setOpenItems] = useState({});
   const [isOpen, setIsOpen] = useState(false);

   const handleToggle = (label) => {
      setOpenItems((prev) => ({ ...prev, [label]: !prev[label] }));
   };



   const SidebarContent = () => (
      <div className="flex  scroll-smooth flex-col h-full bg-blue-50  border-e border-e-slate-200">
         <div className="flex items-center justify-between py-4 ps-8">
            <Logo className="w-32" />
         </div>
         <ScrollArea className="flex-1 px-4 pb-8 scroll-smooth ">
            <div className="!grid  !gap-2">
               {items.map((item, index) => (
                  <SidebarItem
                     key={index}
                     to={item.to}
                     label={item.label}
                     isOpen={!!openItems[item.label]}
                     onToggle={() => handleToggle(item.label)}
                     icon={item.icon}
                     subItems={item.subItems}
                  />
               ))}
            </div>
         </ScrollArea>
      </div>
   );

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth >= 1024) {
            setIsOpen(false);
            setToggle(false);
         }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, [setToggle]);

   return (
      <>
         <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
               <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden fixed left-4 top-4 z-40"
               >
                  <Menu className="h-6 w-6" />
               </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[300px]">
               <SidebarContent />
            </SheetContent>
         </Sheet>

         <div className="hidden lg:block top-0 left-0 w-[300px] h-screen">
            <SidebarContent />
         </div>
      </>
   );
}
