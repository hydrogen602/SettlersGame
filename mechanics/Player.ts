import { defined, assertInt } from "../util";
import { Settlement } from "../map/Settlement";
import { ResourceType } from "../dataTypes";
import { Road } from "../map/Road";
import { StatusBar } from "../graphics/StatusBar";
import { ctx } from "../graphics/Screen";
import { RelPoint } from "../graphics/Point";
import { GameManager } from "./GameManager";

export class Player {
    private color: string;
    private settlements: Array<Settlement> = [];
    private roads: Array<Road> = [];
    private name: string;
    private inventory: Map<ResourceType, number>;

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
            if (Number(i).toString() != "NaN" && i != '0') { // '0' is Desert -> NoResource
                // js is retarded    /\
                // for thinking that ||
                // NaN == NaN is false
                //
                this.inventory.set(Number(i), 0);
            }
        }

        this.invBoard = new StatusBar(ctx, 6, new RelPoint(window.innerWidth - 250 - 5, 5 + 6 * 30 * Player.playerCount));
        Player.playerCount += 1;

        defined(this.invBoard);
        this.updateInvBoard();
    }

    getRoads() {
        return this.roads;
    }

    getSettlements() {
        return this.settlements;
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
        const currAmount = this.inventory.get(r);
        defined(currAmount);

        this.inventory.set(r, amount + <number>currAmount);

        this.updateInvBoard();
    }

    purchaseRoad() {
        console.log(1)
        if (GameManager.instance.getCurrentPlayer() != this) {
            throw "Not this player's turn";
        }
        // requires brick and lumber
        if (this.getFromInv(ResourceType.Brick) >= 1 && this.getFromInv(ResourceType.Lumber)) {
            // new road!

        }
        else {
            GameManager.instance.printErr("Can't afford road");
        }
    }

    private getFromInv(r: ResourceType): number {
        const x = this.inventory.get(r);
        defined(x);
        return <number>x;
    }

    private updateInvBoard() {
        this.invBoard.clear();
        this.invBoard.print(this.name);

        const iterator = this.inventory.keys()
        let k: IteratorResult<ResourceType, any>;
        while ((x => { k = x.next(); return !k.done })(iterator)) {
            // console.log(k.value);
            this.invBoard.print(ResourceType[k.value] + ": " + this.inventory.get(k.value));
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