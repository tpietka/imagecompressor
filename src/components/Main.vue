<template>
  <div class="container">
    <div class="submit-files">
      <div class="files-input" @dragover="dragoverFiles" @drop="dropFiles">
        <div class="upload-text">
          <h3>upuść pliki tutaj...</h3>
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
      <div>poziom kompresji:</div>
      <input
        class="compression-radio"
        id="high"
        name="compression"
        type="radio"
        value="0.4"
        v-model="options.quality"
      />
      <label class="radio-btn-label" for="high">wysoka</label>
      <input
        class="compression-radio"
        id="medium"
        name="compression"
        type="radio"
        checked
        value="0.6"
        v-model="options.quality"
      />
      <label class="radio-btn-label" for="medium">średnia</label>
      <input
        class="compression-radio"
        id="low"
        name="compression"
        type="radio"
        value="0.8"
        v-model="options.quality"
      />
      <label class="radio-btn-label" for="low">niska</label>
      <div class="more-options-button" @click="moreOptions = !moreOptions">
        <div class="more-options-button" v-if="!moreOptions">
          <span>opcje szczegółowe</span>
          <img class="arrow" src="../assets/down-arrow.svg" />
        </div>
        <div class="more-options-button" v-else>
          <span>opcje szczegółowe</span>
          <img class="arrow" src="../assets/up-arrow.svg" />
        </div>
      </div>
    </div>
    <div class="advanced-settings" v-if="moreOptions">
      <div class="field">
        <input
          id="watermark"
          type="text"
          name="watermark"
          v-model="watermark.text"
        />
        <label class="radio-btn-label" for="watermark">watermark</label>
      </div>
      <div class="fields">
        <div class="field">
          <input
            id="minWidth"
            type="text"
            name="minWidth"
            v-model="options.minWidth"
          />
          <label class="radio-btn-label" for="minWidth">min. szerokość</label>
        </div>
        <div class="field">
          <input
            id="maxWidth"
            type="text"
            name="maxWidth"
            v-model="options.maxWidth"
          />
          <label class="radio-btn-label" for="maxWidth">max. szerokość</label>
        </div>
        <div class="field">
          <input
            id="minHeight"
            type="text"
            name="minHeight"
            v-model="options.minHeight"
          />
          <label class="radio-btn-label" for="minHeight">min. wysokość</label>
        </div>
        <div class="field">
          <input
            id="maxHeight"
            type="text"
            name="maxHeight"
            v-model="options.maxHeight"
          />
          <label class="radio-btn-label" for="maxHeight">max. wysokość</label>
        </div>
      </div>
      <div class="fields">
        <div class="field">
          <input type="checkbox" id="checkOrientation" />
          <label for="checkOrientation">sprawdź orientację</label>
        </div>
        <div class="field">
          <input type="checkbox" id="strict" />
          <label for="strict">rygorystystyczny</label>
        </div>
      </div>
    </div>
  </div>
  <FileList v-model:files="initialFiles"></FileList>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ImageFile, Watermark, CompressorOptions } from "../types";
import { compressImage } from "../helpers/shared";
import FileList from "./FileList.vue";
//import Settings from "./Settings.vue";

export default defineComponent({
  name: "Main",
  components: {
    FileList,
    //Settings,
  },
  data() {
    return {
      initialFiles: [] as ImageFile[],
      watermark: {} as Watermark,
      options: {} as CompressorOptions,
      moreOptions: false,
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
            this.compressImage(
              file,
              null,
              this.watermark,
              this.options,
              this.initialFiles
            );
          }
        });
      }
      (document.querySelector("#filesToCompress") as HTMLInputElement).value =
        "";
    },
    compressImage: compressImage,
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
  .advanced-settings {
    background-color: #6eade5;
    display: flex;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
  }
  .fields {
    display: flex;
    flex-direction: column;
  }
  .fields-labels {
    display: flex;
    flex-direction: row;
  }
}
@media only screen and (max-width: 700px) {
  .container {
    width: 95%;
  }
}
</style>
