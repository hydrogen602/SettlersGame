
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
