import { Helmet } from "react-helmet-async";
import { ReactNode } from "react";

interface DocumentTitleProps {
  children: ReactNode;
}

export default function DocumentTitle({ children }: DocumentTitleProps) {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  );
}
