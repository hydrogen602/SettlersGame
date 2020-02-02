import { HexPoint } from "../graphics/Point";
import { defined } from "../util";
import { Player } from "../mechanics/Player";

export class Road {
    private p1: HexPoint;
    private p2: HexPoint;
    // two endpoints of the line

    private owner: Player;

    constructor(p1: HexPoint, p2: HexPoint, owner: Player) {
        this.p1 = p1;
        this.p2 = p2;
        this.owner = owner;

        defined(p1);
        defined(p2);
        defined(owner);
    }

    draw(ctx: CanvasRenderingContext2D) {
        console.log("drawing")
        ctx.strokeStyle = "black";
        ctx.lineWidth = 14;
        ctx.beginPath();
        var tmp1 = this.p1.toRelPoint();
        var tmp2 = this.p2.toRelPoint();
        ctx.moveTo(tmp1.x, tmp1.y);
        ctx.lineTo(tmp2.x, tmp2.y);
        ctx.stroke();

        ctx.strokeStyle = this.owner.getColor();
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(tmp1.x, tmp1.y);
        ctx.lineTo(tmp2.x, tmp2.y);
        ctx.stroke();

    }

}