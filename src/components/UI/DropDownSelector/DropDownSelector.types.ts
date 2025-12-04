export interface DropDownSelectorProps {
  btnLabel: string;
  options: string[];
  selectedOption: string;
  onChange: (value: string) => void;
  btnCSSClass?: string;
  dropdownCSSClass?: string;
  optionCSSClass?: string;
}
