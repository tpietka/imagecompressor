<template>
  <div class="container">
    <input
      type="text"
      placeholder="Upuść pliki lub uzyj przycisku obok"
      @dragover="dragoverFiles"
      @drop="dropFiles"
    />
    <input
      type="file"
      multiple
      hidden
      id="filesToCompress"
      accept=".jpg, .jpeg, .png"
    />
    <label class="add-files-label" for="filesToCompress">Dodaj</label>
    {{ initialImages }}
    <div v-for="(image, index) in initialImages" :key="index">
      <Image :imageFile="image" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Compressor from "compressorjs";
import Image from "./Image.vue";
import { ImageFile } from "../types";

export default defineComponent({
  name: "Main",
  components: {
    Image,
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
    uploadImage(selectedImages: FileList | null | undefined) {
      if (selectedImages) {
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
          var imageFile: ImageFile = {
            file: file,
            compressedImage: result,
            savedOnCompression: self.getCompressionSize(result.size, file.size),
          };
          self.initialImages.push(imageFile);
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
    dropFiles(e: DragEvent) {
      e.preventDefault();
      this.uploadImage(e.dataTransfer?.files);
    },
    dragoverFiles(e: Event) {
      e.preventDefault();
    },
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
