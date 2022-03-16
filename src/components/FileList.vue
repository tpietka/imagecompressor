<template>
  <div class="files-list">
    <template v-for="(file, index) in files" :key="index">
      <Image :index="index" :imageFile="file" @remove-file="deleteFile" />
    </template>
    <div class="additional-files-info" v-if="uploadedFiles">
      <div>pliki: {{ filesCount }}</div>
      <div class="download-files" @click="downloadAllFiles">download all</div>
      <div class="delete-files" @click="deleteAllFiles">remove all</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmit } from "vue";
import Image from "./Image.vue";
import { ImageFile } from "../types";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const props = defineProps<{
  files: ImageFile[];
}>();
const emit = defineEmit(["update:files"]);
const filesCount = computed((): number => {
  return props.files ? props.files.length : 0;
});
const uploadedFiles = computed((): boolean => {
  return props.files ? props.files.length > 0 : false;
});
const deleteAllFiles = () => {
  emit("update:files", []);
};
const deleteFile = (indexToDelete: number) => {
  if (props.files) {
    var filesAfterRemove = props.files.filter((file, index) => {
      return index != indexToDelete;
    });
    emit("update:files", filesAfterRemove);
  }
};
const downloadAllFiles = () => {
  let zip = new JSZip();
  let img = zip.folder("images");
  if (props.files) {
    props.files.forEach((file) => {
      img?.file(file.name, file.compressedFile);
    });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "files.zip");
    });
  }
};
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
