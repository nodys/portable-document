type X = number;
type Y = number;
type Width = number;
type Height = number;

export interface Anchor {
  page: number;
  /**
   * Defines the position and size of the rectangle that makes up the anchor.
   * The order of the values corresponds to [X, Y, Width, Height].
   */
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
