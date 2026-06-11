import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import TaskCard from "../components/_TaskCard";
import SubjectCard from "../components/_SubjectCard";
import UserCard from "../components/_UserCard";
import DateTimeCard from "../components/_DateTimeCard";
import PomodoroCard from "../components/_PomodoroCard";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useSubjects } from "../hooks/useSubjects";

function Dashboard() {
  const { data: subjects } = useSubjects();

  return (
    <div className="w-full bg-primary/5">
      <div className="min-h-screen sm:max-w-5xl mx-auto sm:py-8 py-4 px-2 gap-4 w-full grid sm:grid-cols-3 sm:grid-rows-3">
        <div className="sm:hidden sm:row-span-1 h-full">
          <UserCard />
        </div>

        {/* DATE AND TIME */}
        <div className="sm:hidden sm:row-span-1 h-full">
          <DateTimeCard />
        </div>

        {/* TASKS */}
        <div className="sm:row-span-2 h-full ">
          <TaskCard />
        </div>

        {/* SUBJECTS */}
        <div className="sm:row-span-1 h-full">
          <SubjectCard />
        </div>

        {/* PROFILE */}
        <div className="hidden sm:block sm:row-span-1 h-full">
          <UserCard />
        </div>

        {/* DATE AND TIME */}
        <div className="hidden sm:block sm:row-span-1 h-full">
          <DateTimeCard />
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle>EMPTY FOR NOW</CardTitle>
          </CardHeader>
        </Card>

        {/* NOTES */}
        <Card className="sm:col-span-2">
          <CardHeader className="flex justify-between ">
            <CardTitle>NOTES</CardTitle>
            <Button size="icon-sm">+</Button>
          </CardHeader>
          <CardContent className="border-2 h-full">No notes yet.</CardContent>
        </Card>

        {/* POMODORO */}
        <div className="sm:col-span-1">
          <PomodoroCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
