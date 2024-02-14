import { ReactNode } from "react";

interface IViewControl {
  PageContent: ReactNode;
  Fallback: ReactNode;
  isLoading: boolean;
  totalRegisters?: number;
  EmptyComponent?: ReactNode;
}

export function ViewControl({ PageContent, Fallback, isLoading, totalRegisters = 1, EmptyComponent = 0 }: IViewControl) {
  return isLoading
    ? Fallback
    : (
      totalRegisters === 0
        ? EmptyComponent
        : PageContent
    )
}