import { Biome, biomeDistributionArray } from "./Biome";
import { assert } from "../util";
import { Point } from "../graphics/Point"
import { Hex } from "../graphics/Hex"

export class Tile {
    private p: Point;
    private landType: Biome;
    private diceValue: number;

    constructor(location: Point, landType?: Biome, diceValue?: number) {
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
        ctx.fillStyle = this.landType.getColor();
        
        Hex.fillHex(this.p.y, this.p.x, ctx);
    }
}
