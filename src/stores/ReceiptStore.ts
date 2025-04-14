export interface ReceiptStore {
    save(id: string, points: number): void;
    get(id: string): number | undefined;
    has(id: string): boolean;
}