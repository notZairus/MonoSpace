import DashboardHeader from "../components/DashboardHeader";
import OverdueTasks from "../components/OverdueTasks";
import TodayTask from "../components/TodayTask";
import {
  Card,
  CardContent,
  CardHeading,
  CardTitle,
} from "../components/ui/card";
import UpcomingTasks from "../components/UpcomingTasks";
import { useSubjects } from "../hooks/useSubjects";

function Dashboard() {
  const { data: subjects } = useSubjects();

  if (!subjects) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen w-full p-8">
      <div className="mx-auto">
        <DashboardHeader />
        <div className="flex flex-col w-full gap-8 mt-8 items-center sm:items-start sm:flex-row sm:flex-wrap">
          <div className="flex-1 w-full min-w-xs">
            <TodayTask />
          </div>
          <div className="flex-1 w-full min-w-xs">
            <UpcomingTasks />
          </div>
          <div className="flex-1 w-full min-w-xs">
            <OverdueTasks />
          </div>

          <div className="flex-1 sm:max-w-xs w-full">
            <Card className="w-full max-h-108">
              <CardTitle>Subjects</CardTitle>
              <div className="flex items-center justify-between">
                <CardHeading className="text-xl">All Subjects</CardHeading>
              </div>
              <CardContent className="w-full p-0">
                <div className="flex flex-wrap w-full gap-2">
                  {subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className="text-sm text-foreground/80 font border border-black/20 rounded-lg px-4 py-2"
                    >
                      {subject.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 w-full sm:max-w-xs">
            <Card className="w-full bg-primary shadow-lg text-white max-h-108">
              <CardTitle>Pomodoro</CardTitle>
              <div className="flex items-center justify-between">
                <CardHeading className="text-xl">Pomodoro Timer</CardHeading>
              </div>
              <CardContent className="flex flex-col gap-2 px-0"></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
