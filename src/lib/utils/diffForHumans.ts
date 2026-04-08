import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function diffForHumans(date: string | number | Date): string {
  return dayjs(date).fromNow();
}
