
import grid = require("./grid");
import { assert } from "./util";

export enum Biomes {
    /* 
     * Weights specify likeliness for a tile to be of a certain type
     * sum = 19
     * 
     * These numbers are based on a n=3 map, which has 19 tiles like the board game version
     */

    Desert = 0, // 1
    Grassland,  // 4
    Forest,     // 4
    Mountain,   // 3
    Farmland,   // 4
    Quarry      // 3
}

export enum ResourceType {
    NoResource = 0,
    Sheep,
    Lumber,
    Ore,
    Wheat,
    Brick
}

export const resourceTypeByBiome: Map<Biomes, ResourceType> = new Map(
    [
        [Biomes.Desert, ResourceType.NoResource],
        [Biomes.Grassland, ResourceType.Sheep],
        [Biomes.Forest, ResourceType.Lumber],
        [Biomes.Mountain, ResourceType.Ore],
        [Biomes.Farmland, ResourceType.Wheat],
        [Biomes.Quarry, ResourceType.Brick]
    ]
);

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