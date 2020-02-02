define(["require", "exports", "../util", "../graphics/Hex"], function (require, exports, util_1, Hex_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Settlement {
        constructor(location, owner) {
            this.p = location;
            this.owner = owner;
            util_1.defined(this.p);
            util_1.defined(this.owner);
        }
        getHexPoint() {
            return this.p;
        }
        draw(ctx) {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.beginPath();
            var relLoc = this.p.toRelPoint();
            ctx.arc(relLoc.x, relLoc.y, Hex_1.Hex.getSideLength() / 4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = this.owner.getColor();
            ctx.arc(relLoc.x, relLoc.y, Hex_1.Hex.getSideLength() / 4 - 2, 0, 2 * Math.PI);
            ctx.fill();
        }
        static stroke(loc, ctx) {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(loc.x, loc.y, Hex_1.Hex.getSideLength() / 4, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }
    exports.Settlement = Settlement;
});
//# sourceMappingURL=Settlement.js.map