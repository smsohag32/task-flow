import { useEffect, useState } from "react";
import { DndContext, closestCenter, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import { Plus } from 'lucide-react';
import TaskColumn from "./TaskColumn";
import Loading from "@/components/Loading/Loading";
import { toast } from "sonner";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { useChangeTaskStatusMutation, useGetAllTasksQuery } from "@/redux-store/features/taskApi";
import ToDoHeader from "./ToDoHeader";

const TaskContainer = () => {
   const { data, refetch, isLoading } = useGetAllTasksQuery();
   const [changeStatus] = useChangeTaskStatusMutation();
   const [taskData, setTaskData] = useState([]);
   const [activeItem, setActiveItem] = useState(null);
   const [isAdd, setIsAdd] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");
   const [status, setStatus] = useState(null);
   const [priority, setPriority] = useState(null);
   const [date, setDate] = useState({ from: null, to: null });

   const stages = [
      { name: "Inprogress" },
      { name: "Pending" },
      { name: "Completed" },
   ];

   useEffect(() => {
      if (data?.tasks) {
         setTaskData(data.tasks.map(task => ({ ...task, id: task._id })));
      }
   }, [data]);

   const filteredTasks = taskData.filter(task => {
      const matchesSearch = searchQuery ? task.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
      const matchesStatus = status ? task.status.toLowerCase() === status.toLowerCase() : true;
      const matchesPriority = priority ? task.priority.toLowerCase() === priority.toLowerCase() : true;
      const matchesDate = date.from ? new Date(task.dueDate) >= new Date(date.from) && (!date.to || new Date(task.dueDate) <= new Date(date.to)) : true;
      return matchesSearch && matchesStatus && matchesPriority && matchesDate;
   });

   const handleDragStart = (event) => {
      setActiveItem(event.active.id || null);
   };

   const handleDragOver = (event) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      if (activeId.startsWith("task-") && overId.startsWith("stage-")) {
         const activeIndex = taskData.findIndex((task) => `task-${task.id}` === activeId);
         const updatedTasks = [...taskData];
         updatedTasks[activeIndex] = { ...updatedTasks[activeIndex], status: overId.replace("stage-", "") };
         setTaskData(updatedTasks);
      }
   };

   const handleDragEnd = async (event) => {
      const { active, over } = event;
      if (!over) return setActiveItem(null);

      if (active.id.startsWith("task-") && over.id.startsWith("stage-")) {
         const activeIndex = taskData.findIndex((task) => `task-${task.id}` === active.id);
         if (activeIndex === -1) return;

         try {
            await changeStatus({ id: taskData[activeIndex].id, status: over.id.replace("stage-", "") }).unwrap();
            toast.success("Task status updated successfully");
            refetch();
         } catch {
            toast.error("Failed to update task status.");
         }
      }
      setActiveItem(null);
   };

   const collisionDetectionStrategy = (args) => {
      const pointerCollisions = pointerWithin(args);
      return pointerCollisions.length > 0 ? pointerCollisions : closestCenter(args);
   };

   return (
      <div className="w-full">
         {isLoading ? <Loading /> : (
            <DndContext
               collisionDetection={collisionDetectionStrategy}
               onDragStart={handleDragStart}
               onDragOver={handleDragOver}
               onDragEnd={handleDragEnd}
            >
               <div className="flex items-center flex-col lg:flex-row justify-between gap-6 w-full">
                  <h2 className="flex items-center gap-2">
                     <span className="text-[24px] flex items-center gap-1">TO DO</span>
                     <span className="text-[24px]">- ({filteredTasks.length || 0})</span>
                  </h2>
                  <div className="flex items-center gap-2">
                     <button onClick={() => setIsAdd(true)} className="primary-btn flex items-center gap-2">
                        <Plus size={16} /> Add New
                     </button>
                  </div>
               </div>
               <ToDoHeader
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  status={status}
                  setStatus={setStatus}
                  priority={priority}
                  setPriority={setPriority}
                  date={date}
                  setDate={setDate}
                  onClearFilters={() => {
                     setSearchQuery("");
                     setStatus(null);
                     setPriority(null);
                     setDate({ from: null, to: null });
                  }}
               />
               <div className="flex border-s border-s-gray-300 w-full mt-3 flex-nowrap overflow-x-auto h-[80vh]">
                  <SortableContext items={stages.map(stage => `stage-${stage.name}`)} strategy={rectSortingStrategy}>
                     {stages.map(stage => (
                        <TaskColumn
                           key={stage.name}
                           stage={stage}
                           refetch={refetch}
                           tasks={filteredTasks.filter(task => task.status.toLowerCase() === stage.name.toLowerCase())}
                        />
                     ))}
                  </SortableContext>
               </div>
               <DragOverlay>
                  {activeItem && (
                     activeItem.startsWith("task-") ? (
                        <TaskCard
                           task={filteredTasks.find(task => `task-${task.id}` === activeItem)}
                           isOverlay={true}
                        />
                     ) : (
                        <div className="bg-white border border-gray-300 rounded-md p-2 shadow-lg">
                           {stages.find(stage => `stage-${stage.name}` === activeItem)?.name}
                        </div>
                     )
                  )}
               </DragOverlay>
            </DndContext>
         )}
         <AddTask isOpen={isAdd} setIsOpen={setIsAdd} refetch={refetch} />
      </div>
   );
};

export default TaskContainer;
