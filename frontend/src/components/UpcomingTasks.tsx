import { Card, CardContent, CardHeading, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { type Task } from "@studybase/shared";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import TaskItem from "./TaskItem";
import { getUpcomingTasks } from "../lib/utils";
import { useTasks } from "../hooks/useTasks";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

function UpcomingTasks() {
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const { data: tasks } = useTasks();

  if (!tasks) {
    return <div>Loading...</div>;
  }

  const allTasks = tasks.sort(
    (a, b) =>
      new Date(a.deadline as string).getTime() -
      new Date(b.deadline as string).getTime(),
  );

  const uncompletedTasks = tasks.filter((task) => task.status !== "COMPLETED");
  const upcomingTasks: Task[] = getUpcomingTasks(uncompletedTasks);

  return (
    <>
      <AddTaskModal
        open={showAddTaskModal}
        setShowAddTaskModal={setShowAddTaskModal}
      />

      <Tabs defaultValue="all" className="w-full">
        <Card className="w-full max-h-120">
          <div className="flex items-center justify-between">
            <CardTitle>Tasks</CardTitle>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center justify-between">
            <TabsContent value="upcoming">
              <CardHeading className="text-xl">Upcoming Tasks</CardHeading>
            </TabsContent>
            <TabsContent value="all">
              <CardHeading className="text-xl">All Tasks</CardHeading>
            </TabsContent>
            <Button
              size="icon-sm"
              className="text-white"
              onClick={() => setShowAddTaskModal(true)}
            >
              +
            </Button>
          </div>
          <CardContent className="flex flex-col gap-2 px-0">
            <ScrollArea className="max-h-73 h-73 w-full pr-3">
              <ScrollBar className="text-primary" />
              <TabsContent value="upcoming">
                <div className="space-y-2">
                  {upcomingTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="all">
                <div className="space-y-2">
                  {allTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              </TabsContent>
            </ScrollArea>
          </CardContent>
        </Card>
      </Tabs>
    </>
  );
}

export default UpcomingTasks;
