define(["require", "exports", "../map/Biome", "../util"], function (require, exports, Biome_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Robber {
        constructor(tiles) {
            this.place = tiles[0];
            let found = false;
            for (const k of tiles) {
                if (k.getLandType() == Biome_1.Desert) {
                    this.place = k;
                    found = true;
                    break;
                }
            }
            if (!found) {
                const randoKey = util_1.randomInt(tiles.length);
                this.place = tiles[randoKey];
            }
            util_1.defined(this.place);
            this.place.arriveRobber();
        }
        getTile() {
            return this.place;
        }
        moveTo(t) {
            this.place.departRobber();
            this.place = t;
            this.place.arriveRobber();
        }
    }
    exports.Robber = Robber;
});
//# sourceMappingURL=Robber.js.map