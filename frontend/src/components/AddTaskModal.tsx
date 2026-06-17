import { type Dispatch, type SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  CalendarDays,
  Tag,
  AlertCircle,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { type TaskDTO, createTaskSchema } from "../schemas/task.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "../hooks/tasks/useCreateTask";
import TagInput from "./TagInput";

const priorityConfig = {
  red: {
    dot: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]",
    label: "High Priority",
  },
  yellow: {
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    label: "Medium Priority",
  },
  green: {
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    label: "Low Priority",
  },
};

const getTomorrowDefault = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setMinutes(tomorrow.getMinutes() - tomorrow.getTimezoneOffset());
  return tomorrow.toISOString().slice(0, 16);
};

function AddTaskModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
    watch,
  } = useForm<TaskDTO>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "PENDING",
      tags: [],
      color: "red",
      deadline: getTomorrowDefault(), // Default to tomorrow
    },
  });

  const createTask = useCreateTask();

  // Directly watching hook-form state removes duplicate sync arrays
  const watchedTags = watch("tags") || [];
  const watchedDeadline = watch("deadline");
  const watchedStatus = watch("status");
  const watchedColor = watch("color");

  const handleAddTag = (tag: string) => {
    if (!tag || watchedTags.includes(tag)) return;
    setValue("tags", [...(getValues("tags") as string[]), tag], {
      shouldValidate: true,
    });
  };

  const handleRemoveTag = (tag: string) => {
    setValue(
      "tags",
      (getValues("tags") as string[]).filter((t) => t !== tag),
      { shouldValidate: true },
    );
  };

  const onSubmit = (data: TaskDTO) => {
    createTask.mutate(data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl border bg-background shadow-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-h-[85vh]"
        >
          <DialogHeader className="px-6 pt-5 pb-3 border-b border-border/40 bg-muted/20">
            <DialogTitle className="text-lg tracking-tight text-foreground/90">
              Create New Task
            </DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto p-6 space-y-5 flex-1">
            <div className="space-y-1">
              <Input
                id="name"
                autoFocus
                placeholder="Task title..."
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                  <AlertCircle className="size-3" /> {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <div className="relative bg-muted/20 rounded-xl border border-border/60 focus-within:border-muted-foreground/30 focus-within:bg-muted/30 transition-all">
                <textarea
                  id="description"
                  {...register("description")}
                  placeholder="Add a detailed description..."
                  className="w-full max-h-36 bg-transparent border-0 p-3 text-[14px] text-muted-foreground/90 leading-relaxed placeholder:text-muted-foreground/40 focus:outline-none focus:ring-0 resize-y"
                />
              </div>
              {errors.description && (
                <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                  <AlertCircle className="size-3" />{" "}
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-border/60 bg-card/40 divide-y divide-border/40 text-sm overflow-hidden">
              <div className="flex items-center justify-between p-3">
                <Label className="text-muted-foreground font-medium text-xs">
                  Status
                </Label>
                <Select
                  value={watchedStatus}
                  onValueChange={(value) =>
                    setValue("status", value as TaskDTO["status"])
                  }
                >
                  <SelectTrigger className="w-37.5 h-8 text-xs font-medium border-border/50 bg-background/50 shadow-none focus:ring-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent align="end" className="text-xs">
                    <SelectItem value="PENDING">
                      <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400">
                        <Circle className="size-3" /> Pending
                      </span>
                    </SelectItem>
                    <SelectItem value="COMPLETED">
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3" /> Completed
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3">
                <Label className="text-muted-foreground font-medium text-xs">
                  Priority
                </Label>
                <Select
                  value={watchedColor}
                  onValueChange={(value) =>
                    setValue("color", value as TaskDTO["color"])
                  }
                >
                  <SelectTrigger className="w-37.5 h-8 text-xs font-medium border-border/50 bg-background/50 shadow-none focus:ring-1">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent align="end" className="text-xs">
                    {Object.entries(priorityConfig).map(([key, cfg]) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2">
                          <span
                            className={`size-1.5 rounded-full ${cfg.dot}`}
                          />
                          {cfg.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3">
                <Label
                  htmlFor="deadline"
                  className="text-muted-foreground font-medium text-xs flex items-center gap-1"
                >
                  <CalendarDays className="size-3 text-muted-foreground/60" />{" "}
                  Due Date
                </Label>
                <div className="relative w-45">
                  <Input
                    value={watchedDeadline}
                    id="deadline"
                    type="datetime-local"
                    required={true}
                    className="h-8 text-xs font-medium border-border/50 bg-background/50 pr-2 shadow-none focus-visible:ring-1"
                    onChange={(e) =>
                      setValue("deadline", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2.5 pt-1">
              <Label className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase flex items-center gap-1.5">
                <Tag className="size-3" /> Tags
              </Label>
              <TagInput
                items={watchedTags}
                addItem={handleAddTag}
                removeItem={handleRemoveTag}
                placeholder="Add a tag and press Enter"
                className="w-full rounded-lg"
              />
              {errors.tags && (
                <p className="text-xs text-rose-500">{errors.tags.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t border-border/40 bg-muted/10 shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createTask.isPending}
              className="text-xs font-medium px-4 text-white shadow-sm"
            >
              {createTask.isPending ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTaskModal;
