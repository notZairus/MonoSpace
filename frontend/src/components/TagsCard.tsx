import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTags } from "../hooks/tags/useTags";
import { Button } from "./ui/button";
import { useState } from "react";
import AddTagModal from "./AddTagModal";
import SubjectItem from "./TagItem";
import type { Tag } from "../schemas/tags.schema";

function TagsCard() {
  const [openAddTagModal, setOpenAddTagModal] = useState<boolean>(false);

  return (
    <>
      <AddTagModal open={openAddTagModal} setOpen={setOpenAddTagModal} />

      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>TAGS</CardTitle>
            <Button size="icon-sm" onClick={() => setOpenAddTagModal(true)}>
              +
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-40 sm:h-[calc(100dvh-28.5rem)] rounded-lg">
            <ScrollBar />
            <div className="space-y-2 flex flex-wrap items-start gap-x-2">
              {useTags().data?.length === 0 && (
                <p className="text-muted-foreground text-center w-full">
                  No tags found.
                </p>
              )}
              {useTags().data?.map((tag: Tag) => (
                <SubjectItem tag={tag} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}

export default TagsCard;
