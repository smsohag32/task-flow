
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";

const TaskColumn = ({ stage, tasks, refetch }) => {
   const { setNodeRef: setDroppableRef } = useDroppable({ id: `stage-${stage.name}` });

   return (
      <div
         ref={setDroppableRef}
         className="w-[380px]  lg:w-full h-[80vh] pb-6 bg-gray-800 overflow-y-auto custom-scrollbar border-e border-e-gray-500"
      >
         <div className="py-1 px-2 mb-2 !bg-blue-50 bg-opacity-5 shadow-sm flex items-center sticky top-0 z-10">
            <p className="text-base font-medium line-clamp-1 flex-1">{stage.name}</p>
            <div className="flex items-center text-des gap-1">
               <p>{tasks?.length}</p>
               <span className="w-4 h-4 bg-des bg-opacity-30 rounded-e-full"></span>
            </div>
         </div>

         <SortableContext items={tasks?.map((task) => `task-${task.id}`)} strategy={verticalListSortingStrategy}>
            <div className="px-1.5 grid gap-2">
               {tasks?.map((task) => (
                  <TaskCard refetch={refetch} key={task.id} task={task} />
               ))}
            </div>
         </SortableContext>
      </div>
   );
};

export default TaskColumn;
