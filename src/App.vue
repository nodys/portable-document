<template>
  <div id="app">
    <PortableDocument
      v-model="annotations"
      :grid="true"
      :zoom="3"
      src="/96079ac0e2b9c7245d781ba97d62fdeb4e69c6b8.pdf"
      @loaded="onLoaded"
    >
      <!-- <template slot-cope="{ annotation }">
        <SourceAssertion v-if="annotation.data.type === 'assertion'" />
        <SourceHiglight
          v-else-if="annotation.data.type === 'highlight'"
          :color="annotation.data.color"
        />
      </template>
      <SourceAnnotation slot-cope="{ annotation }" annotation="annotation" /> -->
    </PortableDocument>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import PortableDocument from "@/components/PortableDocument";
import { annotations } from "@/assets/data";

export default Vue.extend({
  name: "App",
  components: {
    PortableDocument
  },

  data() {
    return {
      annotations: annotations
    };
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
