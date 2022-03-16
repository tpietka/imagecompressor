<template>
  <div class="container">
    <div class="submit-files">
      <div class="files-input" @dragover="dragoverFiles" @drop="dropFiles">
        <div class="upload-text">
          <h3>drop files here...</h3>
        </div>
      </div>
      <label for="filesToCompress">
        <div class="upload-icon">
          <img src="../assets/upload.svg" />
        </div>
      </label>
      <input
        type="file"
        multiple
        hidden
        id="filesToCompress"
        accept=".jpg, .jpeg, .png"
      />
    </div>
    <div class="basic-settings">
      <div>compression level:</div>
      <input
        class="compression-radio"
        id="high"
        name="compression"
        type="radio"
        value="0.4"
        v-model="options.quality"
      />
      <label class="radio-btn-label" for="high">high</label>
      <input
        class="compression-radio"
        id="medium"
        name="compression"
        type="radio"
        checked
        value="0.6"
        v-model="options.quality"
      />
      <label class="radio-btn-label" for="medium">medium</label>
      <input
        class="compression-radio"
        id="low"
        name="compression"
        type="radio"
        value="0.8"
        v-model="options.quality"
      />
      <label class="radio-btn-label" for="low">low</label>
      <div class="more-options-button" @click="moreOptions = !moreOptions">
        <div class="more-options-button" v-if="!moreOptions">
          <span>advanced settings</span>
          <img class="arrow" src="../assets/down-arrow.svg" />
        </div>
        <div class="more-options-button" v-else>
          <span>advanced settings</span>
          <img class="arrow" src="../assets/up-arrow.svg" />
        </div>
      </div>
    </div>
    <div class="advanced-settings" v-if="moreOptions">
      <Settings :options="options" />
    </div>
  </div>
  <file-list v-model:files="initialFiles"></file-list>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ImageFile, CompressorOptions } from "../types";
import { compressImage } from "../helpers/shared";
import FileList from "./FileList.vue";
import Settings from "./Settings.vue";

let initialFiles = ref([] as ImageFile[]);
let options = ref({
} as CompressorOptions);
let moreOptions = ref(false);
const uploadFile = (selectedFiles: FileList | null | undefined) => {
  if (selectedFiles) {
    Array.from(selectedFiles).forEach((file) => {
      if (selectedFiles.length < 1) {
        return;
      } else {
        compressImage(file, options.value, initialFiles.value);
      }
    });
  }
  (document.querySelector("#filesToCompress") as HTMLInputElement).value = "";
};
const dropFiles = (e: DragEvent) => {
  e.preventDefault();
  uploadFile(e.dataTransfer?.files);
};
const dragoverFiles = (e: Event) => {
  e.preventDefault();
};
onMounted(() => {
  let filesHtmlElement = document.querySelector("#filesToCompress") as HTMLInputElement;
  filesHtmlElement?.addEventListener("change", () => {
    let files = filesHtmlElement?.files;
    uploadFile(files);
  });
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
  margin: auto;
  .submit-files {
    @include centered-flex;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  .files-input {
    flex-direction: column;
    width: 100%;
    font-size: 1.5vw;
    height: 100px;
    border: dotted #005bab 2px;
    border-radius: 10px;
    background-color: white;
    @include centered-flex;
    cursor: auto;
  }
  .upload-icon {
    width: 100px;
    border-radius: 10px;
    background-image: linear-gradient(to bottom right, #005bab, #6eade5);
    border: 2px solid #005bab;
    height: 100px;
    position: relative;
    margin-left: 20px;
    cursor: pointer;
    img {
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(20%, 25%);
      height: 70%;
      margin: auto;
    }
  }
  .upload-text {
    display: flex;
    align-items: center;
    .add-files-label {
      cursor: pointer;
      font-size: 20px;
      margin-left: 5px;
      color: brown;
    }
  }
  .files-input:focus {
    outline-width: 0;
  }
  .basic-settings {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .compression-radio {
      margin-left: 3%;
      cursor: pointer;
    }
    .compression-radio {
      cursor: pointer;
    }
    .radio-btn-label {
      cursor: pointer;
    }
    .more-options-button {
      display: flex;
      align-items: center;
      margin-left: auto;
      cursor: pointer;
    }
  }
  .arrow {
    width: 20px;
    height: 20px;
  }
}
@media only screen and (max-width: 700px) {
  .container {
    width: 95%;
  }
}
</style>
