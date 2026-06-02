import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { CalendarDays, CheckCircle2, Circle, Tag, Plus } from "lucide-react";
import { type Task } from "@studybase/shared";
import { useToggleCompleteTask } from "../hooks/useToggleComplete";

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

function formatDeadline(iso?: string, includeYear = true) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(includeYear && { year: "numeric" }),
  });
}

// Dummy data generator matching the main Task shape
const getMockSubtasks = (): Task[] => [
  {
    id: "sub-1",
    name: "Analyze architectural patterns and structural goals",
    status: "COMPLETED",
    color: "green",
    deadline: "2024-12-01T17:00:00.000Z",
    description: "",
    subjects: [],
  },
  {
    id: "sub-2",
    name: "Draft initial layout variations and view models",
    status: "PENDING",
    color: "red",
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days out
    description: "",
    subjects: [],
  },
  {
    id: "sub-3",
    name: "Peer review with technical staff",
    status: "PENDING",
    color: "yellow",
    deadline: "2024-12-01T17:00:00.000Z",
    description: "",
    subjects: [],
  },
];

const TaskShowcase = ({
  open = false,
  setOpen,
  task,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  task: Task;
}) => {
  const color = colorConfig[task.color];
  const isCompleted = task.status === "COMPLETED";
  const deadline = formatDeadline(task.deadline);
  const toggleComplete = useToggleCompleteTask();

  // Local state to make dummy subtasks fully interactive for testing
  const [subtasks, setSubtasks] = useState<Task[]>(getMockSubtasks);

  const handleToggleComplete = () => {
    toggleComplete.mutate(task.id);
    setOpen(false);
  };

  const handleToggleSubtask = (subtaskId: string) => {
    setSubtasks((prev) =>
      prev.map((sub) =>
        sub.id === subtaskId
          ? {
              ...sub,
              status: sub.status === "COMPLETED" ? "PENDING" : "COMPLETED",
            }
          : sub,
      ),
    );
  };

  const completedSubtasksCount = subtasks.filter(
    (s) => s.status === "COMPLETED",
  ).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-lg p-0 overflow-hidden gap-0 rounded-2xl border bg-background shadow-xl"
        showCloseButton={true}
      >
        <div className="p-6 space-y-6">
          {/* Main Task Header */}
          <div className="flex items-start gap-3.5 pr-6">
            <button
              onClick={handleToggleComplete}
              className="mt-1 shrink-0 relative group transition-transform active:scale-95 focus:outline-none"
              aria-label={
                isCompleted ? "Mark task incomplete" : "Mark task complete"
              }
            >
              {isCompleted ? (
                <CheckCircle2 className="size-5 text-emerald-500 fill-emerald-50 dark:fill-emerald-950/30 transition-colors" />
              ) : (
                <Circle className="size-5 text-muted-foreground/50 group-hover:text-emerald-500 transition-colors" />
              )}
            </button>

            <div className="space-y-1 flex-1">
              <DialogTitle
                className={`text-lg font-semibold tracking-tight leading-snug transition-colors ${
                  isCompleted
                    ? "line-through text-muted-foreground/70"
                    : "text-foreground"
                }`}
              >
                {task.name}
              </DialogTitle>
            </div>
          </div>

          {/* Description Block */}
          {task.description && (
            <p className="text-[14px] text-muted-foreground/90 leading-relaxed bg-muted/30 px-4 py-3 rounded-xl border border-muted/50">
              {task.description}
            </p>
          )}

          {/* Subtasks Section */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                  Subtasks
                </h4>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground/90 border border-border/40">
                  {completedSubtasksCount} of {subtasks.length}
                </span>
              </div>
              <button className="text-[11px] font-medium text-muted-foreground/60 hover:text-foreground flex items-center gap-1 transition-colors group px-1 py-0.5 rounded">
                <Plus className="size-3 group-hover:scale-110 transition-transform" />
                Add
              </button>
            </div>

            <div className="rounded-xl border border-border/50 bg-card/30 divide-y divide-border/30 overflow-hidden">
              {subtasks.map((sub) => {
                const subConfig = colorConfig[sub.color];
                const subCompleted = sub.status === "COMPLETED";
                const subDeadline = formatDeadline(sub.deadline, false);

                return (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-3 gap-3 hover:bg-muted/20 transition-colors group/row"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <button
                        onClick={() => handleToggleSubtask(sub.id)}
                        className="shrink-0 transition-transform active:scale-95 focus:outline-none"
                      >
                        {subCompleted ? (
                          <CheckCircle2 className="size-4 text-emerald-500 fill-emerald-50 dark:fill-emerald-950/20" />
                        ) : (
                          <Circle className="size-4 text-muted-foreground/40 group-hover/row:text-muted-foreground/70" />
                        )}
                      </button>
                      <span
                        className={`text-sm tracking-tight truncate transition-colors ${
                          subCompleted
                            ? "line-through text-muted-foreground/50"
                            : "text-foreground/90"
                        }`}
                      >
                        {sub.name}
                      </span>
                    </div>

                    {/* Subtask Meta Context Badges */}
                    <div className="flex items-center gap-2 shrink-0 pl-1">
                      {subDeadline && !subCompleted && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted-foreground/70 bg-muted/50 px-1.5 py-0.5 rounded border border-border/30">
                          <CalendarDays className="size-2.5" />
                          {subDeadline}
                        </span>
                      )}
                      <span
                        className={`size-1.5 rounded-full ${subConfig.dot}`}
                        title={subConfig.label}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Metadata Panel */}
          <div className="rounded-xl border border-border/60 bg-card/50 divide-y divide-border/40 text-sm">
            {/* Priority Row */}
            <div className="flex items-center justify-between p-3.5">
              <span className="text-muted-foreground font-medium text-xs">
                Priority
              </span>
              <Badge
                variant="outline"
                className={`font-medium text-xs px-2.5 py-0.5 rounded-md gap-1.5 ${color.badge}`}
              >
                <span className={`size-1.5 rounded-full ${color.dot}`} />
                {color.label}
              </Badge>
            </div>

            {/* Deadline Row */}
            <div className="flex items-center justify-between p-3.5">
              <span className="text-muted-foreground font-medium text-xs">
                Due Date
              </span>
              {deadline ? (
                <div className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 bg-muted/60 px-2.5 py-0.5 rounded-md border">
                  <CalendarDays className="size-3.5 text-muted-foreground" />
                  <span>{deadline}</span>
                </div>
              ) : (
                <span className="text-xs text-muted-foreground/60 italic">
                  No deadline set
                </span>
              )}
            </div>

            {/* Subjects Row */}
            {task.subjects && task.subjects.length > 0 && (
              <div className="flex items-start justify-between p-3.5 gap-4">
                <span className="text-muted-foreground font-medium text-xs pt-1 flex items-center gap-1.5">
                  <Tag className="size-3 text-muted-foreground/70" />
                  Subjects
                </span>
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                  {task.subjects.map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium border border-border/40"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskShowcase;
