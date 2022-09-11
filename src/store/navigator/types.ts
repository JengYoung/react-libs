import { ReactNode } from 'react';

export interface InitialStateInterface {
  isLoading: boolean;
  prevPages: ReactNode[];
  nowPage: ReactNode | null;
}
