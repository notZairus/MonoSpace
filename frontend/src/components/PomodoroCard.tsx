import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useEffect, useState } from "react";
import effingSound from "../assets/pomodoro-sound.wav";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type SessionType = "Work" | "Short Break" | "Long Break";

function PomodoroCard() {
  const [started, setStarted] = useState(
    localStorage.getItem("pomodoro-timer") ? true : false,
  );
  const [paused, setPaused] = useState(
    localStorage.getItem("pomodoro-timer") ? true : false,
  );
  const [timer, setTimer] = useState<number>(
    localStorage.getItem("pomodoro-timer")
      ? parseInt(localStorage.getItem("pomodoro-timer")!)
      : -1,
  );
  const [currentSession, setCurrentSession] = useState<SessionType>(
    (localStorage.getItem("pomodoro-session") as SessionType) || "Work",
  );
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [workFinished, setWorkFinished] = useState(
    localStorage.getItem("pomodoro-work-finished")
      ? parseInt(localStorage.getItem("pomodoro-work-finished")!)
      : 0,
  );

  function start() {
    console.log("Start timer");
    setStarted(true);
    setTimer(workDuration * 60);
  }

  function pause() {
    setPaused(!paused);
  }

  function reset() {
    setTimer(-1);
    setStarted(false);
    setPaused(false);
    setCurrentSession("Work");
    setWorkFinished(0);
  }

  function playSound() {
    const aud = new Audio(effingSound);
    aud.play();
  }

  // timer
  useEffect(() => {
    let interval = null;

    if (started && !paused) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return 0;
          }
        });
      }, 900);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [started, paused, timer]);

  useEffect(() => {
    if (timer === -1) {
      localStorage.removeItem("pomodoro-session");
      localStorage.removeItem("pomodoro-timer");
      localStorage.removeItem("pomodoro-work-finished");
    }

    if (timer % 60 === 0) {
      localStorage.setItem("pomodoro-session", currentSession);
      localStorage.setItem("pomodoro-timer", timer.toString());
      localStorage.setItem("pomodoro-work-finished", workFinished.toString());
    }
  }, [workFinished, currentSession, timer]);

  if (timer === 0 && started && !paused) {
    playSound();
    setPaused(true);

    if (currentSession === "Long Break") {
      reset();
      return;
    }

    if (currentSession === "Short Break") {
      setCurrentSession("Work");
      setTimer(workDuration * 60);
      return;
    }

    if (currentSession === "Work") {
      setWorkFinished((prev) => prev + 1);
      if (workFinished < 4 - 1) {
        setCurrentSession("Short Break");
        setTimer(shortBreakDuration * 60);
        return;
      } else {
        setCurrentSession("Long Break");
        setTimer(longBreakDuration * 60);
        return;
      }
    }
  }

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>POMODORO</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-full flex items-center justify-center">
        <div className="w-8/10 h-38  flex items flex-col -center justify-center">
          {started && (
            <div className="text-center text-4xl font-bold">
              {Math.floor(timer / 60)
                .toString()
                .padStart(2, "0")}
              :{(timer % 60).toString().padStart(2, "0")}
            </div>
          )}

          {!started && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm  w-36">Focus Session</Label>
                <Input
                  id="work-duration"
                  type="number"
                  value={workDuration}
                  onChange={(e) => setWorkDuration(Number(e.target.value))}
                  step={1}
                  max={60}
                  min={10}
                  className="w-16 text-center"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm  w-36">Short Break</Label>
                <Input
                  id="short-break-duration"
                  type="number"
                  value={shortBreakDuration}
                  onChange={(e) =>
                    setShortBreakDuration(Number(e.target.value))
                  }
                  step={1}
                  max={60}
                  min={5}
                  className="w-16 text-center"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-sm  w-36">Long Break</Label>
                <Input
                  id="long-break-duration"
                  type="number"
                  value={longBreakDuration}
                  onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                  step={1}
                  max={60}
                  min={10}
                  className="w-16 text-center"
                />
              </div>
            </div>
          )}

          <div className="mt-4 space-y-2 w-full">
            <Button
              variant="default"
              className="w-full"
              onClick={started ? pause : start}
            >
              {started
                ? (paused ? "Resume" : "Pause") + " " + currentSession
                : "Start Pomodoro"}
            </Button>
            {started && paused && (
              <Button
                variant="destructive"
                className="w-full hover:bg-black/30 transition-all"
                onClick={reset}
              >
                Reset Pomodoro
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PomodoroCard;
