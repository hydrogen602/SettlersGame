import { defined } from "../util";
import { Settlement } from "../map/Settlement";

export class Player {
    private color: string;
    private settlements: Array<Settlement>;

    constructor(color: string) {
        this.color = color;
        this.settlements = [];
        defined(color);
    }

    getColor() {
        return this.color;
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