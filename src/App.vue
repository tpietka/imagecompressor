<template>
  <Main />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Main from "./components/Main.vue";

export default defineComponent({
  name: "App",
  components: {
    Main,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background: url('') no-repeat center center fixed;
  background-size: cover;
  width:100%;
  height:100vh;
  -moz-background-size: cover;
  -webkit-background-size: cover;
  overflow: hidden;
}
</style>
