import type { Task } from "../schemas/task.schema";
import TaskShowcase from "./TaskShowcase";
import { useState } from "react";
import { useToggleCompleteTask } from "../hooks/tasks/useToggleComplete";
import { Calendar, Pin } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { Circle, CheckCircle2 } from "lucide-react";

const taskColorStyles = {
  red: "bg-red-400/80",
  yellow: "bg-yellow-400/80",
  green: "bg-green-400/80",
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

      <motion.div
        initial={{
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        }}
        whileHover={{
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex w-full min-w-56 rounded-xl overflow-hidden border 0",
          task.color === "red" && "bg-red-400/4 border-red-400/16",
          task.color === "yellow" && "bg-yellow-400/4 border-yellow-400/16",
          task.color === "green" && "bg-green-400/4 border-green-400/16",
        )}
      >
        <div className="flex flex-col border-r">
          <div
            onClick={() => toggleComplete.mutate(task.id)}
            className="p-1.5 flex items-center justify-center"
          >
            {task.status === "COMPLETED" ? (
              <CheckCircle2 className="size-4 text-green-500" />
            ) : (
              <Circle className="size-4 text-muted-foreground" />
            )}
          </div>
          <div className={cn("flex-1", taskColorStyles[task.color])}></div>
        </div>
        <div
          className="flex-1 px-3 py-2 cursor-pointer"
          onClick={() => setShowTask(true)}
        >
          <p
            className={cn(
              "font-medium text-[1rem] border-b mb-1 line-clamp-1 w-full",
              task.status === "COMPLETED" &&
                "text-muted-foreground line-through",
            )}
          >
            {task.name}
          </p>
          {task.description && (
            <p
              className={cn(
                "text-muted-foreground text-sm text-ellipsis line-clamp-2",
                task.status === "COMPLETED" && "line-through",
              )}
            >
              {task.description}
            </p>
          )}
          <div
            className={cn(
              "mt-4 flex gap-1 items-center text-muted-foreground",
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
                <span
                  className={cn(
                    "text-xs border px-2 py-1 rounded-full",
                    task.status === "COMPLETED" && "line-through",
                  )}
                  key={tag.id}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default TaskItem;
