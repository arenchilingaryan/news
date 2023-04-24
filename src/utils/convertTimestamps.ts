import { NewsItemType } from "@/types/news";
import { formatDate } from "./formatDate";

export function convertTimestampsInMyData(data: NewsItemType): NewsItemType {
  if (typeof data.date !== "string") {
    const date = new Date(data.date.seconds * 1000);
    const formattedDate = formatDate(date);
    return { ...data, date: formattedDate };
  } else {
    return data;
  }
}
