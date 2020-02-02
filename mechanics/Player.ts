import { defined } from "../util";
import { Settlement } from "../map/Settlement";

export class Player {
    private color: string;
    private settlements: Array<Settlement>;
    private name: string;

    constructor(color: string, name: string) {
        this.color = color;
        this.name = name;
        this.settlements = [];
        defined(color);
        defined(name);
    }

    getColor() {
        return this.color;
    }

    getName() {
        return this.name;
    }

    addSettlement(s: Settlement) {
        this.settlements.push(s);
    }

    debug() {
        console.log(this)
        this.settlements.forEach(e => {
            console.log("  ", e)
        })
    }
}