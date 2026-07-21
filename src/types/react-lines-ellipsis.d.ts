declare module "react-lines-ellipsis" {
  import * as React from "react";

  export interface LinesEllipsisProps {
    text: string;
    maxLine?: number | string;
    ellipsis?: string;
    trimRight?: boolean;
    basedOn?: "letters" | "words";
    component?: string | React.ComponentType<unknown>;
    className?: string;
    style?: React.CSSProperties;
  }

  export default class LinesEllipsis extends React.Component<LinesEllipsisProps> {}
}
