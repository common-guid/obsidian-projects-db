export interface HeadingTask {
  /** The file containing the heading. */
  file: string;
  /** The text of the H1 parent. */
  h1: string | null;
  /** The text of the H2 parent. */
  h2: string | null;
  /** The text of the H3 parent. */
  h3: string | null;
  /** The text of the H4 parent. */
  h4: string | null;
  /** The text of the H5 parent. */
  h5: string | null;
  /** The text of the H6 parent. */
  h6: string | null;
  /** The level of the current heading (1-6). */
  level: number;
  /** The text of the current heading itself. */
  text: string;
}
