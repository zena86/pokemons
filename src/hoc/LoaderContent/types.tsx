export interface HookRespond {
  content: unknown;
  isLoading: boolean;
  errorMessage: string;
}

export interface LoaderContentProps {
  isLoading: boolean;
  errorMessage: string;
  children: JSX.Element;
}
