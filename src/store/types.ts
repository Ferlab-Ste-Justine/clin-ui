import { GlobalInitialState } from 'store/global';

export type RootState = {
  global: GlobalInitialState;
};

type DispatchType = {
  type: string;
  payload: any[];
};

export type StoreType = {
  dispatch: (args: DispatchType) => void;
};
