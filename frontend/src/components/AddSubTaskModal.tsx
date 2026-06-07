import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AlertCircle, CheckCircle2, Circle } from "lucide-react";
import {
  createSubTaskSchema,
  type SubtaskDTO,
} from "../schemas/subtask.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSubtask } from "../hooks/useCreateSubtask";

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

function AddSubTaskModal({
  open,
  setOpen,
  parentId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  parentId: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(createSubTaskSchema),
    defaultValues: {
      parentId: parentId,
      name: "",
      description: "",
      status: "PENDING",
      color: "red",
    },
  });

  const createSubTask = useCreateSubtask();

  const watchedStatus = watch("status");
  const watchedColor = watch("color");

  const onSubmit = (subtask: SubtaskDTO) => {
    createSubTask.mutate(subtask);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl border bg-background shadow-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <DialogHeader className="px-6 pt-5 pb-3 border-b border-border/40 bg-muted/20">
            <DialogTitle className="text-md font-semibold tracking-tight text-foreground/90">
              Create New Subtask
            </DialogTitle>
          </DialogHeader>

          {/* Form Body Context */}
          <div className="overflow-y-auto p-6 space-y-5 flex-1">
            {/* Title Input (Frameless Document Style) */}
            <div className="space-y-1">
              <Input
                id="name"
                autoFocus
                placeholder="Task title..."
                className="border-0 px-4 text-lg font-semibold tracking-tight focus-visible:ring-0 placeholder:text-muted-foreground/50 text-foreground"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                  <AlertCircle className="size-3" /> {errors.name.message}
                </p>
              )}
            </div>

            {/* Description Area */}
            <div className="space-y-1">
              <Textarea
                id="description"
                placeholder="Add description or notes..."
                className="min-h-17.5 resize-none border-0 px-4 text-sm focus-visible:ring-0 placeholder:text-muted-foreground/50 text-muted-foreground/90 leading-relaxed"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                  <AlertCircle className="size-3" />{" "}
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Unified Metadata Shelf Attributes Block */}
            <div className="rounded-xl border border-border/60 bg-card/40 divide-y divide-border/40 text-sm overflow-hidden">
              {/* Status Selector */}
              <div className="flex items-center justify-between p-3">
                <Label className="text-muted-foreground font-medium text-xs">
                  Status
                </Label>
                <Select
                  value={watchedStatus}
                  onValueChange={(value) =>
                    setValue("status", value as SubtaskDTO["status"])
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

              {/* Priority Dropdown */}
              <div className="flex items-center justify-between p-3">
                <Label className="text-muted-foreground font-medium text-xs">
                  Priority
                </Label>
                <Select
                  value={watchedColor}
                  onValueChange={(value) =>
                    setValue("color", value as SubtaskDTO["color"])
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
            </div>
          </div>

          {/* Sticky Lower Control Bar */}
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
              disabled={createSubTask.isPending}
              className="text-xs font-medium px-4 text-white shadow-sm"
            >
              {createSubTask.isPending ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddSubTaskModal;
