import { useEffect, useState } from "react";

const getTimeLeft = (endDate: string) => {
  const diff = new Date(endDate).getTime() - Date.now();

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};

export const useCountdown = (endDate?: string) => {
  const [timeLeft, setTimeLeft] = useState(() =>
    endDate ? getTimeLeft(endDate) : null
  );

  useEffect(() => {
    if (!endDate) return;

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return timeLeft;
};
