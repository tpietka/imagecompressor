export interface ImageFile {
  name: string;
  compressedFile: Blob;
  file: File | Blob;
  savedOnCompression: string;
}

export interface Watermark {
  size: string;
  text: string;
  font: string;
}

export interface CompressorOptions {
  quality: string;
  minWidth: string | number | string[] | undefined;
  maxWidth: string | number | string[] | undefined;
  minHeight: string | number | string[] | undefined;
  maxHeight: string | number | string[] | undefined;
  width: string | number | string[] | undefined;
  height: string | number | string[] | undefined;
  mimeType: string | number | string[] | undefined;
  convertSize: string | number | string[] | undefined;
  strict: boolean;
  checkOrientation: boolean;
}
