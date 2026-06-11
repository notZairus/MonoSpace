import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash2, ListTodo } from "lucide-react";
import { type subjectDTO } from "../schemas/subject.schema";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import type { Task } from "../schemas/task.schema";
import { useDebouncedCallback } from "use-debounce";
import { useUpdateSubject } from "../hooks/useUpdateSubject";
import { useDeleteSubject } from "../hooks/useDeleteSubject";
import TaskItemLong from "./TaskItemLong";
import { useSubject } from "../hooks/useSubjects";
import { type Subject } from "../schemas/subject.schema";

interface SubjectShowcaseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  subjectId: string;
}

const SubjectShowcase = ({
  open = false,
  setOpen,
  subjectId,
}: SubjectShowcaseProps) => {
  const { data: subject } = useSubject(subjectId);
  const [subjectCopy, setSubjectCopy] = useState<Subject | null>(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const updateSubject = useUpdateSubject();
  const deleteSubject = useDeleteSubject();

  useEffect(() => {
    function syncSubject() {
      setSubjectCopy(subject as Subject);
    }
    syncSubject();
  }, [subject]);

  const debouncedHandleUpdate = useDebouncedCallback(
    (subjectId: string, updatedFields: Partial<subjectDTO>) => {
      updateSubject.mutate({
        id: subjectId,
        field: updatedFields,
      });
    },
    300,
  );

  if (!subject || !subjectCopy) {
    return (
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  const handleDeleteSubject = () => {
    deleteSubject.mutate(subject.id);
    setOpenConfirmDelete(false);
    setOpen(false);
  };

  return (
    <>
      {/* Confirmation Dialog for Deletion */}
      <Dialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
        <DialogContent className="sm:max-w-md p-6 rounded-2xl border bg-background shadow-xl">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Delete Subject
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              "{subject.name}"
            </span>
            ? This action cannot be undone and might affect tasks associated
            with this subject.
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
              onClick={handleDeleteSubject}
              className="rounded-xl"
            >
              Delete Subject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Showcase Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-xl p-0 overflow-hidden gap-0 rounded-2xl border bg-background shadow-xl animate-in fade-in-50 duration-200"
          showCloseButton={false}
        >
          <div className="p-6 space-y-6">
            {/* Main Header - Editable Input & Trash Action */}
            <div className="flex items-center gap-3.5 justify-between">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="flex-1">
                  <DialogTitle className="sr-only">
                    {subjectCopy.name}
                  </DialogTitle>
                  <button className="opacity-0" aria-hidden="true" />
                  <input
                    type="text"
                    value={subjectCopy.name}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setSubjectCopy({
                        ...subjectCopy,
                        name: newValue,
                      });
                      debouncedHandleUpdate(subjectCopy.id, { name: newValue });
                    }}
                    placeholder="Subject name..."
                    className="w-full bg-transparent border-0 p-0 text-xl font-semibold tracking-tight leading-snug focus:outline-none focus:ring-0 placeholder:text-muted-foreground/40 transition-colors text-foreground"
                  />
                </div>
              </div>

              {/* Actionable Delete Button */}
              <button
                onClick={() => setOpenConfirmDelete(true)}
                className="p-1.5 my-1 rounded-lg text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 transition-all focus:outline-none active:scale-95 shrink-0"
                title="Delete subject"
              >
                <Trash2 className="size-4.5" />
              </button>
            </div>

            {/* Tasks Section (Mirrors Subtasks Layout) */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ListTodo className="size-3.5 text-muted-foreground/80" />
                  <h4 className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                    Associated Tasks
                  </h4>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground/90 border border-border/40">
                    {
                      subject.tasks.filter(
                        (t: Task) => t.status === "COMPLETED",
                      ).length
                    }{" "}
                    of {subject.tasks.length} completed
                  </span>
                </div>
              </div>

              <div>
                <ScrollArea className="h-44 rounded-xl border border-border/50 bg-card/30">
                  <ScrollBar />
                  <div className="divide-y divide-border/30 overflow-hidden">
                    {subject.tasks &&
                      subject.tasks.map((task: Task) => (
                        <TaskItemLong key={task.id} task={task} />
                      ))}

                    {subject.tasks?.length === 0 && (
                      <div className="p-4 w-full text-center text-muted-foreground/70 italic text-sm">
                        No tasks assigned to this subject yet.
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

export default SubjectShowcase;
