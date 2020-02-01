import { Biomes } from "../dataTypes";
import { assert } from "../util";
import grid = require("../grid");

export class Tile {
    p: grid.Point;
    landType: Biomes;
    diceValue: number;

    constructor(location: grid.Point, landType: Biomes, diceValue: number) {
        assert(parseInt(diceValue.toString()) == diceValue, "diceValue should be an integer")

        this.p = location;
        this.landType = landType;
        this.diceValue = diceValue;
    }

    strokeTile(ctx: CanvasRenderingContext2D) {
        if (this.landType == Biomes.Forest) {
            ctx.strokeStyle = "green";
        }
        if (this.landType == Biomes.Quarry) {
            ctx.strokeStyle = "red";
        }
        grid.strokeHex(this.p.y + grid.y, this.p.x + grid.x, ctx);
    }
}
