export function prettySize(size: number | undefined): string {
  const kilobyte = 1024;
  const megabyte = kilobyte * kilobyte;
  if (!size) {
    return "N/A";
  }
  if (size > megabyte) {
    return (size / megabyte).toFixed(2) + "MB";
  } else if (size > kilobyte) {
    return (size / kilobyte).toFixed(2) + "KB";
  } else {
    return size + "B";
  }
}
