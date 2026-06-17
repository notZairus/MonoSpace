import { useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  handleKeyDown,
  shortcuts,
  TextAreaCommandOrchestrator,
  getCommands,
} from "@uiw/react-md-editor";
import MDEditor from "@uiw/react-md-editor";
import FileInput from "./FileInput";
import { useForm } from "react-hook-form";
import { AlertCircle, Tag, FileText } from "lucide-react";
import type { NoteDTO } from "../schemas/note.schema";
import { createNoteSchema } from "../schemas/note.schema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useDocumentTextExtraction } from "../hooks/notes/useDocumentTextExtraction";
import { useCreateNote } from "../hooks/notes/useCreateNote";
import TagInput from "./TagInput";

function AddNoteModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const orchestratorRef = useRef<TextAreaCommandOrchestrator>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<NoteDTO>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: "",
      tags: [],
      content: "",
    },
  });
  const documentExtraction = useDocumentTextExtraction();
  const createNote = useCreateNote();

  const title = watch("title");
  const tags = watch("tags");
  const content = watch("content");

  useEffect(() => {
    if (textareaRef.current) {
      orchestratorRef.current = new TextAreaCommandOrchestrator(
        textareaRef.current,
      );
    }
  }, []);

  function handleAddSubject(tag: string) {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags?.includes(trimmedTag)) {
      setValue("tags", [...(tags as string[]), trimmedTag]);
    }
  }

  function handleRemoveSubject(tag: string) {
    setValue(
      "tags",
      tags?.filter((t) => t !== tag),
      { shouldValidate: true },
    );
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleKeyDown(e, 2, false);
    if (orchestratorRef.current) {
      shortcuts(e, getCommands(), orchestratorRef.current);
    }
  };

  function onSubmit(data: NoteDTO) {
    createNote.mutate(data);
    reset();
    setOpen(false);
  }

  async function handleExtractTextFromDocument(file: File) {
    const data = await documentExtraction.mutateAsync(file);
    setValue("title", data.title);
    setValue("content", data.content);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-4xl p-0 rounded-2xl overflow-auto border bg-background shadow-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-h-[90dvh] sm:max-h-[85vh]"
        >
          <DialogHeader className="px-6 pt-5 pb-3 border-b border-border/40 bg-muted/20 shrink-0">
            <DialogTitle className="text-lg tracking-tight text-foreground/90">
              Create New Note
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col sm:flex-row flex-1 overflow-hidden min-h-0">
            <div className="sm:w-56 sm:min-w-56 shrink-0 flex flex-col overflow-y-auto border-b sm:border-b-0 sm:border-r border-border/40 bg-muted/10">
              <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase flex items-center gap-1.5">
                    <FileText className="size-3" /> Import Document
                  </Label>
                  {documentExtraction.isPending ? (
                    <div className="rounded-xl border border-border/60 bg-card/40 px-3 py-3 text-xs text-primary text-center">
                      Extracting…
                    </div>
                  ) : (
                    <div className="rounded-xl border border-border/60 bg-card/40 overflow-hidden p-3">
                      <Label className="text-muted-foreground font-medium text-xs">
                        Text Extraction from PDF, DOC, PPT up to 10MB
                      </Label>
                      <FileInput onFileSelect={handleExtractTextFromDocument} />
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-border/60 bg-card/40 divide-y divide-border/40 text-sm overflow-hidden">
                  <div className="p-3 space-y-1.5">
                    <Label className="text-muted-foreground font-medium text-xs">
                      Note Title
                    </Label>
                    <Input
                      value={title}
                      {...register("title")}
                      placeholder="Arithmetic Sequences…"
                      className="h-8 text-xs font-medium border-border/50 bg-background/50 shadow-none focus-visible:ring-1"
                    />
                    {errors.title && (
                      <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                        <AlertCircle className="size-3" />
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label className="text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase flex items-center gap-1.5">
                    <Tag className="size-3" /> Tags
                  </Label>
                  <TagInput
                    items={tags as string[]}
                    addItem={handleAddSubject}
                    removeItem={handleRemoveSubject}
                    className="w-full"
                  />

                  {errors.tags && (
                    <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                      <AlertCircle className="size-3" />
                      {errors.tags.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
              <div className="flex-1 flex flex-col min-h-[200px] sm:min-h-0 border-b sm:border-b-0 sm:border-r border-border/40">
                <div className="px-3 py-2 border-b border-border/30 bg-muted/10 shrink-0">
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground/50 uppercase">
                    Editor
                  </span>
                </div>
                <textarea
                  ref={textareaRef}
                  onChange={(e) => setValue("content", e.target.value)}
                  value={content}
                  onKeyDown={onKeyDown}
                  placeholder="Start writing your note in Markdown…"
                  className="flex-1 w-full p-4 text-sm leading-relaxed break-words outline-none resize-none bg-background text-foreground placeholder:text-muted-foreground/40"
                />
              </div>

              <div
                className="hidden sm:flex flex-col flex-1 min-h-0 overflow-hidden"
                data-color-mode="light"
              >
                <div className="px-3 py-2 border-b border-border/30 bg-muted/10 shrink-0">
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground/50 uppercase">
                    Preview
                  </span>
                </div>
                <div className="flex-1 overflow-auto">
                  <MDEditor.Markdown
                    source={content}
                    className="h-full p-4 whitespace-pre-wrap text-sm"
                  />
                </div>
              </div>
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
              disabled={createNote.isPending}
              className="text-xs font-medium px-4 text-white shadow-sm"
            >
              {createNote.isPending ? "Saving…" : "Add Note"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNoteModal;
