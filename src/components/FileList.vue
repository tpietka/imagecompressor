<template>
  <div class="files-list">
    <template v-for="(file, index) in files" :key="index">
      <Image :index="index" :imageFile="file" @remove-file="deleteFile" />
    </template>
    <div class="additional-files-info" v-if="uploadedFiles">
      <div>pliki: {{ filesCount }}</div>
      <div class="download-files" @click="downloadAllFiles">
        pobierz wszystkie
      </div>
      <div class="delete-files" @click="deleteAllFiles">usuń wszystkie</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Image from "./Image.vue";
import { ImageFile } from "../types";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default defineComponent({
  name: "Main",
  components: {
    Image,
  },
  props: {
    files: Object as PropType<ImageFile[]>,
  },
  computed: {
    filesCount(): number {
      return this.files ? this.files.length : 0;
    },
    uploadedFiles(): boolean {
      return this.files ? this.files.length > 0 : false;
    },
  },
  methods: {
    deleteAllFiles() {
      this.$emit("update:files", []);
    },
    deleteFile(indexToDelete: number) {
      if (this.files) {
        var filesAfterRemove = this.files.filter((file, index) => {
          return index != indexToDelete;
        });
        this.$emit("update:files", filesAfterRemove);
      }
    },
    downloadAllFiles() {
      let zip = new JSZip();
      let img = zip.folder("images");
      if (this.files) {
        this.files.forEach((file) => {
          img?.file(file.name, file.compressedFile);
        });
        zip.generateAsync({ type: "blob" }).then(function (content) {
          saveAs(content, "files.zip");
        });
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.files-list {
  display: flex;
  flex-direction: column;
}
.additional-files-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;
  margin-right: 10px;
}
.title {
  color: white;
  font-size: 4.5vw;
  transform: translate(-50%, -50%);
  position: relative;
  top: 40%;
  left: 50%;
  width: 100%;
}
.additional-files-info {
  .download-files {
    cursor: pointer;
    margin-left: auto;
    margin-right: 20px;
  }
  .delete-files {
    cursor: pointer;
  }
}
</style>
