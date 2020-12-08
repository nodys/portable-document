<template>
  <div class="portable-document-annotation-layer">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "PortableDocumentAnnotationLayer"
});
</script>
