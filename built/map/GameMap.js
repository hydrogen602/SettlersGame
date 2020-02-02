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
            this.roadsArr = [];
        }
        getTiles() {
            return this.tilesArr;
        }
        getSettlements() {
            return this.settlementsArr;
        }
        getRoads() {
            return this.roadsArr;
        }
        getCtx() {
            return this.ctx;
        }
        isAllowedSettlement(h) {
            // console.log("new?", h)
            var conflicts = this.settlementsArr.filter(s => {
                // console.log("check", s.getHexPoint())
                var hp = s.getHexPoint();
                return h.isNeighbor(hp) || h.isEqual(hp);
            });
            return conflicts.length == 0; // allowed if no conflicts
        }
        isAllowedRoad(p1, p2) {
            if (!p1.isNeighbor(p2) || p1.isEqual(p2)) {
                // if the points aren't adjacent or are the same, do not allow
                return false;
            }
            var conflicts = this.roadsArr.filter(r => {
                return r.isEqual(p1, p2);
            });
            return conflicts.length == 0;
        }
        addSettlement(s) {
            util_1.defined(s);
            this.settlementsArr.push(s);
        }
        addRoad(r) {
            util_1.defined(r);
            this.roadsArr.push(r);
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
            this.roadsArr.forEach(r => {
                r.draw(this.ctx);
            });
            this.settlementsArr.forEach(s => {
                s.draw(this.ctx);
            });
        }
    }
    exports.GameMap = GameMap;
});
//# sourceMappingURL=GameMap.js.map