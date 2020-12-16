import { AnchorTransform } from "@/types/annotations";

export function unselect() {
  window.getSelection()?.empty();
}

export function getSelectionRects(): DOMRect[] {
  const rectangles: DOMRect[] = [];
  const selection = window.getSelection();
  if (selection?.toString()) {
    const rectangleList = selection.getRangeAt(0).getClientRects();
    for (let i = 0; i < rectangleList.length; i++) {
      const rectangle = rectangleList.item(i);
      rectangle && rectangles.push(rectangle);
    }
  }
  return rectangles;
}

export function getAnchorTransformRelativeTo(
  element: Element
): AnchorTransform[] {
  const boundaries = element.getBoundingClientRect();
  const rectList = getSelectionRects();
  return rectList.map(rect => {
    const x = rect.left - boundaries.left;
    const y = rect.top - boundaries.top;
    const width = rect.width;
    const height = rect.height;
    return [x, y, width, height];
  });
}
