import React from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { EllipsisTextProps } from "./EllipsisText.types";

const EllipsisText: React.FC<EllipsisTextProps> = ({
  text,
  maxLines = 1,
  className,
}) => {
  return (
    <LinesEllipsis
      text={text}
      maxLine={maxLines}
      ellipsis="..."
      trimRight
      basedOn="letters"
      component="p"
      className={className}
    />
  );
};

export default EllipsisText;
