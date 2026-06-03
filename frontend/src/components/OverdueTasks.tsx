import { Card, CardContent, CardHeading, CardTitle } from "./ui/card";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import TaskItem from "./TaskItem";
import { useTasks } from "../hooks/useTasks";

function OverdueTasks() {
  const { data: tasks } = useTasks("overdue");

  if (!tasks) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card className="w-full max-h-120">
        <div className="flex items-center justify-between">
          <CardTitle>Overdues</CardTitle>
        </div>
        <div className="flex items-center justify-between">
          <CardHeading className="text-xl">Overdue Tasks</CardHeading>
        </div>
        <CardContent className="flex flex-col gap-2 px-0">
          <ScrollArea className="max-h-73 h-73 w-full pr-3">
            <ScrollBar className="text-primary" />
            <div className="space-y-2">
              {tasks
                .sort(
                  (a, b) =>
                    new Date(b.deadline).getTime() -
                    new Date(a.deadline).getTime(),
                )
                .map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </>
  );
}

export default OverdueTasks;
