import { ReceiptStore } from './ReceiptStore';

let store: ReceiptStore | null = null;

export function setStore(s: ReceiptStore) {
  store = s;
}

export function getStore(): ReceiptStore {
  if (!store) {
    throw new Error('ReceiptStore has not been initialized.');
  }
  return store;
}