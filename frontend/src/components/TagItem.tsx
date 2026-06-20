import type { Tag } from "../schemas/tags.schema";
import TagShowcase from "./TagShowcase";
import { useState } from "react";
import { FileText, ListTodo } from "lucide-react";
import { motion } from "motion/react";

function TagItem({ tag }: { tag: Tag }) {
  const [openTagShowcase, setOpenTagShowcase] = useState<boolean>(false);

  return (
    <>
      <TagShowcase
        tag={tag}
        open={openTagShowcase}
        setOpen={setOpenTagShowcase}
      />

      <motion.div
        onClick={() => setOpenTagShowcase(true)}
        whileHover={{
          scale: 1.02,
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
        }}
        whileTap={{ scale: 0.95, boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.0)" }}
        className="rounded-full py-2 px-4 border cursor-pointer flex items-center"
      >
        <p>{tag.name}</p>
        <div className="flex items-center gap-2 ml-2">
          <div className="flex items-center gap-1 border rounded-full px-2">
            <ListTodo className="size-3.5" />
            <p>{tag.tasks.length}</p>
          </div>
          <div className="flex items-center gap-1 border rounded-full px-2">
            <FileText className="size-3.5" />
            <p>{tag.notes.length}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default TagItem;
