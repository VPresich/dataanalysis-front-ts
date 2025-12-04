declare module "react-lines-ellipsis" {
  import * as React from "react";

  interface LinesEllipsisProps {
    text: string;
    maxLine?: number | string;
    ellipsis?: string;
    trimRight?: boolean;
    basedOn?: string;
    component?: string | React.ComponentType<any>;
    className?: string;
  }

  const LinesEllipsis: React.FC<LinesEllipsisProps>;

  export default LinesEllipsis;
}
