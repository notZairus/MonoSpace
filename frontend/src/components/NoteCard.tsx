import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useTags } from "../hooks/tags/useTags";
import AddNoteModal from "./AddNoteModal";
import { useState } from "react";
import { useNotes } from "../hooks/notes/useNotes";
import type { Note } from "../schemas/note.schema";
import { cn } from "../lib/utils";
import NoteItem from "./NoteItem";
import type { Tag } from "../schemas/tags.schema";
import { Skeleton } from "./ui/skeleton";

function NoteCard() {
  const { data: tags, isLoading } = useTags();
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const { data: notes } = useNotes();
  const [selectedTag, setSelectedTag] = useState<string>("all");

  if (isLoading) {
    return (
      <Card className="bg-card h-full">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>
              <Skeleton className="h-6 w-32" />
            </CardTitle>
            <Skeleton className="h-8 w-8" />
          </div>
        </CardHeader>
        <CardContent className="w-full h-full flex items-center justify-center">
          <Skeleton className="h-full w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <AddNoteModal open={showAddNoteModal} setOpen={setShowAddNoteModal} />

      <Card className="w-full h-full">
        <CardHeader className="flex justify-between ">
          <CardTitle>NOTES</CardTitle>
          <Button size="icon-sm" onClick={() => setShowAddNoteModal(true)}>
            +
          </Button>
        </CardHeader>
        <CardContent className="h-full pr-2 flex flex-col sm:flex-row gap-4">
          <div className="w-fulll sm:w-40 sm:border-r ">
            <p>Tags: </p>
            <ScrollArea className="mt-2 pr-2 w-full h-[calc(100dvh-485px)] rounded-md">
              <ScrollBar />
              <div className="space-y-1 w-full">
                <Button
                  variant="outline"
                  className={cn(
                    "py-2 px-4 rounded-full bg-white border w-full cursor-pointer hover:bg-sidebar-accent hover:text-black",
                    {
                      "bg-primary font-semibold text-white hover:bg-primary hover:text-white":
                        selectedTag === "all",
                    },
                  )}
                  onClick={() => setSelectedTag("all")}
                >
                  All
                </Button>
                {tags &&
                  tags
                    ?.filter((t) => t?.notes?.length > 0)
                    .map((tag) => (
                      <Button
                        key={tag.id}
                        variant="outline"
                        className={cn(
                          "py-2 px-4 rounded-full bg-white border w-full cursor-pointer hover:bg-sidebar-accent hover:text-black",
                          {
                            "bg-primary font-semibold text-white hover:bg-primary hover:text-white":
                              selectedTag === tag.name,
                          },
                        )}
                        onClick={() => setSelectedTag(tag.name)}
                      >
                        {tag.name}
                      </Button>
                    ))}
              </div>
            </ScrollArea>
          </div>

          <div className="w-full sm:w-40 flex-1">
            <p>Notes: </p>
            <ScrollArea className="mt-2 w-full h-40 sm:h-[calc(100dvh-503px)]  rounded-md">
              <ScrollBar />
              <div className=" w-full flex items-start flex-wrap gap-1">
                {notes && notes.length === 0 && (
                  <p className="w-full text-muted-foreground text-center text-sm mt-4">
                    No notes found.
                  </p>
                )}

                {selectedTag === "all" &&
                  notes?.map((note: Note) => (
                    <NoteItem key={note.id} note={note} />
                  ))}
                {selectedTag !== "all" &&
                  notes
                    ?.filter((n: Note) =>
                      n.tags.some((t: Tag) => t.name === selectedTag),
                    )
                    .map((note: Note) => (
                      <NoteItem key={note.id} note={note} />
                    ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default NoteCard;
