import type { Subject } from "../schemas/subject.schema";
import SubjectShowcase from "./SubjectShowcase";
import { useState } from "react";

function SubjectItem({ subject }: { subject: Subject }) {
  const [openSubjectShowcase, setOpenSubjectShowcase] =
    useState<boolean>(false);

  return (
    <>
      <SubjectShowcase
        subjectId={subject.id}
        open={openSubjectShowcase}
        setOpen={setOpenSubjectShowcase}
      />

      <span
        className="rounded-full py-2 px-4 border cursor-pointer"
        onClick={() => setOpenSubjectShowcase(true)}
      >
        {subject.name}
      </span>
    </>
  );
}

export default SubjectItem;
