/*
 * App-wide config goes here
 */

export class Config {
    private static n = 6;

    static getN() {
        return this.n;
    }

    private constructor() {}
}