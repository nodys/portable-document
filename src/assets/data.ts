const x = 0,
  y = 0,
  w = 100,
  h = 100;

const sampleAnchor: Anchor = [x, y, w, h];

export type Anchor = [number, number, number, number];

export interface Annotation {
  id: string;
  anchors: Anchor[];
  data: unknown;
}

export const annotations: Annotation[] = [
  {
    id: "3ac397c8-4ae4-4dbb-bc98-2eeb23a1115c",
    anchors: [sampleAnchor, [300, 300, 20, 5]],
    data: {
      someEndUserAppProps: "ok"
    }
  }
];
