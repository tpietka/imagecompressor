<template>
  <div class="fields">
    <div class="field">
      <input id="minWidth" type="text" name="minWidth" v-model="options.minWidth" />
      <label class="option-label" for="minWidth">min. width</label>
    </div>
    <div class="field">
      <input id="maxWidth" type="text" name="maxWidth" v-model="options.maxWidth" />
      <label class="option-label" for="maxWidth">max. width</label>
    </div>
    <div class="field">
      <input id="minHeight" type="text" name="minHeight" v-model="options.minHeight" />
      <label class="option-label" for="minHeight">min. height</label>
    </div>
    <div class="field">
      <input id="maxHeight" type="text" name="maxHeight" v-model="options.maxHeight" />
      <label class="option-label" for="maxHeight">max. height</label>
    </div>
  </div>
  <div class="fields">
    <div class="field">
      <input type="checkbox" id="checkOrientation" />
      <label class="option-label" for="checkOrientation">check orientation</label>
    </div>
    <div class="field">
      <input type="checkbox" id="strict" />
      <label class="option-label" for="strict">strict</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmit } from "vue";
import { CompressorOptions } from "../types";

const props = defineProps<{
  options: CompressorOptions;
}>();
const emit = defineEmit(["update:options"]);
</script>

<style>
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
  gap: 10px;
  color: white;
  align-items: flex-start;
}
.option-label {
  margin-left: 5px;
}
</style>
