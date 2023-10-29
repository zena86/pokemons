export interface ErrorButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  title: string;
  onClick: () => void;
}
