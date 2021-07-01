<template>
  <div class="navbar">
    <h2>PhotoOptim</h2>
  </div>
  <div class="main">
    <Main />
  </div>
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
  background-color: #fffff8;
  width: 100%;
  margin: 0;
  height: 100%;
}
.navbar {
  width: 100%;
  height: 50px;
  background-color: #005bab;
  display: flex;
  align-items: center;
  h2 {
    width: 70%;
    color: white;
    margin: auto;
    text-align: left;

  }
}
.main {
  width: 70%;
  margin: auto;
}
</style>
