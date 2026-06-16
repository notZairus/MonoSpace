import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTags } from "../hooks/tags/useTags";
import { Button } from "./ui/button";
import { useState } from "react";
import AddTagModal from "./AddTagModal";
import SubjectItem from "./TagItem";
import type { Tag } from "../schemas/tags.schema";
import { Skeleton } from "./ui/skeleton";
import { TagIcon } from "lucide-react";

function TagsCard() {
  const { data: tags, isLoading } = useTags();
  const [openAddTagModal, setOpenAddTagModal] = useState<boolean>(false);

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
          {tags?.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <TagIcon
                strokeWidth={1}
                className="h-16 w-16 text-muted-foreground/50 mb-2"
              />
              <p className="text-muted-foreground">No tags found.</p>
            </div>
          ) : (
            <ScrollArea className="h-40 sm:h-[calc(100dvh-28.5rem)] rounded-lg">
              <ScrollBar />
              <div className="space-y-2 flex flex-wrap items-start gap-x-2">
                {tags?.map((tag: Tag) => (
                  <SubjectItem tag={tag} />
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default TagsCard;
