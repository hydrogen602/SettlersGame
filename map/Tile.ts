import { Biome, biomeDistributionArray, Desert } from "./Biome";
import { assert, defined, assertInt } from "../util";
import { HexPoint, AbsPoint } from "../graphics/Point"
import { Hex } from "../graphics/Hex"

export class Tile {
    private p: HexPoint;
    private landType: Biome;
    private diceValue: number;
    private center: AbsPoint;

    private static diceValueChoices = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 9, 10, 10, 11, 11, 12];

    constructor(location: HexPoint, landType?: Biome, diceValue?: number) {
        if (diceValue) {
            assertInt(diceValue)
            this.diceValue = diceValue;
        } else {
            // diceValue should be 2 <= n <= 12 && n != 7
            // distribution:
            //      2 3 3 4 4 5 5 6 6 8 8  9  9  9  10 10 11 11 12
            //      | | | | | | | | | | |  |  |  |  |  |  |  |  |
            //      0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18
            // out of 19
            this.diceValue = Tile.diceValueChoices[parseInt(Math.random() * 19 + '')];
        }

        if (landType) {
            this.landType = landType;
        } else {
            this.landType = biomeDistributionArray[parseInt(Math.random() * 19 + '')];
        }

        if (this.landType == Desert) {
            this.diceValue = 0;
        }

        this.p = location;
        this.center = Hex.getCenterOfHex(location.y, location.x); // flip on purpose

        defined(this.diceValue);
        defined(this.landType);
        defined(this.p);
        defined(this.center);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.landType.getColor();
        
        Hex.fillHex(this.p.y, this.p.x, ctx);

        const relCenter = this.center.toRelPoint();

        if (this.landType != Desert) {
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.fillText(this.diceValue.toString(), relCenter.x, relCenter.y);
        }
        
        Hex.strokeHex(this.p.y, this.p.x, ctx);
    }
}
