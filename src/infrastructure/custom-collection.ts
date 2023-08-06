export interface ICustomCollection<T> {

    isEmpty(): boolean;

    pop(): T | null;

    push(value: T): void;

    peek(): T | null;

    clear(): void;

    getAt(index: number): T;

    get length(): number;
}

export class CustomCollection<T> implements ICustomCollection<T> {
    constructor(private readonly collection: T[] = []) { }

    isEmpty(): boolean {
        return this.length === 0;
    }

    pop(): T | null {
        if (this.isEmpty()) {
            return null;
        }
        return this.collection.pop()!;
    }

    push(value: T) {
        this.collection.push(value);
    }

    peek(): T | null {
        if (this.isEmpty()) {
            return null;
        }

        return this.collection[this.length - 1];
    }

    clear() {
        this.collection.length = 0;
    }

    getAt(index: number): T {
        if ((index < 0) || (index >= this.length)) {
            throw new Error("不正なインデックスが指定されました")
        }
        return this.collection[index];
    }

    get length(): number {
        return this.collection.length;
    }
}
