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

export function getFontSize(
  canvas: HTMLCanvasElement,
  watermarkSize: string
): number {
  if (watermarkSize) {
    if (canvas.width < canvas.height) {
      return (canvas.width - canvas.height) / 8;
    } else {
      return (canvas.height - canvas.width) / 6;
    }
  } else {
    return parseInt(watermarkSize);
  }
}

export function getCompressionSize(
  resultSize: number,
  fileSize: number
): string {
  return (100 - (resultSize / fileSize) * 100).toString().substring(0, 4) + "%";
}
