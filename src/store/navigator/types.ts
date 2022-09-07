import { ReactNode } from 'react';

export interface InitialStateInterface {
  isLoading: boolean;
  page: null | ReactNode;
  props: any;
  error: any;
}
