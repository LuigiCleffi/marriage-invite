import React, { useEffect, useRef, useState } from "react";
import { CardFooter } from "../ui/card";
import { Separator } from "@radix-ui/react-separator";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import { Clock2 } from "lucide-react";

const eventDate = new Date("2025-11-21T21:00:00Z");

export default function CountDown() {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    const updateCountdown = () => {
      const now = new Date();
      const days = differenceInDays(eventDate, now);
      const hours = differenceInHours(eventDate, now) % 24;
      const minutes = differenceInMinutes(eventDate, now) % 60;
      const seconds = differenceInSeconds(eventDate, now) % 60;

      if (isMounted.current) {
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    timerRef.current = setInterval(updateCountdown, 1000); // Store interval ID in the ref

    return () => {
      isMounted.current = false;
      if (timerRef.current) {
        clearInterval(timerRef.current); // Clear interval on unmount
      }
    };
  }, []);
  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-4 dark:text-muted-foreground">
        <p className="text-xl">Faltam</p>
        <Clock2 size={24} />
      </div>
      <CardFooter className="flex flex-row border-t p-4">
        <div className="flex w-full items-center gap-2">
          <TimeSection time={timeRemaining.days} timeSet="Dias" />
          <TimeSection time={timeRemaining.hours} timeSet="h" />
          <TimeSection time={timeRemaining.minutes} timeSet="min" />
          <TimeSection time={timeRemaining.seconds} timeSet="s" />
        </div>
      </CardFooter>
    </>
  );
}

type TimeSectionProps = {
  time: number;
  timeSet: "s" | "min" | "h" | "Dias";
};

const TimeSection = ({ time, timeSet }: TimeSectionProps) => {
  return (
    <>
      <Separator orientation="vertical" />
      <div className="grid flex-1 auto-rows-min gap-0.5">
        <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
          {time}
          <span className="text-sm font-normal text-muted-foreground">
            {timeSet}
          </span>
        </div>
      </div>
    </>
  );
};
