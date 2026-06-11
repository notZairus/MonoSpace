import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function DateTimeCard() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [dateTime]);

  return (
    <Card className="h-full bg-primary/70 text-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-center">STUDYBASE</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center h-full">
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <div className="flex flex-col items-center justify-center">
            <p className="text-center">
              {dateTime.toLocaleDateString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-5xl tracking-wider  text-center font-light">
              {dateTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div>
            <p className="text-center">
              Ang di mag mahal sa sariling wika, ay mas mabaho pa sa bagoong.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DateTimeCard;
