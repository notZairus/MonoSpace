import { useRef, useState, useEffect } from "react";
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
import { AlertCircle } from "lucide-react";
import type { NoteDTO } from "../schemas/note.schema";
import { createNoteSchema } from "../schemas/note.schema";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { X } from "lucide-react";
import { useDocumentTextExtraction } from "../hooks/useDocumentTextExtraction";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useCreateNote } from "../hooks/useCreateNote";

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
      subjects: [],
      content: "",
    },
  });
  const documentExtraction = useDocumentTextExtraction();
  const createNote = useCreateNote();

  const [subjectInput, setSubjectInput] = useState("");

  const title = watch("title");
  const subjects = watch("subjects");
  const content = watch("content");

  useEffect(() => {
    if (textareaRef.current) {
      orchestratorRef.current = new TextAreaCommandOrchestrator(
        textareaRef.current,
      );
    }
  }, []);

  function handleAddSubject() {
    const trimmedSubject = subjectInput.trim();
    if (trimmedSubject && !subjects.includes(trimmedSubject)) {
      setValue("subjects", [...subjects, trimmedSubject]);
      setSubjectInput("");
    }
  }

  function removeSubject(index: number) {
    setValue(
      "subjects",
      subjects.filter((_, i) => i !== index),
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
      <DialogContent className="sm:max-w-4xl p-0 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-h-[85vh]"
        >
          <div className="max-w-5xl h-[80dvh] flex gap-1">
            {/* Sidebar */}

            <div className="min-w-1/10 sm:min-w-1/6" />
            <div className="fixed bg-sidebar sm:min-w-1/6 h-full border-r shadow-r flex flex-col justify-between">
              <DialogHeader className="p-4 border-b">
                <DialogTitle>Add Note</DialogTitle>
              </DialogHeader>
              <div className="p-4 space-y-4">
                {!documentExtraction.isPending && (
                  <div className="aspect-square w-fullrounded-lg">
                    <FileInput onFileSelect={handleExtractTextFromDocument} />
                  </div>
                )}
                {documentExtraction.isPending && (
                  <div>
                    <p className="text-center text-primary">Extracting....</p>
                  </div>
                )}
                <div className="space-y-1  w-32">
                  <Label htmlFor="title">Note Title</Label>
                  <Input
                    value={title}
                    {...register("title")}
                    placeholder="Arithmetic Seq..."
                    className="w-full"
                  />
                  {errors.title && (
                    <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                      <AlertCircle className="size-3" /> {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1 w-32">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    placeholder="Mathematics"
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSubject();
                      }
                    }}
                    className="w-full"
                  />

                  {errors.subjects && (
                    <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                      <AlertCircle className="size-3" />{" "}
                      {errors.subjects.message}
                    </p>
                  )}

                  {subjects.length === 0 && !errors.subjects && (
                    <p className="text-xs text-muted-foreground/60">
                      Press Enter to add subjects
                    </p>
                  )}

                  <ScrollArea className="min-h-8">
                    <ScrollBar orientation="horizontal" />
                    {subjects.length > 0 && (
                      <div className="flex  gap-1.5 pt-1">
                        {subjects.map((subject, index) => (
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
                  </ScrollArea>
                </div>
                <div>
                  <Button className="w-full mt-4" type="submit">
                    Add Note
                  </Button>
                </div>
              </div>
            </div>

            {/* content */}
            <div className="w-full h-full max-w-[calc(100%-8rem) flex">
              <div className="flex-1 border-2">
                <textarea
                  ref={textareaRef}
                  onChange={(e) => setValue("content", e.target.value)}
                  value={content}
                  onKeyDown={onKeyDown}
                  className="w-full h-full p-5 wrap-break-word outline-none resize-none bg-white"
                />
              </div>
              <div
                className="flex-1 border-t-2  overflow-auto"
                data-color-mode="light"
              >
                <MDEditor.Markdown
                  source={content}
                  className="h-full p-5 whitespace-pre-wrap text-sm"
                />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNoteModal;
