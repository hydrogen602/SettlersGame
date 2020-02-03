import { defined, assertInt } from "../util";
import { Settlement } from "../map/Settlement";
import { ResourceType } from "../dataTypes";
import { Road } from "../map/Road";

export class Player {
    private color: string;
    private settlements: Array<Settlement> = [];
    private roads: Array<Road> = [];
    private name: string;
    private inventory: Map<String, number>;

    constructor(color: string, name: string) {
        this.color = color;
        this.name = name;
        this.settlements = [];
        defined(color);
        defined(name);

        this.inventory = new Map()
        for (let i in ResourceType) {
            if (Number(i).toString() == "NaN" && i != ResourceType[ResourceType.NoResource]) {
                // js is retarded    /\
                // for thinking that ||
                // NaN == NaN is false
                //
                this.inventory.set(i, 0);
            }
        }
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

    addRoad(r: Road) {
        this.roads.push(r);
    }

    giveResource(r: ResourceType, amount: number) {
        assertInt(amount);
        const name = ResourceType[r];
        const currAmount = this.inventory.get(name);
        defined(currAmount);

        this.inventory.set(name, amount + <number>currAmount);
    }

    debug() {
        console.log(this)
        this.settlements.forEach(e => {
            console.log("  ", e)
        });
        console.log("  Inv:", this.inventory);
    }
}