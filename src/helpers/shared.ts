import { ImageFile, CompressorOptions } from "../types";
import Compressor from "compressorjs";

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
      return ((canvas.width - canvas.height) * parseInt(watermarkSize)) / 8;
    } else {
      return ((canvas.height - canvas.width) * parseInt(watermarkSize)) / 6;
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

export function compressImage(
  file: File | Blob,
  options: CompressorOptions,
  filesArray: ImageFile[]
): void {
  new Compressor(file, {
    minWidth: Number(options.minWidth),
    maxWidth: Number(options.maxWidth),
    minHeight: Number(options.minHeight),
    maxHeight: Number(options.maxHeight),
    strict: options.strict,
    checkOrientation: options.checkOrientation,
    quality: Number(options.quality),
    convertSize: Number(options.convertSize),
    success(result) {
      const imageFile: ImageFile = {
        name: (file as File).name,
        file: file,
        compressedFile: result,
        savedOnCompression: getCompressionSize(result.size, file.size),
      };
      filesArray.push(imageFile);
    },
    error(err) {
      console.log(err.message);
    },
  });
}
