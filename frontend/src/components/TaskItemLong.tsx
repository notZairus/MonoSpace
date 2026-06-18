import { CheckCircle2, Circle } from "lucide-react";
import type { Task } from "../schemas/task.schema";
import { useToggleCompleteTask } from "../hooks/tasks/useToggleComplete";
import TaskShowcase from "./TaskShowcase";
import { useState } from "react";

const colorConfig: Record<
  Task["color"],
  { dot: string; badge: string; text: string; label: string }
> = {
  red: {
    dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]",
    badge:
      "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/50",
    text: "text-rose-600 dark:text-rose-400",
    label: "High Priority",
  },
  yellow: {
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    badge:
      "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/50",
    text: "text-amber-600 dark:text-amber-400",
    label: "Medium Priority",
  },
  green: {
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Low Priority",
  },
};

const deadlineFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function TaskItemLong({ task }: { task: Task }) {
  const [openTask, setOpenTask] = useState(false);
  const taskConfig = colorConfig[task.color];
  const taskCompleted = task.status === "COMPLETED";
  const toggleComplete = useToggleCompleteTask();

  const handleToggleCompleteTask = (taskId: string) => () => {
    toggleComplete.mutate(taskId);
  };

  return (
    <>
      <TaskShowcase open={openTask} setOpen={setOpenTask} task={task} />

      <div
        className={`flex items-center justify-between p-3 gap-3 hover:bg-muted/20 transition-colors group/row cursor-pointer`}
      >
        <div
          className="flex items-center gap-2.5 min-w-0 flex-1"
          onClick={(e) => {
            e.stopPropagation();
            setOpenTask(true);
          }}
        >
          <div
            className="shrink-0 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleCompleteTask(task.id)();
            }}
          >
            {taskCompleted ? (
              <CheckCircle2 className="size-4 text-emerald-500 fill-emerald-50 dark:fill-emerald-950/20" />
            ) : (
              <Circle className="size-4 text-muted-foreground/40 group-hover/row:text-muted-foreground/70" />
            )}
          </div>

          <div className="flex flex-col min-w-0">
            <span
              className={`text-sm tracking-tight truncate transition-colors ${
                taskCompleted
                  ? "line-through text-muted-foreground/50"
                  : "text-foreground/90"
              }`}
            >
              {task.name}
            </span>

            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] uppercase font-medium text-muted-foreground/60 tracking-wider">
                {deadlineFormatter.format(new Date(task.deadline as string))}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 pl-1">
          <span
            className={`size-1.5 rounded-full ${taskConfig.dot}`}
            title={taskConfig.label}
          />
        </div>
      </div>
    </>
  );
}

export default TaskItemLong;
