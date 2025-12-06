export interface SearchFormProps {
  onSearch: (value: string) => void;
  initValue?: string;
  className?: string | null;
  placeholder?: string;
}

export interface SearchFormValues {
  topic: string;
}
