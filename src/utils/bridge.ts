import { bridgeOrigin } from 'utils/config';
import {StoreType} from 'store/types'

export const createPrescription = () => {
  window.parent.postMessage({ action: 'createNewPrescription' }, window.origin);
};

export const createNanuqReport = (e: React.ChangeEvent) => {
  window.parent.postMessage({ action: 'createNanuqReport' }, window.origin);
};

export const redirectParent = (path: string) => {
  /* eslint no-restricted-globals: ["off"] */
  if (top && top.window) {
    // iframe support
    top.window.location.href = `${bridgeOrigin}${path}`;
  } else {
    window.location.href = `${path}`;
  }
};

type CallBackType = (e: MessageEvent) => void;

export class Bridge {
  private store: StoreType;
  private channel: Window;

  constructor(store: StoreType, ref: Window) {
    this.store = store;
    this.channel = ref;
  }

  register(action: string, callback: CallBackType): void {
    this.channel?.addEventListener('message', (e): void => {
      console.log('!!!!!**** message bridge clin', e)
      if (e.origin !== window.origin || action !== e.data.action) {
        return;
      }
      callback(e);
    });
  }

  remove(callback: CallBackType): void {
    this.channel?.removeEventListener('message', callback, false);
  }
}
