import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useSubjects } from "../hooks/useSubjects";
import { Button } from "./ui/button";
import { useState } from "react";
import AddSubjectModal from "./AddSubjectModal";
import SubjectItem from "./SubjectItem";
import type { Subject } from "../schemas/subject.schema";

function SubjectCard() {
  const [openAddSubjectModal, setOpenAddSubjectModal] =
    useState<boolean>(false);

  return (
    <>
      <AddSubjectModal
        open={openAddSubjectModal}
        setOpen={setOpenAddSubjectModal}
      />
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>SUBJECTS</CardTitle>
            <Button size="icon-sm" onClick={() => setOpenAddSubjectModal(true)}>
              +
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-40 sm:h-[calc(100dvh-30rem)] rounded-lg">
            <ScrollBar />
            <div className="space-y-2 flex flex-wrap items-start gap-x-2">
              {useSubjects().data?.length === 0 && (
                <p className="text-muted-foreground text-center">
                  No subjects found!
                </p>
              )}
              {useSubjects().data?.map((subject: Subject) => (
                <SubjectItem subject={subject} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}

export default SubjectCard;
