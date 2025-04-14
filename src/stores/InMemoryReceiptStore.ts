import { ReceiptStore } from "./ReceiptStore";

const store = new Map<string, number>();

export const InMemoryReceiptStore: ReceiptStore = {
    save(id, points) {
        store.set(id, points);
    },
    get(id) {
        return store.get(id);
    },
    has(id) {
        return store.has(id);
    }
};