import { Biomes, biomeDistributionArray } from "../dataTypes";
import { assert } from "../util";
import grid = require("../grid");

export class Tile {
    p: grid.Point;
    landType: Biomes;
    diceValue: number;

    constructor(location: grid.Point, landType?: Biomes, diceValue?: number) {
        if (diceValue) {
            assert(parseInt(diceValue.toString()) == diceValue, "diceValue should be an integer");
            this.diceValue = diceValue;
        } else {
            // diceValue should be 2 <= n <= 12 && n != 7
            // distribution:
            //      2 3 3 4 4 5 5 6 6 8 8  9  9  9  10 10 11 11 12
            //      | | | | | | | | | | |  |  |  |  |  |  |  |  |
            //      0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18
            // out of 19
            var r = parseInt(Math.random() * 19 + '');
            var choices = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 9, 10, 10, 11, 11, 12];
            this.diceValue = choices[r];
        }

        if (landType) {
            this.landType = landType;
        } else {
            var r = parseInt(Math.random() * 19 + '');
            this.landType = biomeDistributionArray[r];
        }

        this.p = location;

        assert(Boolean(this.diceValue))
        assert(Boolean(this.landType))
        assert(Boolean(this.p))
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
