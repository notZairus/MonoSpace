import type { Tag } from "../schemas/tags.schema";
import TagShowcase from "./TagShowcase";
import { useState } from "react";

function TagItem({ tag }: { tag: Tag }) {
  const [openTagShowcase, setOpenTagShowcase] = useState<boolean>(false);

  return (
    <>
      <TagShowcase
        tagId={tag.id}
        open={openTagShowcase}
        setOpen={setOpenTagShowcase}
      />

      <span
        className="rounded-full py-2 px-4 border cursor-pointer"
        onClick={() => setOpenTagShowcase(true)}
      >
        {tag.name}
      </span>
    </>
  );
}

export default TagItem;
