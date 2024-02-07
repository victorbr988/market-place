import { ReactNode } from "react";

interface IViewControl {
  PageContent: ReactNode;
  Fallback: ReactNode;
  isLoading: boolean;
}

export function ViewControl({ PageContent, Fallback, isLoading }: IViewControl) {
  return isLoading ? Fallback : PageContent
}