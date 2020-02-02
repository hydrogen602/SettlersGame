import { HexPoint } from "../graphics/Point";
import { defined } from "../util";
import { Hex } from "../graphics/Hex";
import { Player } from "../mechanics/Player";

export class Settlement {
    private p: HexPoint;
    private owner: Player;

    constructor(location: HexPoint, owner: Player) {
        this.p = location;
        this.owner = owner;
        defined(this.p);
        defined(this.owner);
    }

    getHexPoint() {
        return this.p;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.beginPath();
        var relLoc = this.p.toRelPoint();


        ctx.arc(relLoc.x, relLoc.y, Hex.getSideLength() / 4, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = this.owner.getColor();
        ctx.arc(relLoc.x, relLoc.y, Hex.getSideLength() / 4 - 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}