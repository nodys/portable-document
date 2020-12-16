<template>
  <div class="portable-document-text-layer" @mouseup="onMouseUp" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PDFPageProxy } from "pdfjs-dist/types/display/api";
import { renderTextLayer } from "pdfjs-dist";

import { Anchor } from "@/types/annotations";

import * as selectionUtils from "@/utils/selection.ts";

@Component
export default class PortableDocumentTextLayer extends Vue {
  @Prop({ type: Object, required: true }) readonly page!: PDFPageProxy;

  @Watch("page")
  onPageChange(page: PDFPageProxy) {
    if (page) this.renderText();
  }

  mounted() {
    this.renderText();
  }

  onMouseUp() {
    const anchors: Anchor[] = selectionUtils
      .getAnchorTransformRelativeTo(this.$el)
      .map(transform => ({
        page: this.page.pageNumber,
        transform
      }));
    if (anchors.length) {
      this.$emit("selection", anchors);
      selectionUtils.unselect();
    }
  }

  async renderText() {
    // Set scale (zoom) level
    const scale = 1;

    // Get viewport (dimensions)
    const viewport = this.page.getViewport({ scale });

    // Get text-fragments
    const textContent = await this.page.getTextContent();

    renderTextLayer({
      textContent,
      container: this.$el as HTMLElement,
      viewport,
      enhanceTextSelection: true
    });
  }
}
</script>

<style lang="scss">
.portable-document-text-layer {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  opacity: 0.2;
  line-height: 1;

  &::selection {
    color: transparent;
    background: blue;
  }
}

.portable-document-text-layer span {
  color: transparent;
  position: absolute;
  white-space: pre;
  cursor: text;
  transform-origin: 0% 0%;

  &::selection {
    color: transparent;
    background: blue;
  }
}
</style>
