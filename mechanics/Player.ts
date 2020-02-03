import { defined, assertInt } from "../util";
import { Settlement } from "../map/Settlement";
import { ResourceType } from "../dataTypes";
import { Road } from "../map/Road";
import { StatusBar } from "../graphics/StatusBar";
import { ctx } from "../graphics/Screen";
import { RelPoint } from "../graphics/Point";

export class Player {
    private color: string;
    private settlements: Array<Settlement> = [];
    private roads: Array<Road> = [];
    private name: string;
    private inventory: Map<String, number>;

    private invBoard: StatusBar;

    private static playerCount = 0;

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

        this.invBoard = new StatusBar(ctx, 6, new RelPoint(window.innerWidth - 250 - 5, 5 + 6 * 30 * Player.playerCount));
        Player.playerCount += 1;

        defined(this.invBoard);
        this.updateInvBoard();
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

        this.updateInvBoard();
    }

    private updateInvBoard() {
        this.invBoard.clear();
        this.invBoard.print(this.name);

        const iterator = this.inventory.keys()
        let k: IteratorResult<String, any>;
        while ((x => { k = x.next(); return !k.done })(iterator)) {
            console.log(k.value);
            this.invBoard.print(k.value + ": " + this.inventory.get(k.value));
        }     
    }

    draw() {
        this.invBoard.draw();
    }

    debug() {
        console.log(this)
        this.settlements.forEach(e => {
            console.log("  ", e)
        });
        console.log("  Inv:", this.inventory);
    }
}