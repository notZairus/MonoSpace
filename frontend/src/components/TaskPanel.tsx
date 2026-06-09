import { Card, CardContent, CardHeading, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import { type Task } from "../schemas/task.schema";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import TaskItem from "./TaskItem";
import { getUpcomingTasks } from "../lib/utils";
import { useTasks } from "../hooks/useTasks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

function TaskPanel() {
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false);
  const { data: tasks } = useTasks();
  const { data: overdueTasks } = useTasks("overdue");
  const { data: completedTasks } = useTasks("completed");

  if (!tasks || !overdueTasks || !completedTasks) {
    return <div>Loading...</div>;
  }
  const uncompletedTasks = tasks.filter((task) => task.status !== "COMPLETED");
  const upcomingTasks: Task[] = getUpcomingTasks(uncompletedTasks);

  return (
    <>
      <AddTaskModal
        open={showAddTaskModal}
        setShowAddTaskModal={setShowAddTaskModal}
      />

      <Tabs defaultValue="upcoming" className="w-full">
        <Card className="w-full max-h-120">
          <div className="flex items-center justify-between">
            <CardTitle>Tasks</CardTitle>
            <TabsList className="mt-1 ">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center justify-between">
            <TabsContent value="upcoming">
              <CardHeading className="text-xl">Upcoming Tasks</CardHeading>
            </TabsContent>
            <TabsContent value="overdue">
              <CardHeading className="text-xl">Overdue Tasks</CardHeading>
            </TabsContent>
            <TabsContent value="completed">
              <CardHeading className="text-xl">Completed Tasks</CardHeading>
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
              <TabsContent value="overdue">
                <div className="space-y-2">
                  {overdueTasks.map((task) => (
                    <TaskItem key={task.id} task={task} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="completed">
                <div className="space-y-2">
                  {completedTasks.map((task) => (
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

export default TaskPanel;
