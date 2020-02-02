define(["require", "exports", "../graphics/Point", "./Tile", "../util", "../graphics/Screen"], function (require, exports, Point_1, Tile_1, util_1, Screen_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameMap {
        constructor(size, ctx) {
            this.sz = size;
            this.ctx = ctx;
            util_1.defined(this.sz);
            util_1.defined(this.ctx);
            var nP = (size - 1) / 2;
            var nP2 = (size - 2) / 2;
            var tiles = [];
            for (var j = 0; j < size; j++) {
                var addition = -Math.abs(j - nP) + nP;
                for (var i = -addition; i < size + addition; i++) {
                    tiles.push(new Tile_1.Tile(new Point_1.HexPoint(2 * j, 2 * i)));
                }
            }
            for (var j = 0; j < size - 1; j++) {
                var addition = -Math.abs(j - nP2) + nP2;
                for (var i = -addition; i <= size + addition; i++) {
                    tiles.push(new Tile_1.Tile(new Point_1.HexPoint(2 * j + 1, 2 * i - 1)));
                }
            }
            this.tilesArr = tiles;
            util_1.defined(this.tilesArr);
            this.settlementsArr = [];
        }
        getTiles() {
            return this.tilesArr;
        }
        getSettlements() {
            return this.settlementsArr;
        }
        getCtx() {
            return this.ctx;
        }
        isAllowedSettlement(h) {
            console.log("new?", h);
            var conflicts = this.settlementsArr.filter(s => {
                console.log("check", s.getHexPoint());
                var hp = s.getHexPoint();
                if (hp.x == h.x && hp.y == h.y) {
                    return true;
                }
                if (hp.x == h.x && hp.y == h.y + 1) {
                    return true;
                }
                if (hp.x == h.x && hp.y == h.y - 1) {
                    return true;
                }
                if (h.x % 2 == h.y % 2) {
                    // check right
                    if (hp.x == h.x + 1 && hp.y == h.y) {
                        return true;
                    }
                }
                else {
                    // check left
                    if (hp.x == h.x - 1 && hp.y == h.y) {
                        return true;
                    }
                }
                return false;
            });
            return conflicts.length == 0; // allowed if no conflicts
        }
        addSettlement(s) {
            util_1.defined(s);
            this.settlementsArr.push(s);
        }
        draw() {
            this.ctx.clearRect(0, 0, Screen_1.canvas.width, Screen_1.canvas.height);
            this.ctx.fillStyle = 'blue';
            this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            this.tilesArr.forEach(e => {
                e.fillTile(this.ctx);
            });
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 1;
            this.tilesArr.forEach(e => {
                e.strokeTile(this.ctx);
            });
            this.settlementsArr.forEach(s => {
                s.draw(this.ctx);
            });
        }
    }
    exports.GameMap = GameMap;
});
//# sourceMappingURL=GameMap.js.map