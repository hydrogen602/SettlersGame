import { defined } from "../util";

export class Player {
    private color: string;

    constructor(color: string) {
        this.color = color;
        defined(color);
    }

    getColor() {
        return this.color;
    }
}