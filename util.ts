
export function assert(condition: boolean, message?: string) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}

export function defined(condition: any) {
    if (!condition) {
        throw "Variable undefined";
    }
}
