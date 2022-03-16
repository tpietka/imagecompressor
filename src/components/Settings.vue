<template>
  <div class="menu">
    {{ options.quality }}
    <input
      class="quality-slider"
      type="range"
      v-model="option.quality"
      min="0.1"
      max="1.0"
      step="0.1"
    />
    <input type="text" v-model="watermark.text" />
    <input type="text" v-model="watermark.size" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Watermark, CompressorOptions } from "../types";

export default defineComponent({
  name: "Settings",
  props: {
    options: Object as PropType<CompressorOptions>,
  },
  data() {
    return {
      option: {} as CompressorOptions,
    };
  },
  watch: {
    option: {
      handler() {
        this.$emit("update:options", this.option)
      },
      deep: true,
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
