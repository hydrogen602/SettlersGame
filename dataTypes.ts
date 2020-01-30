
import grid = require("./grid");
import { assert } from "./util";

export enum ResourceType {
    /* 
     * Weights specify likeliness for a tile to be of a certain type
     * sum = 19
     * 
     * These numbers are based on a n=3 map, which has 19 tiles like the board game version
     */

    Desert = 1, // 1
    Grassland,  // 4
    Forest,     // 4
    Mountain,   // 3
    Farmland,   // 4
    Quarry      // 3
}

export class Tile {
    p: grid.Point;
    resourceType: ResourceType;
    diceValue: number;

    constructor(location: grid.Point, resource: ResourceType, diceValue: number) {
        assert(parseInt(diceValue.toString()) == diceValue, "diceValue should be an integer")

        this.p = location;
        this.resourceType = resource;
        this.diceValue = diceValue;
    }

    strokeTile(ctx: CanvasRenderingContext2D) {
        if (this.resourceType == ResourceType.Forest) {
            ctx.strokeStyle = "green";
        }
        if (this.resourceType == ResourceType.Quarry) {
            ctx.strokeStyle = "red";
        }
        grid.strokeHex(this.p.y + grid.y, this.p.x + grid.x, ctx);
    }
}