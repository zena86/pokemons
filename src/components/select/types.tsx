export interface Option {
  label: string;
  value: number;
}

export interface SelectProps {
  options: Option[];
  // onChange: (selectedOption: Option, prevOption?: Option | undefined) => void;
  onExpanded?: () => void;
}
