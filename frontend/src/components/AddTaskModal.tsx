import { useState } from "react";
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
import {
  CalendarDays,
  Tag,
  AlertCircle,
  X,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { type TaskDTO, createTaskSchema } from "@studybase/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "../hooks/useCreateTask";

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
  setShowAddTaskModal,
}: {
  open: boolean;
  setShowAddTaskModal: (open: boolean) => void;
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
      subjects: [],
      color: "red",
      deadline: getTomorrowDefault(), // Default to tomorrow
    },
  });

  const createTask = useCreateTask();
  const [subjectInput, setSubjectInput] = useState("");

  // Directly watching hook-form state removes duplicate sync arrays
  const watchedSubjects = watch("subjects") || [];
  const watchedDeadline = watch("deadline");
  const watchedStatus = watch("status");
  const watchedColor = watch("color");

  const handleAddSubject = () => {
    const value = subjectInput.trim();
    if (!value || watchedSubjects.includes(value)) return;
    setValue("subjects", [...getValues("subjects"), value], {
      shouldValidate: true,
    });
    setSubjectInput("");
  };

  const removeSubject = (index: number) => {
    setValue(
      "subjects",
      getValues("subjects").filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  };

  const onSubmit = (data: TaskDTO) => {
    createTask.mutate(data);
    reset();
    setShowAddTaskModal(false);
  };

  return (
    <Dialog open={open} onOpenChange={setShowAddTaskModal}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden rounded-2xl border bg-background shadow-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <DialogHeader className="px-6 pt-5 pb-3 border-b border-border/40 bg-muted/20">
            <DialogTitle className="text-md font-semibold tracking-tight text-foreground/90">
              Create New Task
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

              {/* Priority Dropdown */}
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

              {/* Native Deadline Input Wrapper */}
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

            {/* Clean Tag Input Subsystem */}
            <div className="space-y-2.5 pt-1">
              <Label className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase flex items-center gap-1.5">
                <Tag className="size-3" /> Tags / Subjects
              </Label>
              <Input
                placeholder="Press Enter to attach a subject tag..."
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSubject();
                  }
                }}
                className="h-9 text-sm bg-muted/20 border-border/50 placeholder:text-muted-foreground/40 focus-visible:ring-1"
              />

              {/* Active Subject Pills Layout */}
              {watchedSubjects.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {watchedSubjects.map((subject, index) => (
                    <span
                      key={`${subject}-${index}`}
                      className="inline-flex items-center gap-1.5 rounded-md bg-secondary text-secondary-foreground px-2 py-0.5 text-xs font-medium border border-border/40 transition-all"
                    >
                      <span>{subject}</span>
                      <button
                        type="button"
                        onClick={() => removeSubject(index)}
                        className="text-muted-foreground/60 hover:text-rose-500 rounded p-0.5 focus:outline-none"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {errors.subjects && (
                <p className="text-xs text-rose-500">
                  {errors.subjects.message}
                </p>
              )}
            </div>
          </div>

          {/* Sticky Lower Control Bar */}
          <div className="flex justify-end gap-2 px-6 py-4 border-t border-border/40 bg-muted/10 shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowAddTaskModal(false)}
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
