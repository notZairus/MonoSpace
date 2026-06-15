import { useRef, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  handleKeyDown,
  shortcuts,
  TextAreaCommandOrchestrator,
  getCommands,
} from "@uiw/react-md-editor";
import MDEditor from "@uiw/react-md-editor";
import { Pencil, PencilOff, Tag, Trash2, X } from "lucide-react";
import type { Note, NoteDTO } from "../schemas/note.schema";
import { useUpdateNote } from "../hooks/notes/useUpdateNote";
import { useDeleteNote } from "../hooks/notes/useDeleteNote";
import { useDebouncedCallback } from "use-debounce";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import type { Tag as TagType } from "../schemas/tags.schema";
import TagInput from "./TagInput";

function NoteShowcase({
  open,
  setOpen,
  note: noteProp,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  note: Note;
}) {
  const [allowEdit, setAllowEdit] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [note, setNote] = useState<NoteDTO & { id: string; createdAt?: Date }>({
    title: noteProp.title,
    content: noteProp.content,
    tags: noteProp?.tags?.map((t: TagType) => t.name),
    id: noteProp.id,
    createdAt: noteProp.createdAt,
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const orchestratorRef = useRef<TextAreaCommandOrchestrator>(null);
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();

  const debouncedUpdateNote = useDebouncedCallback(
    (noteId: string, field: Partial<NoteDTO>) => {
      updateNote.mutate({ id: noteId, data: field });
    },
    500,
  );

  useEffect(() => {
    if (textareaRef.current) {
      orchestratorRef.current = new TextAreaCommandOrchestrator(
        textareaRef.current,
      );
    }
  }, []);

  function emitUpdate(field: Partial<NoteDTO>) {
    setNote((prev) => ({ ...prev, ...field }));
    debouncedUpdateNote(note.id, field);
  }

  function handleAddTag(newTag: string) {
    const trimmed = newTag.trim();
    if (trimmed && !note.tags?.includes(trimmed)) {
      const updated = [...(note.tags as string[]), trimmed];
      emitUpdate({ tags: updated });
    }
  }

  function handleRemoveTag(tag: string) {
    const filtered = note.tags?.filter((t) => t !== tag);
    emitUpdate({ tags: filtered });
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(e, 2, false);
    if (orchestratorRef.current) {
      shortcuts(e, getCommands(), orchestratorRef.current);
    }
  };

  function handleDeleteNote() {
    deleteNote.mutate(note.id);
    setOpenConfirmDelete(false);
    setOpen(false);
  }

  function handleClose() {
    setOpen(false);
    setAllowEdit(false);
  }

  return (
    <>
      <Dialog
        open={openConfirmDelete}
        onOpenChange={setOpenConfirmDelete}
        modal={false}
      >
        <DialogContent className="w-[90vw] sm:max-w-md p-6 rounded-2xl border bg-background shadow-xl">
          <DialogTitle className="text-lg font-semibold tracking-tight">
            Delete Note
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">"{note.title}"</span>?
            This action cannot be undone.
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
              onClick={handleDeleteNote}
              className="rounded-xl"
            >
              Delete Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={open} onOpenChange={handleClose} modal={false}>
        <DialogContent
          className="w-full max-w-[95vw] sm:max-w-4xl p-0 rounded-2xl overflow-auto border bg-background shadow-xl"
          showCloseButton={false}
        >
          <div className="flex flex-col h-[90dvh] sm:h-[85vh]">
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-border/40 bg-muted/20 shrink-0 gap-3">
              <DialogHeader className="flex-1 min-w-0 space-y-0">
                <DialogTitle className="sr-only">
                  {note.title || "Untitled Note"}
                </DialogTitle>
                <button className="absolute opacity-0"></button>
                <Textarea
                  value={note.title}
                  onChange={(e) => emitUpdate({ title: e.target.value })}
                  placeholder="Note title…"
                  rows={1}
                  className="w-full bg-transparent border-0 p-0 md:text-xl font-heading tracking-tight leading-snug focus:outline-none focus:ring-0 placeholder:text-muted-foreground/40 text-foreground resize-none outline-none ring-0 focus-visible:ring-0 rounded-none max-h-20 overflow-hidden"
                />
              </DialogHeader>
              <div className="flex items-center gap-1.5 shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setAllowEdit(!allowEdit)}
                  className="h-8 px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground gap-1.5"
                >
                  {allowEdit ? (
                    <>
                      <PencilOff className="size-3.5" />
                      <span className="hidden sm:inline">Exit Edit</span>
                    </>
                  ) : (
                    <>
                      <Pencil className="size-3.5" />
                      <span className="hidden sm:inline">Edit</span>
                    </>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10"
                  onClick={() => setOpenConfirmDelete(true)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={handleClose}
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-1 overflow-hidden min-h-0">
              <div className="sm:w-52 sm:min-w-52 shrink-0 flex flex-col overflow-y-auto border-b sm:border-b-0 sm:border-r border-border/40 bg-muted/10">
                <div className="p-4 space-y-4">
                  <div className="rounded-xl border border-border/60 bg-card/40 divide-y divide-border/40 text-sm overflow-hidden">
                    {note.createdAt && (
                      <div className="px-3 py-2.5">
                        <p className="text-[10px] font-semibold tracking-wider text-muted-foreground/60 uppercase mb-0.5">
                          Created
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(note.createdAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    )}
                    <div className="px-3 py-2.5">
                      <p className="text-[10px] font-semibold tracking-wider text-muted-foreground/60 uppercase mb-0.5">
                        Status
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {updateNote.isPending ? (
                          <span className="text-amber-500">Saving…</span>
                        ) : (
                          <span className="text-emerald-500">Saved</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Label className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase flex items-center gap-1.5">
                      <Tag className="size-3" /> Tags
                    </Label>
                    <TagInput
                      items={note.tags as string[]}
                      addItem={handleAddTag}
                      removeItem={handleRemoveTag}
                      placeholder="Add a tag and press Enter"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
                {allowEdit && (
                  <div className="flex flex-col flex-1 min-h-50 sm:min-h-0 border-b sm:border-b-0 sm:border-r border-border/40">
                    <div className="px-3 py-2 border-b border-border/30 bg-muted/10 shrink-0">
                      <span className="text-[10px] font-semibold tracking-widest text-muted-foreground/50 uppercase">
                        Editor
                      </span>
                    </div>
                    {/* <textarea // this text area is overflowing to the right when i type long sentence without spaces, need to fix it
                      ref={textareaRef}
                      value={note.content}
                      onKeyDown={onKeyDown}
                      onChange={(e) => emitUpdate({ content: e.target.value })}
                      placeholder="Start writing in Markdown…"
                      className="flex-1 w-full max-w-full p-4 text-sm leading-relaxed wrap-break-word outline-none resize-none bg-background text-foreground placeholder:text-muted-foreground/40"
                    /> */}

                    <textarea
                      ref={textareaRef}
                      value={note.content}
                      onKeyDown={onKeyDown}
                      onChange={(e) => emitUpdate({ content: e.target.value })}
                      placeholder="Start writing in Markdown…"
                      className="flex-1 w-full min-w-0 max-w-full p-4 text-sm leading-relaxed wrap-break-word overflow-x-hidden overflow-y-auto outline-none resize-none bg-background text-foreground placeholder:text-muted-foreground/40"
                    />
                  </div>
                )}

                <div
                  className="flex flex-col flex-1 min-h-50 sm:min-h-0 overflow-hidden"
                  data-color-mode="light"
                >
                  <div className="px-3 py-2 border-b border-border/30 bg-muted/10 shrink-0">
                    <span className="text-[10px] font-semibold tracking-widest text-muted-foreground/50 uppercase">
                      Preview
                    </span>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <MDEditor.Markdown
                      source={note.content}
                      className="h-full p-4 whitespace-pre-wrap text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NoteShowcase;
