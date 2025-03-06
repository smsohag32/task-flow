
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const Modal = ({ isOpen, handleClose, title, size, children }) => {
   const isDesktop = true
   console.log(isOpen)
   if (isDesktop) {
      return <Dialog open={isOpen} onOpenChange={handleClose}>
         <DialogContent className="w-full"
            style={{ maxWidth: size || "auto" }}>
            <DialogHeader className={"border-b"}>
               <DialogTitle className="px-6 pt-6 pb-4">{title}</DialogTitle>
            </DialogHeader>
            <div className="  w-full px-6 -mt-4 pt-6 pb-6 max-h-[85vh] overflow-y-auto">
               {children}
            </div>
         </DialogContent>
      </Dialog>
   }

};

export default Modal;
