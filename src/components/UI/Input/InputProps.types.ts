export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
  placeholder?: string;
  type?: string;
}
