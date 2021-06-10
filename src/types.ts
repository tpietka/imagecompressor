export interface ImageFile {
  name: string;
  compressedFile: Blob;
  file: File | Blob;
  savedOnCompression: string;
}