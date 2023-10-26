export interface IErrorButtonProps {
  type?: 'submit' | 'reset' | 'button' | undefined;
  title: string;
  onClick: () => void;
}
