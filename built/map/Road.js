define(["require", "exports", "../util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Road {
        constructor(p1, p2, owner) {
            this.p1 = p1;
            this.p2 = p2;
            this.owner = owner;
            util_1.defined(p1);
            util_1.defined(p2);
            util_1.defined(owner);
            this.owner.addRoad(this);
        }
        isEqual(p1, p2) {
            if (p1.isEqual(this.p1) && p2.isEqual(this.p2)) {
                return true;
            }
            if (p1.isEqual(this.p2) && p2.isEqual(this.p1)) {
                return true;
            }
            return false;
        }
        isAdjacent(p) {
            if (p.isEqual(this.p1) || p.isEqual(this.p2)) {
                return true;
            }
            return false;
        }
        draw(ctx) {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 14;
            ctx.beginPath();
            const tmp1 = this.p1.toRelPoint();
            const tmp2 = this.p2.toRelPoint();
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
        static stroke(tmp1, tmp2, ctx) {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 14;
            ctx.beginPath();
            ctx.moveTo(tmp1.x, tmp1.y);
            ctx.lineTo(tmp2.x, tmp2.y);
            ctx.stroke();
        }
    }
    exports.Road = Road;
});
//# sourceMappingURL=Road.js.map