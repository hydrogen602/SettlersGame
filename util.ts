
export function assert(condition: boolean, message?: string) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

export function defined(condition: any) {
    if (condition == undefined) {
        throw "Variable undefined";
    }
}

export function square(n: number) {
    return n * n
}

export function assertInt(n: number) {
    if (!Number.isInteger(n)) {
        throw "TypeError: expected int";
    }
}

export function randomInt(high: number, low?: number) {
    if (low == undefined) {
        low = 0;
    }
    assertInt(high);
    assertInt(low);
    return Math.floor(Math.random() * (high - low) + low);
}

export function rollTwoDice() {
    return randomInt(7, 1) + randomInt(7, 1) // high limit (7) is excluded
}
