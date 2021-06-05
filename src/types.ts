export interface ImageFile extends File, Blob {
    compressedImage: Blob;
    file: File | Blob;
    savedOnCompression: string;
  }