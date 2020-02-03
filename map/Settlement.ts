import { HexPoint, RelPoint } from "../graphics/Point";
import { defined, assertInt } from "../util";
import { Hex } from "../graphics/Hex";
import { Player } from "../mechanics/Player";
import { ResourceType } from "../dataTypes";

export class Settlement {
    private p: HexPoint;
    private owner: Player;

    constructor(location: HexPoint, owner: Player) {
        this.p = location;
        this.owner = owner;
        defined(this.p);
        defined(this.owner);

        this.owner.addSettlement(this);
    }

    getHexPoint() {
        return this.p;
    }

    isHere(h: HexPoint) {
        return h.isEqual(this.p);
    }

    production(r: ResourceType) {
        this.owner.giveResource(r, 1); // 2 if city
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.beginPath();
        const relLoc = this.p.toRelPoint();


        ctx.arc(relLoc.x, relLoc.y, Hex.getSideLength() / 4, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle = this.owner.getColor();
        ctx.arc(relLoc.x, relLoc.y, Hex.getSideLength() / 4 - 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    static stroke(loc: RelPoint, ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(loc.x, loc.y, Hex.getSideLength() / 4, 0, 2 * Math.PI);
        ctx.stroke();
    }
}