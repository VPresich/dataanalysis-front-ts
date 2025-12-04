export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  btnAuxStyles?: string;
  variant?: "default" | "cancel";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
