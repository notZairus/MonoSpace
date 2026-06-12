import type { Task } from "../schemas/task.schema";
import { cn } from "../lib/utils";
import TaskShowcase from "./TaskShowcase";
import { useState } from "react";

const statusStyles = {
  PENDING: "bg-slate-100 text-slate-700 ring-slate-200",
  COMPLETED: "bg-emerald-100 text-emerald-900 ring-emerald-200",
};

const taskColorStyles = {
  red: "bg-red-500",
  yellow: "bg-yellow-300",
  green: "bg-green-400",
};

const deadlineFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const TaskItem = ({
  task,
  variant = "secondary",
}: {
  task: Task;
  variant?: "primary" | "secondary";
}) => {
  const [showTask, setShowTask] = useState(false);

  return (
    <>
      <TaskShowcase open={showTask} setOpen={setShowTask} taskId={task.id} />

      <div
        className={cn(
          "rounded-3xl border w-full border-border bg-background/80 px-3 py-2",
          "w-full flex gap-1 min-h-20 cursor-pointer",
          variant === "primary" && "bg-white/10 border-0 shadow-md",
        )}
        onClick={() => setShowTask(true)}
      >
        <div
          className={`shrink-0 aspect-square w-2 min-h-20 rounded-full ${taskColorStyles[task.color]}`}
        />

        <div
          key={task.id}
          className={cn("w-full border-border p-2 flex-1 flex flex-col")}
        >
          {/* name amd status */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <h3
                className={cn(
                  "text-sm font-medium text-foreground truncate wrap-break-word max-w-24",
                  variant === "primary" && "text-white",
                )}
              >
                {task.name}
              </h3>
            </div>

            <span
              className={cn(
                `shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${statusStyles[task.status]}`,
                variant === "primary" && "bg-white/25 ring-0",
              )}
            >
              {task.status}
            </span>
          </div>

          <div className="mb-2 flex-1">
            <p
              className={cn(
                "text-xs text-muted-foreground truncate wrap-break-word flex-1 max-w-56",
                variant === "primary" && "text-white/80",
              )}
            >
              {task.description}
            </p>
          </div>

          <div className="flex items-center justify-between mt-1 gap-2 ">
            <span
              className={cn(
                "text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60",
                variant === "primary" && "text-white/60",
              )}
            >
              {task.subjects.map((sub) => sub.name).join(", ")}
            </span>
            <span
              className={cn(
                "shrink-0 text-[10px] uppercase tracking-widest text-muted-foreground/70",
                variant === "primary" && "text-white/70",
              )}
            >
              {deadlineFormatter.format(new Date(task.deadline as string))}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskItem;
