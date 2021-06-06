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
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
