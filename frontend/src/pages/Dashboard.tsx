import { Card, CardHeader, CardTitle } from "../components/ui/card";
import TaskCard from "../components/TaskCard";
import TagsCard from "../components/TagsCard";
import UserCard from "../components/UserCard";
import DateTimeCard from "../components/DateTimeCard";
import PomodoroCard from "../components/PomodoroCard";
import NoteCard from "../components/NoteCard";

function Dashboard() {
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
          <TagsCard />
        </div>

        {/* PROFILE */}
        <div className="hidden sm:block sm:row-span-1 h-full">
          <UserCard />
        </div>

        {/* DATE AND TIME */}
        <div className="hidden sm:block sm:col-span-2 sm:row-span-1 h-full">
          <DateTimeCard />
        </div>

        {/* NOTES */}
        <div className="sm:col-span-2">
          <NoteCard />
        </div>

        {/* POMODORO */}
        <div className="sm:col-span-1">
          <PomodoroCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
