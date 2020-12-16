<template>
  <div class="portable-document-annotation-layer">
    <div
      class="portable-document-annotation-layer__anchor"
      v-for="(anchor, index) in filteredAnchors"
      :key="index"
      :style="computeTransform(anchor)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { PDFPageProxy } from "pdfjs-dist/types/display/api";
import { Anchor, Annotation } from "@/types/annotations";

@Component
export default class PortableDocumentAnnotationLayer extends Vue {
  @Prop({ type: Array, default: () => [] }) readonly annotations!: Annotation[];
  @Prop({ type: Object, required: true }) readonly page!: PDFPageProxy;

  get pageNumber() {
    return this.page.pageNumber;
  }

  get filteredAnchors(): Anchor[] {
    return this.annotations.reduce((acc: Anchor[], item) => {
      const belongsToPage = (anchor: Anchor) => anchor.page === this.pageNumber;
      const anchors = item.anchors.filter(belongsToPage);
      return anchors.length ? [...acc, ...anchors] : acc;
    }, []);
  }

  computeTransform(anchor: Anchor) {
    const [x, y, width, height] = anchor.transform;
    return {
      top: `${y}px`,
      left: `${x}px`,
      width: `${width}px`,
      height: `${height}px`
    };
  }
}
</script>

<style lang="scss" scoped>
.portable-document-annotation-layer {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.portable-document-annotation-layer__anchor {
  background: rgba(red, 0.2);
  position: absolute;
}
</style>
