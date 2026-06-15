import { useState } from "react";
import type { Note } from "../schemas/note.schema";
import NoteShowcase from "./NoteShowcase";
import { FileText } from "lucide-react";
import type { Tag } from "../schemas/tags.schema";

const NoteItem = ({ note }: { note: Note }) => {
  const [openNote, setOpenNote] = useState(false);

  return (
    <>
      <div
        className="group flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-muted/40 transition-colors duration-150 w-full rounded-xl"
        onClick={() => setOpenNote(true)}
      >
        {/* Icon */}
        <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-muted/60 text-muted-foreground/70 group-hover:text-foreground/80 transition-colors">
          <FileText className="size-3.5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground leading-snug truncate">
            {note.title}
          </p>

          {note.content && (
            <p className="text-[11px] text-muted-foreground/70 leading-relaxed line-clamp-1 mt-0.5">
              {note.content}
            </p>
          )}

          {note.tags && note.tags.length > 0 && (
            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
              {note.tags.map((tag: Tag) => (
                <span
                  key={tag.name}
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground/80 border border-border/40"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Hover arrow */}
        <span className="self-center text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors shrink-0 text-xs">
          →
        </span>
      </div>

      <NoteShowcase open={openNote} setOpen={setOpenNote} note={note} />
    </>
  );
};

export default NoteItem;
