export interface Option {
  label: string;
  value: number;
}

export interface SelectProps {
  options: Option[];
  onExpanded?: () => void;
}
