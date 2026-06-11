import DashboardHeader from "../components/DashboardHeader";
import SubjectCard from "../components/SubjectCard";
import TodayCard from "../components/TodayCard";
import PomodoroCard from "../components/PomodoroCard";
import TaskCard from "../components/TaskCard";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

function Dashboard() {
  async function extractFile(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) {
      console.error("No file selected");
      return;
    }

    const res = await fetch("http://localhost:3000/api/notes/extract", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Extracted data:", data);
  }

  return (
    <div className="min-h-screen w-full p-4 sm:p-8">
      <div className="mx-auto ">
        {/* how can i make this not to be affected by zooming in or out */}
        <DashboardHeader />
        <div className="flex flex-col w-full sm:gap-8 sm:mt-8 mt-4 gap-4 items-center sm:items-start sm:flex-row sm:flex-wrap">
          <div className="flex-1 w-full sm:min-w-sm">
            <TodayCard />
          </div>
          <div className="flex-1 w-full sm:min-w-sm sm:max-w-sm">
            <SubjectCard />
          </div>
          <div className="flex-1 w-full sm:min-w-75 sm:max-w-75">
            <PomodoroCard />
          </div>
          <div className="flex-1 w-full sm:min-w-sm">
            <TaskCard />
          </div>
          <div className="flex-1 w-full sm:min-w-sm">
            <Card>
              <CardContent>
                <p>This is a simple card.</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    extractFile(new FormData(e.currentTarget));
                    e.target.reset();
                  }}
                >
                  <Input type="file" name="file" required></Input>
                  <Button className="text-white">Submit</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
