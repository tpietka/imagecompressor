<template>
  <div class="container">
    <input type="text" placeholder="Upuść pliki lub uzyj przycisku obok" />
    <input
      type="file"
      multiple
      hidden
      id="filesToCompress"
      accept=".jpg, .jpeg, .png"
    />
    <label class="add-files-label" for="filesToCompress">Dodaj</label>
    {{ initialImages }}
    <Image :imageFile="imageFile"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Compressor from "compressorjs";
import Image from "./Image.vue";
import { ImageFile } from "../types";
//import Image from "./Image.vue";


export default defineComponent({
  name: "Main",
  components: {
    Image
  },
  data() {
    return {
      initialImages: [] as ImageFile[],
      imageFile: {} as ImageFile,
      watermark: {
        size: "",
        text: "",
        font: "Arial",
      },
      options: {
        quality: 0.5,
      },
    };
  },
  methods: {
    uploadImage(selectedImages: FileList | null) {
      if (selectedImages != null) {
        Array.from(selectedImages).forEach((file) => {
          if (selectedImages.length < 1) {
            return;
          } else {
            this.compressImage(file);
          }
        });
      }
    },
    compressImage(file: File | Blob) {
      var self = this;
      self.imageFile.file = file;
      new Compressor(file, {
        drew(ctx, canvas) {
          ctx.fillStyle = "#fff";
          ctx.font = `${self.getFontSize(canvas)}px ${self.watermark.font}`;
          ctx.textAlign = "right";
          ctx.fillText(
            `${self.watermark.text}`,
            canvas.width - 10,
            canvas.height - 10
          );
        },
        strict: true,
        checkOrientation: true,
        quality: Number(self.options.quality),
        convertSize: 2000000,
        success(result) {
          console.log(file);
          console.log(result);
          self.imageFile.compressedImage = result;
          self.imageFile.savedOnCompression = self.getCompressionSize(
            result.size,
            file.size
          );
          self.initialImages.push(self.imageFile);
        },
        error(err) {
          console.log(err.message);
        },
      });
    },
    getFontSize(canvas: HTMLCanvasElement) {
      if (this.watermark.size) {
        if (canvas.width < canvas.height) {
          return (canvas.width - canvas.height) / 8;
        } else {
          return (canvas.height - canvas.width) / 6;
        }
      } else {
        return parseInt(this.watermark.size);
      }
    },
    getCompressionSize(resultSize: number, fileSize: number): string {
      return 100 - (resultSize / fileSize) * 100 + "%";
    },
    getImageUrl(file: Blob | File): string {
      return URL.createObjectURL(file);
    }
  },
  mounted() {
    let filesHtmlElement = document.querySelector(
      "#filesToCompress"
    ) as HTMLInputElement;
    filesHtmlElement?.addEventListener("change", () => {
      let files = filesHtmlElement?.files;
      this.uploadImage(files);
    });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
