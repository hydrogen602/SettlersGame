define(["require", "exports", "./GameManager", "../map/Biome", "../util"], function (require, exports, GameManager_1, Biome_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Robber {
        constructor() {
            const tiles = GameManager_1.GameManager.instance.getMap().getTiles();
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
        }
    }
    exports.Robber = Robber;
});
//# sourceMappingURL=Robber.js.map