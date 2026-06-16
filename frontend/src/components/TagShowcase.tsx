import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Trash2, ListTodo, Plus, FileText } from "lucide-react";
import type { TagDTO, Tag } from "../schemas/tags.schema";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import type { Task } from "../schemas/task.schema";
import type { Note } from "../schemas/note.schema";
import { useDebouncedCallback } from "use-debounce";
import { useUpdateTag } from "../hooks/tags/useUpdateTag";
import { useDeleteTag } from "../hooks/tags/useDeleteTag";
import TaskItemLong from "./TaskItemLong";
import NoteItem from "./NoteItem";
import AddTaskModal from "./AddTaskModal";
import AddNoteModal from "./AddNoteModal";

interface TagShowcaseProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  tag: Tag;
}

const TagShowcase = ({ open = false, setOpen, tag }: TagShowcaseProps) => {
  const [tagCopy, setTagCopy] = useState<Tag | null>(tag);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
  const [openAddNoteModal, setOpenAddNoteModal] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const updateTag = useUpdateTag();
  const deleteTag = useDeleteTag();

  const debouncedHandleUpdate = useDebouncedCallback(
    (tagId: string, updatedFields: Partial<TagDTO>) => {
      updateTag.mutate({
        id: tagId,
        field: updatedFields,
      });
    },
    300,
  );

  if (!tag || !tagCopy) {
    return (
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>Loading...</DialogContent>
      </Dialog>
    );
  }

  const handleDeleteTag = () => {
    deleteTag.mutate(tag.id);
    setOpenConfirmDelete(false);
    setOpen(false);
  };

  return (
    <>
      <AddTaskModal open={openAddTaskModal} setOpen={setOpenAddTaskModal} />
      <AddNoteModal open={openAddNoteModal} setOpen={setOpenAddNoteModal} />

      <Dialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
        <DialogContent className="sm:max-w-md p-6 rounded-2xl border bg-background shadow-xl">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Delete Tag
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">"{tag.name}"</span>?
            This action cannot be undone and might affect tasks associated with
            this tag.
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
              onClick={handleDeleteTag}
              className="rounded-xl"
            >
              Delete Tag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogContent
          className="sm:max-w-xl p-0 overflow-hidden gap-0 rounded-2xl border bg-background shadow-xl animate-in fade-in-50 duration-200"
          showCloseButton={false}
        >
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-3.5 justify-between">
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="flex-1">
                  <DialogTitle className="sr-only">{tagCopy.name}</DialogTitle>
                  <button className="opacity-0" aria-hidden="true" />
                  <input
                    type="text"
                    value={tagCopy.name}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setTagCopy({
                        ...tagCopy,
                        name: newValue,
                      });
                      debouncedHandleUpdate(tagCopy.id, { name: newValue });
                    }}
                    placeholder="Tag name..."
                    className="w-full bg-transparent border-0 p-0 text-xl tracking-tight leading-snug focus:outline-none focus:ring-0 font-heading placeholder:text-muted-foreground/40 transition-colors text-foreground"
                  />
                </div>
              </div>

              <button
                onClick={() => setOpenConfirmDelete(true)}
                className="p-1.5 my-1 rounded-lg text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 transition-all focus:outline-none active:scale-95 shrink-0"
                title="Delete subject"
              >
                <Trash2 className="size-4.5" />
              </button>
            </div>

            {/* Tasks Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <ListTodo className="size-3.5 text-muted-foreground/80" />
                  <h4 className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                    Associated Tasks
                  </h4>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground/90 border border-border/40">
                    {
                      tag.tasks.filter((t: Task) => t.status === "COMPLETED")
                        .length
                    }{" "}
                    of {tag.tasks.length} completed
                  </span>
                </div>

                <button
                  className="text-[11px] font-medium text-muted-foreground/60 hover:text-foreground flex items-center gap-1 transition-colors group px-1 py-0.5 rounded"
                  onClick={() => setOpenAddTaskModal(true)}
                >
                  <Plus className="size-3 group-hover:scale-110 transition-transform" />
                  Add
                </button>
              </div>

              <div>
                <ScrollArea className="h-44 rounded-xl border border-border/50 bg-card/30">
                  <ScrollBar />
                  <div className="divide-y divide-border/30 overflow-hidden">
                    {tag.tasks &&
                      tag.tasks.map((task: Task) => (
                        <TaskItemLong key={task.id} task={task} />
                      ))}

                    {tag.tasks?.length === 0 && (
                      <div className="p-4 w-full text-center text-muted-foreground/70 italic text-sm">
                        No tasks assigned to this tag yet.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <FileText className="size-3.5 text-muted-foreground/80" />
                  <h4 className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
                    Associated Notes
                  </h4>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground/90 border border-border/40">
                    {tag.notes.length}{" "}
                    {tag.notes.length === 1 ? "note" : "notes"}
                  </span>
                </div>
                <div>
                  <button
                    className="text-[11px] font-medium text-muted-foreground/60 hover:text-foreground flex items-center gap-1 transition-colors group px-1 py-0.5 rounded"
                    onClick={() => setOpenAddNoteModal(true)}
                  >
                    <Plus className="size-3 group-hover:scale-110 transition-transform" />
                    Add
                  </button>
                </div>
              </div>

              <div>
                <ScrollArea className="h-44 rounded-xl border border-border/50 bg-card/30">
                  <ScrollBar />
                  <div className="divide-y divide-border/30 overflow-hidden">
                    {tag.notes &&
                      tag.notes.map((note: Note) => (
                        <NoteItem key={note.id} note={note} />
                      ))}

                    {tag.notes?.length === 0 && (
                      <div className="p-4 w-full text-center text-muted-foreground/70 italic text-sm">
                        No notes assigned to this tag yet.
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

export default TagShowcase;
