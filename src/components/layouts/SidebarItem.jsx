import { NavLink, useLocation, useNavigate } from "react-router-dom";

const SidebarItem = ({ to, label, subItems, isOpen, onToggle, icon }) => {
   const navigate = useNavigate();
   const { pathname } = useLocation();

   const isSubActive = (path) => pathname === path;

   const isActive =
      pathname === to ||
      (subItems &&
         subItems?.some((subItem) => {
            return (
               isSubActive(subItem.to) ||
               (subItem.resubItems &&
                  subItem.resubItems.some((resubItem) => isSubActive(resubItem.to)))
            );
         }));

   const handleClick = () => {
      if (subItems) {
         onToggle();
      } else {
         navigate(to);
      }
   };


   return (
      <>
         <div
            onClick={handleClick}
            className={`text-[16px] rounded-[4px] group whitespace-nowrap transition-all w-full font-medium py-[12px] ps-[20px] pe-[14px] cursor-pointer
               ${isActive ? "bg-white text-primary shadow-sm" : "text-title hover:bg-white hover:text-title"}`}
         >
            <div className="w-full bg-transparent">
               <div className="flex items-center w-full bg-transparent gap-[16px] h-full">
                  <div className="flex items-center gap-4 flex-1">
                     {icon && <span>{icon}</span>}
                     {label}
                  </div>
                  {subItems && (
                     <span
                        className={`flex items-center transition-all duration-300 transform justify-center ml-auto
                           ${isActive ? "text-primary" : "text-title"} ${!isOpen ? "rotate-180" : "rotate-0"}`}
                     >
                        <svg
                           width="14"
                           height="10"
                           viewBox="0 0 14 10"
                           fill="none"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              d="M12 7.5L7 2.5L2 7.5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                        </svg>
                     </span>
                  )}
               </div>
            </div>
         </div>
         {subItems && (
            <div
               className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
               style={{ transitionTimingFunction: "ease-in-out" }}
            >
               <div className="w-full grid gap-2">
                  {subItems?.map((subItem, index) => {
                     const subItemActive =
                        isSubActive(subItem.to) ||
                        (subItem.resubItems &&
                           subItem.resubItems.some((resubItem) => isSubActive(resubItem.to)));
                     return (
                        <div key={index} className="w-full">
                           <div >
                              <NavLink
                                 className={` rounded-[4px] whitespace-nowrap text-[15px] font-normal pl-[40px] flex items-center gap-[14px] py-[10px] pe-[12px] cursor-pointer
                                    ${subItemActive ? "bg-slate-100 text-primary " : "text-title hover:bg-slate-100 hover:text-title"}`}
                                 to={subItem.to}
                              >
                                 <span className={subItemActive ? "text-primary" : "text-title"}> {subItem.icon}</span> {subItem.label}
                              </NavLink>
                           </div>
                        </div>
                     );
                  })}
               </div>
            </div>
         )}
      </>
   );
};

export default SidebarItem;
