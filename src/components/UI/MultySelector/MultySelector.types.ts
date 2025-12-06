export interface MultySelectorProps {
  btnLabel: string;
  options: string[];
  selectedOptions?: string[];
  onChange: (values: string[]) => void;

  optionCSSClass?: string;
  dropdownCSSClass?: string;
  btnCSSClass?: string;
  iconCSSClass?: string;
}
