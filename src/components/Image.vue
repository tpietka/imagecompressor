<template>
  <div class="image-container">
    <div class="image-thumbnail">
      <img
        @click="compareFiles = true"
        class="image"
        :src="getImageUrl(imageFile?.file)"
      />
    </div>
    <div class="size">
      {{ prettySize(imageFile?.file.size) }} >>
      {{ prettySize(imageFile?.compressedFile.size) }}
    </div>
    <div class="size">
      {{ imageFile?.savedOnCompression }}
    </div>
    <div class="actions">
      <a :href="getImageUrl(imageFile?.compressedFile)" :download="imageFile?.name"
        ><img class="action-icon" src="../assets/download2.svg"
      /></a>
      <img @click="removeFile(index)" class="action-icon" src="../assets/close2.svg" />
    </div>
  </div>
  <teleport v-if="compareFiles" to="body">
    <compare @close-comparison="compareFiles = false" :image="imageFile"></compare>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, ref, defineEmit } from "vue";
import { ImageFile } from "../types";
import Compare from "./Compare.vue";
import { prettySize, compressImage } from "../helpers/shared";
const props = defineProps<{
  imageFile: ImageFile;
  index: number;
}>();
const emit = defineEmit(["remove-file", "update-file"]);
let compareFiles = ref(false);

const getImageUrl = (file: Blob | File | undefined) => {
  if (file != undefined) {
    return URL.createObjectURL(file);
  } else {
    return "";
  }
};
const removeFile = (indexToDelete: number | undefined) => {
  if (indexToDelete != undefined) {
    emit("remove-file", indexToDelete);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.image-container {
  padding-top: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .image-thumbnail {
    margin-left: 5px;
    .image {
      width: 75px;
      height: 75px;
      object-fit: cover;
      cursor: zoom-in;
      cursor: -webkit-zoom-in;
    }
  }
  .size {
    font-size: 1.7vw;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    a {
      width: 25px;
      height: 25px;
      margin-right: 10px;
    }
    .action-icon {
      width: 25px;
      height: 25px;
      margin: 0 10px 0 0;
      cursor: pointer;
    }
  }
}
</style>
