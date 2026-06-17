import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createTagSchema, type TagDTO } from "../schemas/tags.schema";
import { useCreateTag } from "../hooks/tags/useCreateTag";

function AddTagModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: "",
    },
  });
  const createTag = useCreateTag();

  const onSubmit = (tag: TagDTO) => {
    createTag.mutate(tag);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} modal={false}>
      <DialogContent className="sm:max-w-sm p-0 overflow-hidden rounded-2xl border bg-background shadow-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col max-h-[85vh]"
        >
          <DialogHeader className="px-6 pt-5 pb-3 border-b border-border/40 bg-muted/20">
            <DialogTitle className="text-lg tracking-tight text-foreground/90">
              Create New Tag
            </DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto p-6 space-y-5 flex-1">
            <div className="space-y-1">
              <Input
                id="name"
                placeholder="Tag name..."
                className="border-0 px-4 text-lg font-semibold tracking-tight focus-visible:ring-0 placeholder:text-muted-foreground/50 text-foreground"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs font-medium text-rose-500 flex items-center gap-1">
                  <AlertCircle className="size-3" /> {errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 px-6 py-4 border-t border-border/40 bg-muted/10 shrink-0">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createTag.isPending}
              className="text-xs font-medium px-4 text-white shadow-sm"
            >
              {createTag.isPending ? "Creating..." : "Create Tag"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddTagModal;
