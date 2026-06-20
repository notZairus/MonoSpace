import { useEffect, useState } from "react";
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
  CheckCircle2,
  Circle,
  ChevronDown,
  Trash2, // Imported Trash icon for delete
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { type Subtask, type SubtaskDTO } from "../schemas/subtask.schema";
import { useDebouncedCallback } from "use-debounce";
import { useUpdateSubtask } from "../hooks/subtasks/useUpdateSubtask";
import { useDeleteSubtask } from "../hooks/subtasks/useDeleteSubtask";

const colorConfig: Record<
  Subtask["color"],
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

interface SubtaskShowcaseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  subtask: Subtask;
}

const SubtaskShowcase = ({
  open = false,
  setOpen,
  subtask,
}: SubtaskShowcaseProps) => {
  const [subtaskCopy, setSubtaskCopy] = useState<Subtask | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const updateTask = useUpdateSubtask();
  const deleteSubtask = useDeleteSubtask();

  useEffect(() => {
    function syncSubtask() {
      setSubtaskCopy(subtask);
    }

    syncSubtask();
  }, [subtask]);

  // const toggleComplete = useToggleCompleteTask();
  // const deleteTask = useDeleteTask();

  const debouncedUpdateMutate = useDebouncedCallback(
    (taskId: string, updatedFields: Partial<SubtaskDTO>) => {
      updateTask.mutate({
        id: taskId,
        data: updatedFields,
      });
    },
    600,
  );

  if (!subtask || !subtaskCopy) {
    return (
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  const color = colorConfig[subtask.color];
  const isCompleted = subtask.status === "COMPLETED";

  // const handleToggleComplete = () => {
  //   toggleComplete.mutate(subtask.id);
  // };

  const handleDeleteSubtask = () => {
    deleteSubtask.mutate(subtask.id);
    setOpenConfirmDelete(false);
    setOpen(false);
  };

  const emitUpdate = (fields: Partial<SubtaskDTO>) => {
    debouncedUpdateMutate(subtask.id, fields);
  };

  // const handleAddTag = (tag: string) => {
  //   const existing = tags || [];
  //   if (existing.some((s) => s === tag)) return;
  //   emitUpdate({ tags: [...existing, tag] });
  // };

  // const handleRemoveTag = (tagName: string) => {
  //   const existing = tags || [];
  //   emitUpdate({ tags: existing.filter((s) => s !== tagName) });
  // };

  return (
    <>
      <Dialog
        open={openConfirmDelete}
        onOpenChange={setOpenConfirmDelete}
        modal={false}
      >
        <DialogContent className="sm:max-w-md p-6 rounded-2xl border bg-background shadow-xl">
          <DialogTitle className="text-lg tracking-tight">
            Delete Subtask
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              "{subtask.name}"
            </span>
            ? This action cannot be undone and will permanently remove all
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
              onClick={handleDeleteSubtask}
              className="rounded-xl"
            >
              Delete Subtask
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent
          className="sm:max-w-sm p-0 overflow-hidden gap-0 rounded-2xl border bg-background shadow-xl animate-in fade-in-50 duration-200"
          showCloseButton={false}
        >
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3.5  justify-between">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <button
                  // onClick={handleToggleComplete}
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
                  <DialogTitle className="sr-only">
                    {subtaskCopy.name}
                  </DialogTitle>
                  <input
                    type="text"
                    value={subtaskCopy.name}
                    onChange={(e) => {
                      setSubtaskCopy({ ...subtaskCopy, name: e.target.value });
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
                value={subtaskCopy.description || ""}
                onChange={(e) => {
                  setSubtaskCopy({
                    ...subtaskCopy,
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
                    {(Object.keys(colorConfig) as Subtask["color"][]).map(
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
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubtaskShowcase;
