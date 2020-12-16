type X = number;
type Y = number;
type Width = number;
type Height = number;

export interface Anchor {
  page: number;
  transform: [X, Y, Width, Height];
}

export interface Annotation {
  id: string;
  anchors: Anchor[];
  data?: unknown;
}

export enum Tool {
  Select = "select",
  Highlight = "highlight",
  Figure = "figure"
}
