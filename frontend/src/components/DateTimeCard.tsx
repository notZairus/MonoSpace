import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useQueryClient } from "@tanstack/react-query";
import monospace_icon from "../assets/monospace_icon.png";

function DateTimeCard() {
  const [dateTime, setDateTime] = useState(new Date());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const query = useQueryClient();

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
      setMinute(new Date().getMinutes());
    }, 1000);

    return () => clearInterval(timer);
  }, [dateTime]);

  useEffect(() => {
    query.invalidateQueries({
      queryKey: ["tasks"],
    });
    query.invalidateQueries({
      queryKey: ["subjects"],
    });
  }, [minute, query]);

  return (
    <Card className="h-full bg-primary text-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">MONOSPACE</CardTitle>
      </CardHeader>
      <CardContent className="relative flex justify-center h-full">
        <img
          src={monospace_icon}
          alt="Monospace Icon"
          className="absolute w-75 -top-22 -left-15 opacity-20 z-10"
        />
        <div className="z-20 flex flex-col items-center justify-center h-full gap-4">
          <div className="flex flex-col items-center  justify-center">
            <p className="text-center font-semibold text-lg">
              {dateTime.toLocaleDateString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-5xl font-heading tracking-wider text-center">
              {dateTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div>
            <p className="text-center h-8">
              Ang di mag mahal sa sariling wika, ay mas mabaho pa sa lumang
              tuyo.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DateTimeCard;
