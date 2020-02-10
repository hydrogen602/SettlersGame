import { HexPoint } from "../graphics/Point";
import { GameManager } from "./GameManager";
import { Desert } from "../map/Biome";
import { randomInt, defined } from "../util";
import { Tile } from "../map/Tile";

export class Robber {

    private place: Tile;

    constructor() {
        const tiles = GameManager.instance.getMap().getTiles();
        this.place = tiles[0];

        let found = false;
        for (const k of tiles) {
            if (k.getLandType() == Desert) {
                this.place = k;
                found = true;
                break
            }
        }

        if (!found) {
            const randoKey = randomInt(tiles.length);
            this.place = tiles[randoKey];
        }

        defined(this.place);
    }

    // draw() {} handled by Tile

}