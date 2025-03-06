
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCreateTaskMutation } from "@/redux-store/features/taskApi";
import Modal from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const AddTask = ({ isOpen, setIsOpen, refetch }) => {
   const { register, handleSubmit, formState: { errors }, reset } = useForm();
   const [createTask, { isLoading }] = useCreateTaskMutation();

   // Handle form submission
   const onSubmit = async (data) => {
      try {

         console.log(data)
         await createTask(data).unwrap();
         toast.success("Task added successfully!");
         refetch();
         setIsOpen(false);
         reset();
      } catch {
         toast.error("Failed to add task. Please try again.");
      }
   };


   const handleClose = () => {
      setIsOpen(false);
      reset();
   }
   return (
      <Modal isOpen={isOpen} handleClose={handleClose} title={"Add a New Task"}>

         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
               <label htmlFor="title" className="text-sm font-medium">Task Title</label>
               <Input
                  id="title"
                  {...register("title", { required: "Task title is required" })}
                  placeholder="Task Title"
                  className="block w-full p-2 border "
               />
               {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
               <label htmlFor="description" className="text-sm font-medium">Task Description</label>
               <Textarea
                  rows={8}
                  id="description"
                  {...register("description", { required: "Task description is required" })}
                  placeholder="Task Description"
                  className="block w-full p-2 border "
               />
               {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div>
               <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
               <Input
                  id="dueDate"
                  type="date"
                  {...register("dueDate", { required: "Due date is required" })}
                  className="block w-full p-2 border "
               />
               {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate.message}</p>}
            </div>

            <div>
               <label htmlFor="status" className="text-sm font-medium">Status</label>
               <select
                  id="status"
                  {...register("status", { required: "Status is required" })}
                  className={cn(
                     "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                     "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                     "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                  )}
               >
                  <option value="Inprogress">Inprogress</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
               </select>
               {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            <div>
               <label htmlFor="priority" className="text-sm font-medium">Priority</label>
               <select
                  id="priority"
                  {...register("priority", { required: "Priority is required" })}
                  className={cn(
                     "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-11 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                     "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                     "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

                  )}
               >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
               </select>
               {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
            </div>

            <div className="flex justify-end gap-2 mt-4">
               <button className="secondary-btn" onClick={() => setIsOpen(false)}>
                  Cancel
               </button>
               <button type="submit" className="primary-btn" disabled={isLoading}>
                  {isLoading ? "Adding..." : "Add Task"}
               </button>
            </div>
         </form>
      </Modal>
   );
};

export default AddTask;
