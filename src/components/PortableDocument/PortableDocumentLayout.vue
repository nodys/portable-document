<template>
  <ul class="portable-document-layout" :class="modifiers">
    <li
      class="portable-document-layout__page"
      v-for="(page, index) in pages"
      :key="index"
    >
      <slot :page="page" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { PDFPageProxy } from "pdfjs-dist/types/display/api";

@Component
export default class PortableDocumentLayout extends Vue {
  @Prop({ type: Boolean, default: false }) readonly grid!: boolean;
  @Prop({ type: Array, required: true }) readonly pages!: PDFPageProxy[];

  get modifiers(): Record<string, boolean> {
    return {
      "portable-document-layout--grid": this.grid
    };
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}

.portable-document-layout {
  display: flex;
  flex-direction: column;
}

.portable-document-layout__page {
  margin-top: 3rem;

  &:first-child {
    margin-top: 0;
  }
}
</style>
