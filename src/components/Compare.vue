<template>
  <div class="modal">
    <div id="image-compare">
      <img :src="url" alt="" />
      <img :src="compressedUrl" alt="" />
    </div>
  </div>
  <a @click="$emit('close-comparison')" class="modal-backdrop"></a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ImageFile } from "../types";
import ImageCompare from "image-compare-viewer";
import { prettySize } from "../helpers/shared";

export default defineComponent({
  name: "Compare",
  props: {
    image: Object as PropType<ImageFile>,
  },
  emits: ["close-comparison"],
  computed: {
    url(): string {
      if (this.image?.file != undefined) {
        return URL.createObjectURL(this.image?.file);
      }
      return "";
    },
    compressedUrl(): string {
      if (this.image?.file != undefined) {
        return URL.createObjectURL(this.image?.compressedFile);
      }
      return "";
    },
  },
  mounted() {
    const element = document.getElementById("image-compare");
    const options = {
      showLabels: true,
      labelOptions: {
        before: prettySize(this.image?.file.size),
        after: prettySize(this.image?.compressedFile.size),
        onHover: false,
      },
    };
    new ImageCompare(element, options).mount();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal {
  position: fixed;
  z-index: 1120;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100%;
  max-height: 100%;
  width: 100%;
}
.modal-backdrop {
  z-index: 1090;
  background: rgba(0, 0, 0, 0.75);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.img-left {
  width: 50%;
  height: auto;
  object-fit: cover;
}
.img-right {
  width: 50%;
  height: auto;
  object-fit: cover;
}
</style>
