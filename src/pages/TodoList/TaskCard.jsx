import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisVertical, Trash2, Edit2, Check, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/redux-store/features/taskApi";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import moment from "moment";

const TaskCard = ({ task, refetch }) => {
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [editedTitle, setEditedTitle] = useState(task.title);
   const [editedDescription, setEditedDescription] = useState(task.description);
   const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
   const [updateTask, { isLoading: isEditingLoading }] = useUpdateTaskMutation();

   const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
   } = useSortable({
      id: `task-${task.id}`,
      data: { type: "task", task },
   });

   const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      cursor: "grab",
   };

   const handleDelete = () => {
      setIsDeleteDialogOpen(true);
   };

   const handleConfirmDelete = async () => {
      try {
         await deleteTask(task?.id);
         toast.success("Task deleted successfully");
         refetch();
      } catch {
         toast.error("Failed to delete task.");
      }
      setIsDeleteDialogOpen(false);
   };

   const handleEdit = (e) => {
      e.stopPropagation();
      setIsEditing(true);
   };

   const handleSaveEdit = async () => {
      try {
         await updateTask({ id: task.id, updatedData: { title: editedTitle, description: editedDescription } });
         setIsEditing(false);
         refetch()
         console.log("dflkasfjkla")
      } catch {
         toast.error("Failed to edit task. Please try again.");
      }

   };

   const handleCancelEdit = () => {
      setEditedTitle(task.title);
      setEditedDescription(task.description);
      setIsEditing(false);
   };

   const statusColors = {
      "Inprogress": "bg-blue-100 text-blue-800",
      "Pending": "bg-yellow-100 text-yellow-800",
      "Completed": "bg-green-100 text-green-800",
   };

   const priorityColors = {
      "High": "bg-red-100 text-red-800",
      "Medium": "bg-orange-100 text-orange-800",
      "Low": "bg-green-100 text-green-800",
   };

   return (
      <Card
         ref={setNodeRef}
         style={style}
         {...attributes}
         {...listeners}
         className="p-4 w-full bg-white shadow-md rounded-lg border hover:shadow-lg transition-shadow duration-200"
      >
         <div className="flex justify-between items-start">
            <div className="flex flex-col flex-grow mr-4">
               {isEditing ? (
                  <Input
                     value={editedTitle}
                     onPointerDown={(e) => e.stopPropagation()}
                     onChange={(e) => setEditedTitle(e.target.value)}
                     className="text-lg font-semibold mb-2"
                  />
               ) : (
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
               )}
               {isEditing ? (
                  <Textarea
                     value={editedDescription}
                     onPointerDown={(e) => e.stopPropagation()}
                     onChange={(e) => setEditedDescription(e.target.value)}
                     className="text-sm text-gray-600 mb-2"
                     rows={3}
                  />
               ) : (
                  <p className="text-sm text-gray-600 w-full break-all overflow-wrap-anywhere mb-2">
                     {task.description}
                  </p>

               )}
            </div>

            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 rounded-full">
                     <EllipsisVertical size={16} />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  <DropdownMenuItem type="button" onPointerDown={(e) => e.stopPropagation()} onClick={handleEdit}>
                     <Edit2 size={16} className="mr-2 text-green-500" />
                     <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem type="button" onPointerDown={(e) => e.stopPropagation()} onClick={handleDelete} className="text-red-600">
                     <Trash2 size={16} className="mr-2" />
                     <span>Delete</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>

         <div className="flex flex-wrap justify-between items-center mt-3 gap-2">
            <Badge className={`${statusColors[task.status]} text-xs px-2 py-1`}>
               {task.status}
            </Badge>
            <Badge className={`${priorityColors[task.priority]} text-xs px-2 py-1`}>
               {task.priority}
            </Badge>
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger>
                     <span className="text-sm text-gray-500">{moment(task.dueDate).format("lll")}</span>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Due: {moment(task.dueDate).format("LLLL")}</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>

         {isEditing && (
            <div className="flex justify-end mt-3 space-x-2">
               <Button type="button" onPointerDown={(e) => e.stopPropagation()} size="sm" variant="outline" onClick={handleCancelEdit}>
                  <X size={16} className="mr-1" /> Cancel
               </Button>
               <Button type="button" onPointerDown={(e) => e.stopPropagation()} size="sm" onClick={handleSaveEdit}>
                  <Check size={16} className="mr-1" /> Save
               </Button>
            </div>
         )}

         <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="p-8">
               <DialogHeader>
                  <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
                  <DialogDescription>
                     This action cannot be undone. This will permanently delete the task.
                  </DialogDescription>
               </DialogHeader>
               <DialogFooter className={"mt-8"}>
                  <Button className={"cursor-pointer"} type="button" onPointerDown={(e) => e.stopPropagation()} variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                     Cancel
                  </Button>
                  <Button className={"cursor-pointer"} type="button" onPointerDown={(e) => e.stopPropagation()} variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting}>
                     {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </Card>
   );
};

export default TaskCard;
