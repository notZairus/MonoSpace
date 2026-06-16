import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button"; // Imported shadcn button
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Tag,
  Plus,
  ChevronDown,
  Trash2, // Imported Trash icon for delete
} from "lucide-react";
import { type Task, type TaskDTO } from "../schemas/task.schema";
import { useToggleCompleteTask } from "../hooks/tasks/useToggleComplete";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useUpdateTask } from "../hooks/tasks/useUpdateTask";
import { useDebouncedCallback } from "use-debounce";
import { useDeleteTask } from "../hooks/tasks/useDeleteTask";
import AddSubTaskModal from "./AddSubTaskModal";
import { format } from "date-fns-tz";
import { Input } from "./ui/input";
import SubtaskItem from "./SubtaskItem";
import type { Tag as TagType } from "../schemas/tags.schema";
import TagInput from "./TagInput";

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

interface TaskShowcaseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  task: Task;
}

const TaskShowcase = ({ open = false, setOpen, task }: TaskShowcaseProps) => {
  const [taskCopy, setTaskCopy] = useState<Task | null>(task);
  const [openAddSubTaskModal, setOpenSubTaskModal] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const toggleComplete = useToggleCompleteTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const debouncedUpdateMutate = useDebouncedCallback(
    (taskId: string, updatedFields: Partial<TaskDTO>) => {
      updateTask.mutate({
        id: taskId,
        data: updatedFields,
      });
    },
    300,
  );

  if (!task || !taskCopy) {
    return (
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  const color = colorConfig[task.color];
  const isCompleted = task.status === "COMPLETED";
  const tags = task.tags?.map((t: TagType) => t.name);

  const handleToggleComplete = () => {
    toggleComplete.mutate(task.id);
  };

  const handleDeleteTask = () => {
    deleteTask.mutate(task.id);
    setOpenConfirmDelete(false);
    setOpen(false);
  };

  const completedSubtasksCount = task.subtasks?.filter(
    (s) => s.status === "COMPLETED",
  ).length;

  const emitUpdate = (fields: Partial<TaskDTO>) => {
    debouncedUpdateMutate(task.id, fields);
  };

  const handleAddTag = (tag: string) => {
    const existing = tags || [];
    if (existing.some((s) => s === tag)) return;
    emitUpdate({ tags: [...existing, tag] });
  };

  const handleRemoveTag = (tagName: string) => {
    const existing = tags || [];
    emitUpdate({ tags: existing.filter((s) => s !== tagName) });
  };

  return (
    <>
      <AddSubTaskModal
        open={openAddSubTaskModal}
        setOpen={setOpenSubTaskModal}
        parentId={task.id}
      />

      <Dialog
        open={openConfirmDelete}
        onOpenChange={setOpenConfirmDelete}
        modal={false}
      >
        <DialogContent className="sm:max-w-md p-6 rounded-2xl border bg-background shadow-xl">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Delete Task
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">"{task.name}"</span>?
            This action cannot be undone and will permanently remove all
            associated subtasks.
          </DialogDescription>
          <DialogFooter className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpenConfirmDelete(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteTask}
              className="rounded-xl"
            >
              Delete Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent
          className="sm:max-w-lg p-0 overflow-hidden gap-0 rounded-2xl border bg-background shadow-xl animate-in fade-in-50 duration-200"
          showCloseButton={false}
        >
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3.5  justify-between">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <button
                  onClick={handleToggleComplete}
                  className="shrink-0  relative group transition-transform active:scale-95 focus:outline-none"
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

                <div className="flex-1">
                  <DialogTitle className="sr-only">{task.name}</DialogTitle>
                  <input
                    type="text"
                    value={taskCopy.name}
                    onChange={(e) => {
                      setTaskCopy({ ...taskCopy, name: e.target.value });
                      emitUpdate({ name: e.target.value });
                    }}
                    placeholder="Task title..."
                    className={`w-full bg-transparent border-0 p-0 text-lg font-heading tracking-tight leading-snug focus:outline-none focus:ring-0 placeholder:text-muted-foreground/40 transition-colors ${
                      isCompleted
                        ? "line-through text-muted-foreground/60"
                        : "text-foreground"
                    }`}
                  />
                </div>
              </div>

              <button
                onClick={() => setOpenConfirmDelete(true)}
                className="p-1.5 my-1 rounded-lg text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 transition-all focus:outline-none active:scale-95 shrink-0"
                title="Delete task"
              >
                <Trash2 className="size-4.5" />
              </button>
            </div>

            <div className="relative bg-muted/20 rounded-xl border border-border/60 focus-within:border-muted-foreground/30 focus-within:bg-muted/30 transition-all">
              <textarea
                value={taskCopy.description || ""}
                onChange={(e) => {
                  setTaskCopy({
                    ...taskCopy,
                    description: e.target.value,
                  });
                  emitUpdate({ description: e.target.value });
                }}
                placeholder="Add a detailed description..."
                className="w-full max-h-36 bg-transparent border-0 p-3 text-[14px] text-muted-foreground/90 leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0 resize-y"
              />
            </div>

            <div className="rounded-xl border border-border/60 bg-card/50 divide-y divide-border/40 text-sm">
              <div className="flex items-center justify-between p-3.5">
                <span className="text-muted-foreground font-medium text-xs">
                  Priority
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="focus:outline-none group">
                      <Badge
                        variant="outline"
                        className={`font-medium text-xs px-2.5 py-1 rounded-md gap-1.5 cursor-pointer transition-all hover:bg-accent/40 ${color.badge}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${color.dot}`}
                        />
                        {color.label}
                        <ChevronDown className="size-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </Badge>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl min-w-35"
                  >
                    {(Object.keys(colorConfig) as Task["color"][]).map(
                      (key) => {
                        const cfg = colorConfig[key];
                        return (
                          <DropdownMenuItem
                            key={key}
                            onClick={() => emitUpdate({ color: key })}
                            className="flex items-center gap-2 text-xs py-2 rounded-lg cursor-pointer"
                          >
                            <span
                              className={`size-1.5 rounded-full ${cfg.dot}`}
                            />
                            {cfg.label}
                          </DropdownMenuItem>
                        );
                      },
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center justify-between p-3.5">
                <span className="text-muted-foreground font-medium text-xs">
                  Due Date
                </span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-1.5 text-xs font-medium text-foreground/80 bg-muted/60 hover:bg-muted/90 px-2.5 py-1 rounded-md border transition-colors focus:outline-none">
                      <CalendarDays className="size-3.5 text-muted-foreground" />
                      <span>
                        {new Date(task.deadline).toLocaleDateString() +
                          " - " +
                          new Date(task.deadline).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }) || "Set due date"}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="end"
                    className="p-0 w-auto rounded-xl shadow-lg scale-85 border"
                  >
                    <Calendar
                      mode="single"
                      selected={
                        task.deadline ? new Date(task.deadline) : undefined
                      }
                      onSelect={(date: Date | undefined) => {
                        if (!date) return;

                        const time = task.deadline.split("T")[1];

                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0",
                        );
                        const day = String(date.getDate()).padStart(2, "0");
                        const dateString = `${year}-${month}-${day}`;

                        emitUpdate({ deadline: `${dateString}T${time}` });
                      }}
                      className="rounded-xl"
                    />
                    <div className="px-2 pb-2">
                      <Input
                        type="time"
                        defaultValue={format(task.deadline, "HH:mm")}
                        onChange={(e) => {
                          const date = task.deadline.split("T")[0];
                          const time = e.target.value;

                          const datetime = new Date(`${date}T${time}`);

                          emitUpdate({ deadline: datetime.toISOString() });
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-start justify-between p-3.5 gap-4">
                <span className="text-muted-foreground font-medium text-xs pt-1.5 flex items-center gap-1.5">
                  <Tag className="size-3 text-muted-foreground/70" />
                  Tags
                </span>

                <div className="flex flex-wrap justify-end gap-1.5 max-w-[75%] items-center h-16 overflow-auto border rounded-xl">
                  <TagInput
                    className="max-w-56 border-0"
                    items={taskCopy.tags.map((tag: TagType) => tag.name) || []}
                    addItem={(newItem) => {
                      handleAddTag(newItem);
                    }}
                    removeItem={(item) => {
                      handleRemoveTag(item);
                    }}
                    placeholder="Add tag"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                    Subtasks
                  </h4>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground/90 border border-border/40">
                    {completedSubtasksCount} of {task.subtasks?.length}
                  </span>
                </div>
                <button
                  className="text-[11px] font-medium text-muted-foreground/60 hover:text-foreground flex items-center gap-1 transition-colors group px-1 py-0.5 rounded"
                  onClick={() => setOpenSubTaskModal(true)}
                >
                  <Plus className="size-3 group-hover:scale-110 transition-transform" />
                  Add
                </button>
              </div>

              <div>
                <ScrollArea className="h-32 rounded-xl border border-border/50 bg-card/30">
                  <ScrollBar />
                  <div className="rounded-xl border border-border/50 bg-card/30 divide-y divide-border/30 overflow-hidden">
                    {task.subtasks?.map((sub) => (
                      <SubtaskItem key={sub.id} subtask={sub} />
                    ))}
                    {task.subtasks?.length === 0 && (
                      <div className="p-3 w-full text-center text-muted-foreground/70 italic">
                        No subtasks yet. Add one to get started!
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TaskShowcase;
