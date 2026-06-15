import { type Subtask } from "../schemas/subtask.schema";
import { type Task } from "../schemas/task.schema";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { CheckCircle2, Circle } from "lucide-react";
import { useToggleCompleteSubtask } from "../hooks/subtasks/useToggleCompleteSubtask";

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

function SubtaskItem({ subtask }: { subtask: Subtask }) {
  const subConfig = colorConfig[subtask.color];
  const subCompleted = subtask.status === "COMPLETED";
  const toggleComplete = useToggleCompleteSubtask();

  return (
    <HoverCard key={subtask.id}>
      <div className="flex items-center justify-between p-3 gap-3 hover:bg-muted/20 transition-colors group/row">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <button
            className="shrink-0 transition-transform active:scale-95 focus:outline-none"
            onClick={() => {
              toggleComplete.mutate(subtask.id);
            }}
          >
            {subCompleted ? (
              <CheckCircle2 className="size-4 text-emerald-500 fill-emerald-50 dark:fill-emerald-950/20" />
            ) : (
              <Circle className="size-4 text-muted-foreground/40 group-hover/row:text-muted-foreground/70" />
            )}
          </button>
          <HoverCardTrigger className="min-w-0 flex-1" asChild>
            <span
              className={`text-sm tracking-tight truncate transition-colors ${
                subCompleted
                  ? "line-through text-muted-foreground/50"
                  : "text-foreground/90"
              }`}
            >
              {subtask.name}
            </span>
          </HoverCardTrigger>
          <HoverCardContent
            className="w-auto p-3 rounded-xl max-w-xs border shadow-lg"
            align="start"
          >
            <p
              className={`text-sm leading-relaxed ${
                subCompleted
                  ? "line-through text-muted-foreground/50"
                  : "text-foreground/90"
              }`}
            >
              {subtask.description || "No description provided."}
            </p>
          </HoverCardContent>
        </div>

        <div className="flex items-center gap-2 shrink-0 pl-1">
          <span
            className={`size-1.5 rounded-full ${subConfig.dot}`}
            title={subConfig.label}
          />
        </div>
      </div>
    </HoverCard>
  );
}

export default SubtaskItem;
