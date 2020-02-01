
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
