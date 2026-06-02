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

// const subjects = [
//   {
//     id: 1,
//     name: "Mathematics",
//     color: "#FF5733",
//   },
//   {
//     id: 2,
//     name: "Physics",
//     color: "#33C1FF",
//   },
//   {
//     id: 3,
//     name: "Chemistry",
//     color: "#9D33FF",
//   },
//   {
//     id: 4,
//     name: "Biology",
//     color: "#33FF57",
//   },

//   {
//     id: 5,
//     name: "History",
//     color: "#FFB833",
//   },
//   {
//     id: 6,
//     name: "Geography",
//     color: "#33FFD6",
//   },
//   {
//     id: 7,
//     name: "English",
//     color: "#FF33A8",
//   },
//   {
//     id: 8,
//     name: "Computer Science",
//     color: "#3375FF",
//   },
//   {
//     id: 9,
//     name: "Economics",
//     color: "#8DFF33",
//   },
//   {
//     id: 10,
//     name: "Art",
//     color: "#FF6EC7",
//   },
//   {
//     id: 11,
//     name: "Music",
//     color: "#6E33FF",
//   },
//   {
//     id: 12,
//     name: "Philosophy",
//     color: "#33FFD1",
//   },
//   {
//     id: 13,
//     name: "Psychology",
//     color: "#FF9E33",
//   },
//   {
//     id: 14,
//     name: "Sociology",
//     color: "#33A8FF",
//   },
// ];

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
          <div className="flex-1 w-full">
            <TodayTask />
          </div>
          <div className="flex-1 w-full">
            <UpcomingTasks />
          </div>
          <div className="flex-1 w-full">
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
                    <div className="text-sm text-foreground/80 font border border-black/20 rounded-lg px-4 py-2">
                      {subject.name}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex-1">
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
