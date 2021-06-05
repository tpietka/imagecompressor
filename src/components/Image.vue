<template>
  <div class="image-container">
    <img class="image" :src="getImageUrl(imageFile?.file)"/>
    <img class="image" :src="getImageUrl(imageFile?.compressedImage)"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ImageFile } from "../types";
export default defineComponent({
  name: "Image",
  props: {
    imageFile: Object as PropType<ImageFile>
  },
  methods: {
    getImageUrl(file: Blob | File | undefined) {
      if(file != undefined) {
        return URL.createObjectURL(file);
      } else {
        return "";
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.image {
  width: 50px;
  height:auto;
}
</style>
