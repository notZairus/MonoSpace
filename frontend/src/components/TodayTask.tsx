import { useTasks } from "../hooks/useTasks";
import TaskItem from "./TaskItem";
import { Card, CardTitle, CardHeading, CardContent } from "./ui/card";
import { ScrollBar, ScrollArea } from "./ui/scroll-area";

function TodayTask() {
  const { data: tasks } = useTasks();

  const todayTasks = tasks
    ? tasks.filter((task) => {
        const today = new Date();
        const taskDate = new Date(task.deadline as string);
        return (
          taskDate.getFullYear() === today.getFullYear() &&
          taskDate.getMonth() === today.getMonth() &&
          taskDate.getDate() === today.getDate()
        );
      })
    : [];

  console.log(todayTasks);

  return (
    <Card className="w-full max-h-108 bg-primary text-white shadow-lg">
      <CardTitle>Today</CardTitle>
      <div className="flex items-center justify-between">
        <CardHeading className="text-xl">Today's Tasks</CardHeading>
      </div>
      <CardContent className="flex flex-col gap-2 px-0">
        <div className="flex flex-row gap-4">
          <Card className="flex-1 bg-white/10 ring-0 border-0 shadow-md p-2 sm:p-3 rounded-lg text-white/80">
            {todayTasks.length > 0 && (
              <>
                <p className="-mt-1 sm:mt-1 text-xl sm:text-3xl text-center font-heading font-semibold tracking-tight">
                  {
                    todayTasks.filter((task) => task.status === "COMPLETED")
                      .length
                  }{" "}
                  / {todayTasks.length}
                </p>
                <p className="tracking-wider sm:leading-3.5 text-center text-[10px]">
                  TODAY'S TASKS COMPLETED
                </p>
              </>
            )}
          </Card>
          <Card className="flex-1 bg-white/10 text-white/80 border-0 ring-0 shadow-md p-3 rounded-lg">
            {todayTasks.length > 0 && (
              <>
                <p className="-mt-1 sm:mt-1 text-xl sm:text-3xl text-center font-heading font-semibold tracking-tight">
                  {`${
                    (todayTasks.filter((task) => task.status === "COMPLETED")
                      .length /
                      todayTasks.length) *
                    100
                  }%`}
                </p>
                <p className="tracking-wider sm:leading-3.5 text-[10px] sm:text-[10px] text-center">
                  TODAYS WORK IS DONE
                </p>
              </>
            )}
          </Card>
          <Card className="flex-1 bg-white/10 border-0 ring-0 shadow-md p-3 rounded-lg"></Card>
        </div>
        <div className="mt-2 flex flex-col sm:flex-row gap-4">
          <ScrollArea className="max-h-48 w-full pr-4 rounded-lg">
            <ScrollBar className="bg-black/10 rounded-full" />
            <div className="space-y-2 pb-2">
              {todayTasks.length > 0 &&
                todayTasks.map((task) => (
                  <TaskItem key={task.id} task={task} variant="primary" />
                ))}
              {todayTasks.length === 0 && (
                <p className="text-center text-sm text-white/80">
                  No tasks due today!
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}

export default TodayTask;
