/*
 * App-wide config goes here
 */

export class Config {
    private static n = 3;

    static getN() {
        return this.n;
    }

    private constructor() {}
}

// time spent check
// Coding: 86 min + 225 min + 230 min + 146 min + 86 min = 773 min
// Stackoverflow: 36 min
// GitHub: 31 min + 15 min
//
// Total: 855 min = 14h 15min
// As of the commit that added this
