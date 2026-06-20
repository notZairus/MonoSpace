import { motion } from "motion/react";

function TestingPage() {
  return (
    <div
      className={
        "w-full bg-black min-h-screen flex items-center justify-center"
      }
    >
      <motion.div className="flex items-center justify-center aspect-square w-56 bg-[hsl(0,0%,8%)] border border-[hsl(0,0%,16%)] border-t-[hsl(0,0%,24%)] hover:bg-[linear-gradient(0,hsl(0,0%,8%),hsl(0,0%,12%))] transition-colors duration-300 rounded-2xl cursor-pointer"></motion.div>
    </div>
  );
}

export default TestingPage;
