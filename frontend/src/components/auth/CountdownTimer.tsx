import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
  initialSeconds: number;
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialSeconds,
  onComplete,
}) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, onComplete]);

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <span className="font-mono text-purple-600 font-semibold">
      {formatTime(seconds)}
    </span>
  );
};

export default CountdownTimer;