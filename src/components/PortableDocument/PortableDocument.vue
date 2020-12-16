<template>
  <div class="portable-document">
    <PortableDocumentLayout :pages="pages" :grid="grid">
      <PortableDocumentPage slot-scope="{ page }" :page="page">
        <PortableDocumentTextLayer :page="page" @selection="onSelection" />
        <PortableDocumentAnnotationLayer
          :page="page"
          :annotations="annotations"
        />
      </PortableDocumentPage>
    </PortableDocumentLayout>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from "vue-property-decorator";
import { v4 as uuid } from "uuid";

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist/types/display/api";

import { Anchor, Annotation, Tool } from "@/types/annotations";

import PortableDocumentAnnotationLayer from "./PortableDocumentAnnotationLayer.vue";
import PortableDocumentLayout from "./PortableDocumentLayout.vue";
import PortableDocumentPage from "./PortableDocumentPage.vue";
import PortableDocumentTextLayer from "./PortableDocumentTextLayer.vue";

GlobalWorkerOptions.workerSrc = pdfjsWorker;

@Component({
  components: {
    PortableDocumentAnnotationLayer,
    PortableDocumentLayout,
    PortableDocumentPage,
    PortableDocumentTextLayer
  }
})
export default class PortableDocument extends Vue {
  @Model("update:annotations", { type: Array, default: () => [] })
  readonly annotations!: Annotation[];
  @Prop({ type: Boolean, default: false }) readonly grid!: boolean;
  @Prop({ type: Number, default: 0 }) readonly zoom!: number;
  @Prop({ type: String, default: "" }) readonly src!: string;
  @Prop({ type: String, default: Tool.Select }) readonly activeTool!: Tool;

  document: PDFDocumentProxy | null = null;
  pages: PDFPageProxy[] = [];

  @Watch("src")
  onSrcChange() {
    this.loadDocument();
  }

  mounted() {
    this.loadDocument();
  }

  onSelection(anchors: Anchor[]) {
    const annotation: Annotation = {
      id: uuid(),
      anchors: anchors
    };
    this.$emit("update:annotations", [...this.annotations, annotation]);
  }

  async loadDocument() {
    if (this.src?.trim()) {
      const loadingTask = getDocument(this.src);
      this.document = await loadingTask.promise;

      const pages: Promise<PDFPageProxy>[] = [];
      for (let i = 1; i <= this.document.numPages; i++) {
        pages.push(this.document.getPage(i));
      }

      this.pages = await Promise.all(pages);
    }
  }
}
</script>

<style lang="scss" scoped>
.portable-document {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
