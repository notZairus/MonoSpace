import { Card, CardContent, CardHeading, CardTitle } from "./ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { useSubjects } from "../hooks/useSubjects";
import { TrashIcon } from "lucide-react";
import SubjectShowcase from "./SubjectShowcase";
import { useState } from "react";
import type { Subject } from "../schemas/subject.schema";
import { Button } from "./ui/button";
import AddSubjectModal from "./AddSubjectModal";

const Subjects = () => {
  const { data: subjects } = useSubjects();
  const [openSubjectShowcase, setOpenSubjectShowcase] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [openAddSubjectModal, setOpenAddSubjectModal] = useState(false);

  if (!subjects) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {selectedSubject && (
        <SubjectShowcase
          open={openSubjectShowcase}
          setOpen={setOpenSubjectShowcase}
          subjectId={selectedSubject?.id}
        />
      )}

      <AddSubjectModal
        open={openAddSubjectModal}
        setOpen={setOpenAddSubjectModal}
      />

      <Card className="w-full max-h-108">
        <CardTitle>Subjects</CardTitle>
        <div className="flex items-center justify-between">
          <CardHeading className="text-xl">All Subjects</CardHeading>
          <Button
            size="icon-sm"
            className="text-white"
            onClick={() => setOpenAddSubjectModal(true)}
          >
            +
          </Button>
        </div>
        <CardContent className="w-full p-0">
          <div className="flex flex-wrap w-full gap-2">
            {subjects.map((subject) => (
              <ContextMenu key={subject.id}>
                <ContextMenuTrigger asChild>
                  <div
                    key={subject.id}
                    onClick={() => {
                      setSelectedSubject(subject);
                      setOpenSubjectShowcase(true);
                    }}
                    className="text-sm text-foreground/80 font border border-black/20 rounded-lg px-4 py-2"
                  >
                    {subject.name}
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem variant="destructive">
                    <TrashIcon />
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Subjects;
