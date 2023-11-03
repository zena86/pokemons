export interface HookRespond {
  content: unknown;
  isLoading: boolean;
  errorMessage: string;
}

export interface LoaderContentProps {
  respond: HookRespond;
  children: JSX.Element;
}
