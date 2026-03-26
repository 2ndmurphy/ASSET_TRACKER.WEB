type TimeUnit = {
  label: string;
  seconds: number;
};

export function diffForHumans(date: string | number | Date): string {
  const now = new Date();
  const target = new Date(date);

  const diff = Math.floor((now.getTime() - target.getTime()) / 1000);

  const units: TimeUnit[] = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(diff / unit.seconds);

    if (value > 0) {
      return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "Just Now";
}
