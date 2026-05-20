import LinesEllipsis from "react-lines-ellipsis";

export interface EllipsisTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

const EllipsisText = ({ text, maxLines = 1, className }: EllipsisTextProps) => {
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
