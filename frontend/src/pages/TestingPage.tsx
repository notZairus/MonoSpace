import { Calendar, Pin } from "lucide-react";

const tasks = [
  {
    name: "Task Title",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque suscipit necessitatibus, delectus odit sunt fugiat libero reprehenderit facere magni, officiis, natus neque hic vero sit sint ipsam minus incidunt aperiam.",
    status: "PENDING",
    color: "red",
    tags: ["urgent", "home", "urgent"],
    deadline: new Date("2024-07-01"),
  },
];

const deadlineFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function TestingPage() {
  return (
    <div
      className={
        "w-full bg-black min-h-screen flex items-center justify-center"
      }
    >
      {/* <motion.div className="flex items-center justify-center aspect-square w-56 bg-[hsl(0,0%,8%)] border border-[hsl(0,0%,16%)] border-t-[hsl(0,0%,24%)] hover:bg-[linear-gradient(0,hsl(0,0%,8%),hsl(0,0%,12%))] transition-colors duration-300 rounded-2xl cursor-pointer"></motion.div> */}

      {tasks.map((task) => {
        return (
          <div className="flex max-w-120 w-full bg-white min-w-56 rounded-xl overflow-hidden">
            <div className="w-8 min-h-24 flex flex-col border-r">
              <div className="h-12 flex items-center justify-center">
                <input type="checkbox" className="w-4 h-4" />
              </div>
              <div
                className="flex-1"
                style={{ backgroundColor: task.color, opacity: 0.7 }}
              ></div>
            </div>
            <div className="flex-1 px-3 py-2">
              <p className="border-b text-lg mb-1 font-semibold line-clamp-1 w-full">
                {task.name}
              </p>
              <p className="text-muted-foreground text-sm text-ellipsis line-clamp-2">
                {task.description}
              </p>
              <div className="mt-2 flex gap-1 items-center text-muted-foreground">
                <Calendar size="16" />
                <p className="text-sm leading-0 bg-red-400">
                  {deadlineFormatter.format(task.deadline)}
                </p>
              </div>
              <div className="flex items-center flex-wrap w-64 gap-1  mt-2">
                <Pin size="16" className="text-muted-foreground" />
                {task.tags.map((tag) => (
                  <span className="text-xs border px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TestingPage;
