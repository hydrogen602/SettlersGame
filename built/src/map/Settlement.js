define(["require", "exports", "../util", "../graphics/Hex"], function (require, exports, util_1, Hex_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Settlement {
        constructor(location, owner) {
            this._isCity = false;
            this.p = location;
            this.owner = owner;
            util_1.defined(this.p);
            util_1.defined(this.owner);
            this.owner.addSettlement(this);
        }
        getHexPoint() {
            return this.p;
        }
        isCity() {
            return this._isCity;
        }
        upgrade() {
            if (this._isCity) {
                throw "This already is a city";
            }
            this._isCity = true;
        }
        isHere(h) {
            return h.isEqual(this.p);
        }
        production(r) {
            if (this._isCity) {
                this.owner.giveResource(r, 2); // 2 if city
            }
            else {
                this.owner.giveResource(r, 1);
            }
        }
        draw(ctx) {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.fillStyle = this.owner.getColor();
            const relLoc = this.p.toRelPoint();
            // is city
            if (this._isCity) {
                const apo = Hex_1.Hex.getSideLength() / 3.5 + 2;
                //      xStep
                //     |---
                // apo | /
                //     |/
                //
                // tan(30) = xStep / apo
                const xStep = 0.5773502691896257 * apo; //Math.tan(Math.PI / 6) * apo;
                ctx.beginPath();
                ctx.moveTo(relLoc.x + xStep, relLoc.y - apo);
                ctx.lineTo(relLoc.x + 2 * xStep, relLoc.y);
                ctx.lineTo(relLoc.x + xStep, relLoc.y + apo);
                ctx.lineTo(relLoc.x - xStep, relLoc.y + apo);
                ctx.lineTo(relLoc.x - 2 * xStep, relLoc.y);
                ctx.lineTo(relLoc.x - xStep, relLoc.y - apo);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(relLoc.x + xStep, relLoc.y - apo);
                ctx.lineTo(relLoc.x + 2 * xStep, relLoc.y);
                ctx.lineTo(relLoc.x + xStep, relLoc.y + apo);
                ctx.lineTo(relLoc.x - xStep, relLoc.y + apo);
                ctx.lineTo(relLoc.x - 2 * xStep, relLoc.y);
                ctx.lineTo(relLoc.x - xStep, relLoc.y - apo);
                ctx.closePath();
                ctx.stroke();
            }
            else {
                ctx.beginPath();
                ctx.arc(relLoc.x, relLoc.y, Hex_1.Hex.getSideLength() / 4, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(relLoc.x, relLoc.y, Hex_1.Hex.getSideLength() / 4 - 2, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        static stroke(loc, ctx) {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(loc.x, loc.y, Hex_1.Hex.getSideLength() / 4, 0, 2 * Math.PI);
            ctx.stroke();
        }
        static strokeCity(relLoc, ctx) {
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 4;
            const apo = Hex_1.Hex.getSideLength() / 3 + 2;
            const xStep = Math.tan(Math.PI / 6) * apo;
            ctx.beginPath();
            ctx.moveTo(relLoc.x + xStep, relLoc.y - apo);
            ctx.lineTo(relLoc.x + 2 * xStep, relLoc.y);
            ctx.lineTo(relLoc.x + xStep, relLoc.y + apo);
            ctx.lineTo(relLoc.x - xStep, relLoc.y + apo);
            ctx.lineTo(relLoc.x - 2 * xStep, relLoc.y);
            ctx.lineTo(relLoc.x - xStep, relLoc.y - apo);
            ctx.closePath();
            ctx.stroke();
        }
    }
    exports.Settlement = Settlement;
});
//# sourceMappingURL=Settlement.js.map