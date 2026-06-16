import { useTasks } from "../hooks/tasks/useTasks";
import type { Task } from "../schemas/task.schema";
import { getUpcomingTasks } from "../lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Button } from "./ui/button";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";
import TaskItem from "./TaskItem";
import { Skeleton } from "./ui/skeleton";

type TabsValue = "all" | "today" | "upcoming" | "overdue" | "completed";

function TaskCard() {
  const [activeTab, setActiveTab] = useState<TabsValue>("all");
  const { data: AllTasks, isLoading: allTasksLoading } = useTasks("all");
  const { data: overdueTasks, isLoading: overdueTasksLoading } =
    useTasks("overdue");
  const { data: completedTasks, isLoading: completedTasksLoading } =
    useTasks("completed");
  const [openAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);

  const todayTasks = AllTasks?.filter((task) => {
    const today = new Date();
    const taskDate = new Date(task.deadline as string);
    return (
      taskDate.getFullYear() === today.getFullYear() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getDate() === today.getDate()
    );
  });

  const upcomingTasks: Task[] = getUpcomingTasks(AllTasks || []);

  const taskToRender = {
    all: AllTasks?.sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    ),
    today: todayTasks?.sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    ),
    upcoming: upcomingTasks?.sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    ),
    overdue: overdueTasks?.sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    ),
    completed: completedTasks?.sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
    ),
  };

  if (allTasksLoading || overdueTasksLoading || completedTasksLoading) {
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
      <AddTaskModal open={openAddTaskModal} setOpen={setOpenAddTaskModal} />

      <Tabs
        defaultValue={activeTab}
        className="h-full"
        onValueChange={(value) => setActiveTab(value as TabsValue)}
      >
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
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="overdue">Overdue</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <CardContent className="w-full h-full">
            <ScrollArea className="w-full h-80 sm:h-[calc(100dvh-16rem)] rounded-lg">
              <ScrollBar />

              <div className="space-y-1 ">
                {taskToRender[activeTab] &&
                taskToRender[activeTab].length > 0 ? (
                  taskToRender[activeTab]?.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))
                ) : (
                  <div className="flex items-center justify-center ">
                    <p className="text-muted-foreground text-sm">
                      No tasks found on {activeTab.toUpperCase()}.
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </Tabs>
    </>
  );
}

export default TaskCard;
