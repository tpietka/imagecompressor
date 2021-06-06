<template>
  <div class="image-container">
    <div class="image-thumbnail">
      <img @click="compareFiles = true" class="image" :src="getImageUrl(imageFile?.file)" />
    </div>
    <div class="size">
      {{ prettySize(imageFile?.file.size) }} >>
      {{ prettySize(imageFile?.compressedFile.size) }}
    </div>
    <div class="actions">
      <a :href="getImageUrl(imageFile?.compressedFile)" :download="imageFile?.compressedFile.name"><img class="action-icon" src='../assets/download.svg'/></a>
      <img @click="removeFile(index)" class="action-icon" src="../assets/delete.svg"/>
    </div>
  </div>
  <teleport v-if="compareFiles" to="body">
    <Compare @close-comparison="compareFiles = false" :image="imageFile"/>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ImageFile } from "../types";
import Compare from "./Compare.vue";
export default defineComponent({
  components: { Compare },
  name: "Image",
  props: {
    imageFile: Object as PropType<ImageFile>,
    index: Number
  },
  data() {
    return {
      compareFiles: false
    }
  },
  emits: [
    "remove-file",
  ],
  methods: {
    getImageUrl(file: Blob | File | undefined) {
      if (file != undefined) {
        return URL.createObjectURL(file);
      } else {
        return "";
      }
    },
    prettySize(size: number | undefined): string {
      let kilobyte = 1024;
      let megabyte = kilobyte * kilobyte;
      if (!size) {
        return "N/A";
      }
      if (size > megabyte) {
        return (size / megabyte).toFixed(2) + "MB";
      } else if (size > kilobyte) {
        return (size / kilobyte).toFixed(2) + "KB";
      } else {
        return size + "B";
      }
    },
    removeFile(indexToDelete: number | undefined) {
      if(indexToDelete != undefined) {
        this.$emit("remove-file", indexToDelete);
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.image-container {
  padding-top:5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .image-thumbnail {
    margin-left:5px;
    .image {
      width: 50px;
      height: 50px;
      object-fit: cover;
      cursor:zoom-in;
      cursor: -webkit-zoom-in;
    }
  }
  .size {
    font-size: 1.7vw;
  }
  .actions {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    a {
      width:20px;
      height:20px;
    }
    .action-icon {
      width:20px;
      height:20px;
      margin: 5%;
      cursor: pointer;
    }
  }
}
</style>
