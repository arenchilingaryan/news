export function formatDate(date: Date): string {
  const dateFormatter = new Intl.DateTimeFormat("en-EN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return dateFormatter.format(date);
}
