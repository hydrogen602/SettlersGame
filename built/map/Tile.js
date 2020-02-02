define(["require", "exports", "./Biome", "../util", "../graphics/Hex"], function (require, exports, Biome_1, util_1, Hex_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Tile {
        constructor(location, landType, diceValue) {
            if (diceValue) {
                util_1.assertInt(diceValue);
                this.diceValue = diceValue;
            }
            else {
                // diceValue should be 2 <= n <= 12 && n != 7
                // distribution:
                //      2 3 3 4 4 5 5 6 6 8 8  9  9  9  10 10 11 11 12
                //      | | | | | | | | | | |  |  |  |  |  |  |  |  |
                //      0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18
                // out of 19
                this.diceValue = Tile.diceValueChoices[parseInt(Math.random() * 19 + '')];
            }
            if (landType) {
                this.landType = landType;
            }
            else {
                this.landType = Biome_1.biomeDistributionArray[parseInt(Math.random() * 19 + '')];
            }
            if (this.landType == Biome_1.Desert) {
                this.diceValue = 0;
            }
            this.p = location;
            this.center = Hex_1.Hex.getCenterOfHex(location.y, location.x); // flip on purpose
            util_1.defined(this.diceValue);
            util_1.defined(this.landType);
            util_1.defined(this.p);
            util_1.defined(this.center);
        }
        draw(ctx) {
            ctx.fillStyle = this.landType.getColor();
            Hex_1.Hex.fillHex(this.p.y, this.p.x, ctx);
            const relCenter = this.center.toRelPoint();
            if (this.landType != Biome_1.Desert) {
                ctx.font = "20px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "black";
                ctx.fillText(this.diceValue.toString(), relCenter.x, relCenter.y);
            }
            Hex_1.Hex.strokeHex(this.p.y, this.p.x, ctx);
        }
    }
    exports.Tile = Tile;
    Tile.diceValueChoices = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 9, 10, 10, 11, 11, 12];
});
//# sourceMappingURL=Tile.js.map