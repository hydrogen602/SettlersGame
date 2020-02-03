define(["require", "exports", "../graphics/Point", "./Tile", "../util", "../graphics/Screen", "../mechanics/GameManager"], function (require, exports, Point_1, Tile_1, util_1, Screen_1, GameManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameMap {
        // offset of map on screen in order to move around the map
        // currLocation: RelPoint;
        constructor(size, ctx) {
            this.sz = size;
            this.ctx = ctx;
            util_1.defined(this.sz);
            util_1.defined(this.ctx);
            const nP = (size - 1) / 2;
            const nP2 = (size - 2) / 2;
            this.tilesArr = [];
            for (let j = 0; j < size; j++) {
                const addition = -Math.abs(j - nP) + nP;
                for (let i = -addition; i < size + addition; i++) {
                    this.tilesArr.push(new Tile_1.Tile(new Point_1.HexPoint(2 * j, 2 * i)));
                }
            }
            for (let j = 0; j < size - 1; j++) {
                const addition = -Math.abs(j - nP2) + nP2;
                for (let i = -addition; i <= size + addition; i++) {
                    this.tilesArr.push(new Tile_1.Tile(new Point_1.HexPoint(2 * j + 1, 2 * i - 1)));
                }
            }
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
            const conflicts = this.settlementsArr.filter(s => {
                // console.log("check", s.getHexPoint())
                const hp = s.getHexPoint();
                return h.isNeighbor(hp) || h.isEqual(hp);
            });
            return conflicts.length == 0; // allowed if no conflicts
        }
        isAllowedRoad(p1, p2) {
            if (!p1.isNeighbor(p2) || p1.isEqual(p2)) {
                // if the points aren't adjacent or are the same, do not allow
                return false;
            }
            // next to road or settlement owned
            const currPlayer = GameManager_1.GameManager.instance.getCurrentPlayer();
            let permitted = false;
            currPlayer.getSettlements().forEach(s => {
                const settlementLoc = s.getHexPoint();
                if (settlementLoc.isEqual(p1) || settlementLoc.isEqual(p2)) {
                    permitted = true;
                }
            });
            if (!permitted) {
                currPlayer.getRoads().forEach(r => {
                    if (r.isAdjacent(p1) || r.isAdjacent(p2)) {
                        permitted = true;
                    }
                });
            }
            if (!permitted) {
                return false;
            }
            const conflicts = this.roadsArr.filter(r => {
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
        draw_SHOULD_ONLY_BE_CALLED_BY_GAME_MANAGER() {
            this.ctx.clearRect(0, 0, Screen_1.canvas.width, Screen_1.canvas.height);
            this.ctx.fillStyle = 'blue';
            this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = 1;
            this.tilesArr.forEach(e => {
                e.draw(this.ctx);
            });
            this.tilesArr.forEach(e => {
                e.highlightIfActive(this.ctx);
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