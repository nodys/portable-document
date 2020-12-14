<template>
  <div class="portable-document">
    <PortableDocumentLayout :pages="pages" :grid="grid">
      <PortableDocumentPage slot-scope="{ page }" :page="page">
        <PortableDocumentTextLayer :page="page" />
        <PortableDocumentAnnotationLayer
          :page="page"
          :annotations="annotations"
        />
      </PortableDocumentPage>
    </PortableDocumentLayout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist/types/display/api";

import { annotations } from "@/assets/data";

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
  @Prop({ type: Boolean, default: false }) readonly grid!: boolean;
  @Prop({ type: Number, default: 0 }) readonly zoom!: number;
  @Prop({ type: String, default: "" }) readonly src!: string;

  document: PDFDocumentProxy | null = null;
  pages: PDFPageProxy[] = [];

  get annotations() {
    return annotations;
  }

  @Watch("src")
  onSrcChange() {
    this.loadDocument();
  }

  mounted() {
    this.loadDocument();
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
