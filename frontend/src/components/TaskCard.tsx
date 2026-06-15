import { useTasks } from "../hooks/tasks/useTasks";
import type { Task } from "../schemas/task.schema";
import { getUpcomingTasks } from "../lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import TaskItem from "./TaskItem";
import { Button } from "./ui/button";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";

function TaskCard() {
  const { data: tasks }: { data: Task[] | undefined } = useTasks();
  const { data: overdueTasks }: { data: Task[] | undefined } =
    useTasks("overdue");
  const { data: completedTasks }: { data: Task[] | undefined } =
    useTasks("completed");
  const [openAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);

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

  const uncompletedTasks =
    tasks?.filter((task) => task.status !== "COMPLETED") || [];
  const upcomingTasks: Task[] = getUpcomingTasks(uncompletedTasks);
  return (
    <>
      <AddTaskModal open={openAddTaskModal} setOpen={setOpenAddTaskModal} />

      <Tabs defaultValue="today" className="h-full">
        <Card className="bg-card h-full">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>TASKS</CardTitle>
              <Button size="icon-sm" onClick={() => setOpenAddTaskModal(true)}>
                +
              </Button>
            </div>
          </CardHeader>

          <TabsList className="scale-80 ml-4 origin-left">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <CardContent className="w-full h-full">
            <ScrollArea className="w-full h-80 sm:h-[calc(100dvh-16rem)] rounded-lg">
              <ScrollBar />
              <TabsContent value="today" className="space-y-2">
                {!todayTasks.length && (
                  <p className="text-muted-foreground text-center">
                    No tasks for today.
                  </p>
                )}
                {todayTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </TabsContent>

              <TabsContent value="upcoming" className="space-y-2">
                {!upcomingTasks.length && (
                  <p className="text-muted-foreground text-center">
                    No upcoming tasks.
                  </p>
                )}
                {upcomingTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </TabsContent>

              <TabsContent value="overdue" className="space-y-2">
                {!overdueTasks?.length && (
                  <p className="text-muted-foreground text-center">
                    No overdue tasks.
                  </p>
                )}
                {overdueTasks?.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-2">
                {!completedTasks?.length && (
                  <p className="text-muted-foreground text-center">
                    No completed tasks.
                  </p>
                )}
                {completedTasks?.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </TabsContent>
            </ScrollArea>
          </CardContent>
        </Card>
      </Tabs>
    </>
  );
}

export default TaskCard;
