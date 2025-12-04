export interface ReactIconButtonProps {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}
