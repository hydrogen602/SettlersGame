import { Biome, biomeDistributionArray, Desert } from "./Biome";
import { assert, defined } from "../util";
import { HexPoint, AbsPoint } from "../graphics/Point"
import { Hex } from "../graphics/Hex"

export class Tile {
    private p: HexPoint;
    private landType: Biome;
    private diceValue: number;
    private center: AbsPoint;

    constructor(location: HexPoint, landType?: Biome, diceValue?: number) {
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

    fillTile(ctx: CanvasRenderingContext2D) { // TODO: combine fillTile and strokeTile into one draw method
        ctx.fillStyle = this.landType.getColor();
        
        Hex.fillHex(this.p.y, this.p.x, ctx);

        var relCenter = this.center.toRelPoint();

        if (this.landType != Desert) {
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "black";
            ctx.fillText(this.diceValue.toString(), relCenter.x, relCenter.y);
        }
    }

    strokeTile(ctx: CanvasRenderingContext2D) {
        Hex.strokeHex(this.p.y, this.p.x, ctx);
    }

    // this method is from http://www.playchilla.com/how-to-check-if-a-point-is-inside-a-hexagon
    isInside(pos: AbsPoint): boolean
    {
        // vertical = apothem
        const q2x: number = Math.abs(pos.x - this.center.x);
        const q2y: number = Math.abs(pos.y - this.center.y);

        const vert = Hex.getApothem();
        const hori = Hex.getSideLength() / 2;

        if (q2x > hori*2 || q2y > vert) return false;
        return vert * 2 * hori - vert * q2x - 2* hori * q2y >= 0;
    }
}
