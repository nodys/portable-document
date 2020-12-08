<template>
  <div class="portable-document-page">
    <canvas ref="canvas" />
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { PDFPageProxy } from "pdfjs-dist/types/display/api";

@Component
export default class PortableDocumentPage extends Vue {
  @Prop({ type: Object, required: true }) readonly page!: PDFPageProxy;

  @Watch("page")
  onPageChange(page: PDFPageProxy) {
    if (page) this.renderPage();
  }

  mounted() {
    this.renderPage();
  }

  async renderPage() {
    // Set scale (zoom) level
    const scale = 1.5;

    // Get viewport (dimensions)
    const viewport = this.page.getViewport({ scale });

    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const context = canvas.getContext("2d");

    if (context) {
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      this.page.render({
        viewport,
        canvasContext: context,
        enableWebGL: true
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.portable-document-page {
  background: white;
  box-shadow: 0 6px 22px rgba(black, 0.1);
  position: relative;
}
</style>
