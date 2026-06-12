import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { useSubjects } from "../hooks/useSubjects";
import AddNoteModal from "./AddNoteModal";
import { useState } from "react";
import { useNotes } from "../hooks/useNotes";
import type { Note } from "../schemas/note.schema";
import { cn } from "../lib/utils";

function NoteCard() {
  const { data: subjects } = useSubjects();
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const { data: notes } = useNotes();
  const [selectedSubject, setSelectedSubject] = useState<string>("all");

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
        <CardContent className="h-full pr-2 flex gap-4">
          <div className="w-40 border-r">
            <p>Subjects: </p>
            <ScrollArea className="mt-2 pr-2 w-full h-[calc(100dvh-503px)] rounded-md">
              <ScrollBar />
              <div className="space-y-1 w-full">
                <Button
                  variant="outline"
                  className={cn(
                    "py-2 px-4 rounded-full bg-white border w-full cursor-pointer hover:bg-sidebar-accent hover:text-black",
                    {
                      "bg-primary font-semibold text-white hover:bg-primary hover:text-white":
                        selectedSubject === "all",
                    },
                  )}
                  onClick={() => setSelectedSubject("all")}
                >
                  All
                </Button>
                {subjects?.map((subject) => (
                  <Button
                    key={subject.id}
                    variant="outline"
                    className={cn(
                      "py-2 px-4 rounded-full bg-white border w-full cursor-pointer hover:bg-sidebar-accent hover:text-black",
                      {
                        "bg-primary font-semibold text-white hover:bg-primary hover:text-white":
                          selectedSubject === subject.name,
                      },
                    )}
                    onClick={() => setSelectedSubject(subject.name)}
                  >
                    {subject.name}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="w-40 flex-1">
            <p>Notes: </p>
            <ScrollArea className="mt-2 w-full h-[calc(100dvh-503px)]  rounded-md">
              <ScrollBar />
              <div className=" w-full flex items-start flex-wrap gap-1">
                {selectedSubject === "all" &&
                  notes?.map((note: Note) => (
                    <div
                      key={note.id}
                      className="bg-white border rounded-full px-4 py-2 max-w-48"
                    >
                      <p>{note.title}</p>
                      <p className="text-[12px] text-muted-foreground">
                        {note.subjects
                          ?.map((subject) => subject.name)
                          .join(", ")}
                      </p>
                    </div>
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
