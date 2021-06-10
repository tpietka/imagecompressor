<template>
  <div class="menu">
    {{ options.quality }}
    <input
      class="quality-slider"
      type="range"
      v-model="options.quality"
      min="0.1"
      max="1.0"
      step="0.1"
    />
  </div>
  <div class="container">
    <h1 class="title">Kompresuj pliki jpg</h1>
    <div class="submit-files">
      <div class="files-input" @dragover="dragoverFiles" @drop="dropFiles">
        Upuść tutaj pliki lub dodaj je klikając na przycisk
      </div>
      <input
        type="file"
        multiple
        hidden
        id="filesToCompress"
        accept=".jpg, .jpeg, .png"
      />
      <label class="add-files-label" for="filesToCompress">Dodaj</label>
    </div>
    <FileList v-model:files="initialFiles"></FileList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Compressor from "compressorjs";
import { ImageFile } from "../types";
import { getFontSize, getCompressionSize } from "../helpers/shared";
import FileList from "./FileList.vue";

export default defineComponent({
  name: "Main",
  components: {
    FileList,
  },
  data() {
    return {
      initialFiles: [] as ImageFile[],
      watermark: {
        size: "",
        text: "",
        font: "Arial",
      },
      options: {
        quality: "0.5",
      },
    };
  },
  computed: {
    filesCount(): number {
      return this.initialFiles.length;
    },
  },
  methods: {
    uploadFile(selectedFiles: FileList | null | undefined) {
      if (selectedFiles) {
        Array.from(selectedFiles).forEach((file) => {
          if (selectedFiles.length < 1) {
            return;
          } else {
            this.compressImage(file);
          }
        });
      }
      (document.querySelector("#filesToCompress") as HTMLInputElement).value =
        "";
    },
    compressImage(file: File | Blob) {
      var self = this;
      new Compressor(file, {
        drew(ctx, canvas) {
          ctx.fillStyle = "#fff";
          ctx.font = `${self.getFontSize(canvas, self.watermark.size)}px ${
            self.watermark.font
          }`;
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
            name: (file as File).name,
            file: file,
            compressedFile: result,
            savedOnCompression: self.getCompressionSize(result.size, file.size),
          };
          self.initialFiles.push(imageFile);
        },
        error(err) {
          console.log(err.message);
        },
      });
    },
    getFontSize: getFontSize,
    getCompressionSize: getCompressionSize,
    dropFiles(e: DragEvent) {
      e.preventDefault();
      this.uploadFile(e.dataTransfer?.files);
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
      this.uploadFile(files);
    });
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin centered-flex() {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  @include centered-flex;
  flex-direction: column;
  .submit-files {
    @include centered-flex;
    width: 100%;
  }
  .files-input {
    width: 100%;
    font-size: 1.5vw;
    height: 50px;
    background-color: white;
    @include centered-flex;
    cursor: auto;
  }
  .files-input:focus {
    outline-width: 0;
  }
  .add-files-label {
    //background-image: linear-gradient(#ef3f5a, white);
    background-color: #ef3f5a;
    color: #fff;
    width: 5%;
    height: 50px;
    padding: 0 20px;
    @include centered-flex;
    cursor: pointer;
  }
  .add-files-label:hover {
    background-color: #ef3f3f;
  }
}
@media only screen and (max-width: 700px) {
  .container {
    width: 95%;
  }
}
</style>
