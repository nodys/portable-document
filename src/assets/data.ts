import { Anchor, Annotation } from "@/types/annotations";

const anchorA: Anchor = { page: 1, transform: [75, 120, 342, 23] };
const anchorB: Anchor = { page: 2, transform: [297, 243, 221, 12] };

export const annotations: Annotation[] = [
  {
    id: "3ac397c8-4ae4-4dbb-bc98-2eeb23a1115c",
    anchors: [anchorA, anchorB],
    data: {
      someEndUserAppProps: "ok"
    }
  }
];
