type FormatRelativeDate = (date: Date) => string;

interface CalculateTimeAgoOptions {
  includeSeconds: boolean;
}

export default function calculateTimeAgo(
  createdAt: Date,
  formatRelativeDate: FormatRelativeDate,
  options: CalculateTimeAgoOptions,
): string {
  const { includeSeconds = false } = options;
  const diff = Date.now() - createdAt.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / 60000);
  const days = Math.floor(diff / 86400000);

  if (includeSeconds && seconds < 10) return "Just now";

  if (!includeSeconds && diff <= 60000) return "Just now";

  if (!includeSeconds && diff <= 3600000)
    return minutes === 1 ? "1 minute ago" : formatRelativeDate(createdAt);

  if (diff <= 172800000) return "Yesterday";
  
  if (diff <= 518400000) return `${days} days ago`;

  return formatRelativeDate(createdAt);
}
