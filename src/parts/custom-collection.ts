export class CustomCollection<T> {
    constructor(private readonly collection: T[] = []) {}

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

    toArray(): T[] {
        return [...this.collection];
    }

    get length(): number {
        return this.collection.length;
    }
}
