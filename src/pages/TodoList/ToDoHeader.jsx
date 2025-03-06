import { Search, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const ToDoHeader = ({
   searchQuery,
   setSearchQuery,
   status,
   setStatus,
   priority,
   setPriority,
   date,
   setDate,
   onClearFilters,
}) => {
   const handleSearch = (e) => {
      setSearchQuery(e.target.value);
   };

   const handleStatusChange = (value) => {
      setStatus(value);
   };

   const handlePriorityChange = (value) => {
      setPriority(value);
   };

   const handleDateChange = (range) => {
      setDate(range);
   };

   const clearFilters = () => {
      setSearchQuery("");
      setStatus(null);
      setPriority(null);
      setDate({ from: undefined, to: undefined });
      onClearFilters();
   };

   const hasActiveFilters = searchQuery || status || priority || date.from;

   return (
      <div className="bg-background border-b p-4 sticky top-0 z-10">
         <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
               <h1 className="text-2xl font-bold">Tasks</h1>
               <Button variant="outline" size="sm" onClick={clearFilters} disabled={!hasActiveFilters}>
                  <X className="h-4 w-4 mr-1" /> Clear Filters
               </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
               <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search tasks..." className="pl-8" value={searchQuery} onChange={handleSearch} />
               </div>

               <Select value={status || ""} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                     <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Statuses</SelectItem>
                     <SelectItem value="Inprogress">In Progress</SelectItem>
                     <SelectItem value="Pending">Pending</SelectItem>
                     <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
               </Select>

               <Select value={priority || ""} onValueChange={handlePriorityChange}>
                  <SelectTrigger>
                     <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="all">All Priorities</SelectItem>
                     <SelectItem value="High">High</SelectItem>
                     <SelectItem value="Medium">Medium</SelectItem>
                     <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
               </Select>

               <Popover>
                  <PopoverTrigger asChild>
                     <Button variant="outline" className="justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date?.from ? (date.to ? `${format(date.from, "LLL dd, y")} - ${format(date?.to, "LLL dd, y")}` : format(date?.from, "LLL dd, y")) : "Due Date"}
                     </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                     <CalendarComponent initialFocus mode="range" defaultMonth={date.from} selected={date} onSelect={handleDateChange} numberOfMonths={2} />
                  </PopoverContent>
               </Popover>
            </div>
         </div>
      </div>
   );
};

export default ToDoHeader;
