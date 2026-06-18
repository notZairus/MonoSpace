import TaskCard from "../components/TaskCard";
import TagCard from "../components/TagCard";
import UserCard from "../components/UserCard";
import DateTimeCard from "../components/DateTimeCard";
import PomodoroCard from "../components/PomodoroCard";
import NoteCard from "../components/NoteCard";
import { motion } from "motion/react";
import { useIsMobile } from "../hooks/useIsMobile";

const animation = {
  hover: {
    scale: 1.01,
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98, boxShadow: "none" },
};

function Dashboard() {
  const isMobile = useIsMobile() || false;

  return (
    <div className="w-full bg-primary/5 ">
      <div className="min-h-screen sm:max-w-5xl mx-auto sm:py-8 py-4 px-2 gap-4 w-full grid sm:grid-cols-3 sm:grid-rows-3">
        {/* DATE AND TIME */}
        <motion.div
          whileHover={animation.hover}
          whileTap={animation.tap}
          initial={isMobile ? { x: 0 } : { x: -100 }}
          animate={
            isMobile
              ? {}
              : {
                  x: 0,
                  transition: { duration: 1 },
                }
          }
          className="sm:col-span-2 sm:row-span-1 h-full rounded-4xl"
        >
          <DateTimeCard />
        </motion.div>

        {/* PROFILE */}
        <motion.div
          whileHover={animation.hover}
          whileTap={animation.tap}
          initial={isMobile ? { x: 0, y: 0 } : { y: -300 }}
          animate={
            isMobile
              ? {}
              : {
                  y: 0,
                  transition: { delay: 1, duration: 0.5 },
                }
          }
          className="sm:row-span-1 h-full rounded-4xl"
        >
          <UserCard />
        </motion.div>

        {/* TASKS */}
        <motion.div
          whileHover={animation.hover}
          whileTap={animation.tap}
          initial={isMobile ? { x: 0, y: 0 } : { y: 100 }}
          animate={
            isMobile
              ? {}
              : {
                  y: 0,
                  transition: { duration: 1 },
                }
          }
          className="sm:row-span-2 h-full rounded-4xl"
        >
          <TaskCard />
        </motion.div>

        {/* TAGS */}
        <motion.div
          whileHover={animation.hover}
          whileTap={animation.tap}
          initial={isMobile ? { x: 0, y: 0 } : { x: 340, y: -700 }}
          animate={
            isMobile
              ? {}
              : {
                  x: 0,
                  y: 0,
                  transition: {
                    y: { duration: 0.5 },
                    x: { duration: 0.5, delay: 0.5 },
                  },
                }
          }
          className="rounded-4xl"
        >
          <TagCard />
        </motion.div>

        {/* POMODORO */}
        <motion.div
          whileHover={animation.hover}
          whileTap={animation.tap}
          initial={isMobile ? { x: 0, y: 0 } : { y: -700 }}
          animate={
            isMobile
              ? {}
              : {
                  y: 0,
                  transition: { delay: 0.5, duration: 0.5 },
                }
          }
          className="sm:col-span-1 rounded-4xl"
        >
          <PomodoroCard />
        </motion.div>

        {/* NOTES */}
        <motion.div
          whileHover={animation.hover}
          whileTap={animation.tap}
          initial={isMobile ? { x: 0, y: 0 } : { x: 100 }}
          animate={
            isMobile
              ? {}
              : {
                  x: 0,
                  transition: { duration: 1 },
                }
          }
          className="sm:col-span-2 rounded-4xl"
        >
          <NoteCard />
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;
