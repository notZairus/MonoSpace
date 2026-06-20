import type { Task } from "../schemas/task.schema";
import TaskShowcase from "./TaskShowcase";
import { useState } from "react";
import { useToggleCompleteTask } from "../hooks/tasks/useToggleComplete";
import { Calendar, Pin } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "../lib/utils";

const taskColorStyles = {
  red: "bg-red-400",
  yellow: "bg-yellow-400",
  green: "bg-green-400",
};

const deadlineFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const TaskItem = ({ task }: { task: Task }) => {
  const [showTask, setShowTask] = useState(false);
  const toggleComplete = useToggleCompleteTask();

  return (
    <>
      <TaskShowcase open={showTask} setOpen={setShowTask} task={task} />

      <div className="flex max-w-120 w-full min-w-56 rounded-xl overflow-hidden border">
        <div className="w-6 flex flex-col border-r">
          <div className="h-9 flex items-center justify-center">
            <Checkbox
              checked={task.status === "COMPLETED"}
              onCheckedChange={() => toggleComplete.mutate(task.id)}
            />
          </div>
          <div className={cn("flex-1", taskColorStyles[task.color])}></div>
        </div>
        <div
          className="flex-1 px-3 py-2 cursor-pointer"
          onClick={() => setShowTask(true)}
        >
          <p
            className={cn(
              "text-lg border-b mb-1 font-semibold line-clamp-1 w-full",
              task.status === "COMPLETED" &&
                "text-muted-foreground line-through",
            )}
          >
            {task.name}
          </p>
          <p
            className={cn(
              "text-muted-foreground text-sm text-ellipsis line-clamp-2",
              task.status === "COMPLETED" && "line-through",
            )}
          >
            {task.description}
          </p>
          <div
            className={cn(
              "mt-2 flex gap-1 items-center text-muted-foreground",
              task.status === "COMPLETED" && "line-through",
            )}
          >
            <Calendar size="12" />
            <p className={cn("text-xs leading-0")}>
              {deadlineFormatter.format(new Date(task.deadline))}
            </p>
          </div>
          {task.tags.length > 0 && (
            <div className="flex items-center flex-wrap gap-1  mt-2">
              <Pin size="12" className="text-muted-foreground" />
              {task.tags.map((tag) => (
                <span className="text-xs border px-2 py-1 rounded-full">
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskItem;
