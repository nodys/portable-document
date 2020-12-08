<template>
  <div id="app">
    <PortableDocument
      :grid="true"
      :zoom="3"
      src="/sample.pdf"
      @loaded="onLoaded"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PortableDocument from "@/components/PortableDocument";

export default Vue.extend({
  name: "App",
  components: {
    PortableDocument
  },

  methods: {
    onLoaded() {
      console.log("on loaded");
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 2rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
</style>
