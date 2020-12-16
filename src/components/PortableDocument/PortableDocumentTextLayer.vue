<template>
  <div class="portable-document-text-layer" @mouseup="onMouseUp" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PDFPageProxy } from "pdfjs-dist/types/display/api";
import { renderTextLayer } from "pdfjs-dist";

import { Anchor } from "@/types/annotations";

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
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const rects = range?.getClientRects();
    const page = this.$el.getBoundingClientRect();
    if (rects) {
      const anchors: Anchor[] = [];
      for (let i = 0; i < rects.length; i++) {
        const rect = rects.item(i);
        if (rect) {
          const x = rect.left - page.left;
          const y = rect.top - page.top;
          const width = rect.width;
          const height = rect.height;
          anchors.push({
            page: this.page.pageNumber,
            transform: [x, y, width, height]
          });
        }
      }
      this.$emit("selection", anchors);
    }
    selection?.empty();
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
