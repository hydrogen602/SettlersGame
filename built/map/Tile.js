define(["require", "exports", "./Biome", "../util", "../graphics/Hex", "../Config"], function (require, exports, Biome_1, util_1, Hex_1, Config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Tile {
        constructor(location, landType, diceValue) {
            this.active = false; // whether this round's die roll matches this tile
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
                if (Config_1.Config.getN() == 3) {
                    this.diceValue = Tile.localDiceValueChoices.pop();
                }
                else {
                    this.diceValue = Tile.diceValueChoices[util_1.randomInt(19)];
                }
            }
            if (landType) {
                this.landType = landType;
            }
            else {
                if (Config_1.Config.getN() == 3) {
                    this.landType = Tile.localBiomeDistributionArray.pop();
                }
                else {
                    this.landType = Biome_1.biomeDistributionArray[util_1.randomInt(19)];
                }
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
        static shuffle() {
            Tile.localDiceValueChoices = util_1.shuffle(Tile.localDiceValueChoices);
            Tile.localBiomeDistributionArray = util_1.shuffle(Tile.localBiomeDistributionArray);
        }
        getDiceValue() {
            return this.diceValue;
        }
        activateIfDiceValueMatches(value, settlements) {
            util_1.assertInt(value);
            if (value == this.diceValue) {
                this.active = true;
                // find neighboring settlements and award resource
                Hex_1.Hex.getHexCorners(this.p.y, this.p.x).forEach(c => {
                    settlements.forEach(s => {
                        if (s.isHere(c)) {
                            s.production(this.landType.getResourceType());
                        }
                    });
                });
            }
        }
        deactivate() {
            this.active = false;
        }
        highlightIfActive(ctx) {
            if (this.active) {
                ctx.strokeStyle = "white";
                ctx.lineWidth = 4;
                Hex_1.Hex.strokeHex(this.p.y, this.p.x, ctx);
            }
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
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            Hex_1.Hex.strokeHex(this.p.y, this.p.x, ctx);
        }
    }
    exports.Tile = Tile;
    Tile.diceValueChoices = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 9, 10, 10, 11, 11, 12];
    Tile.localBiomeDistributionArray = Biome_1.biomeDistributionArray.slice();
    Tile.localDiceValueChoices = Tile.diceValueChoices.slice();
});
//# sourceMappingURL=Tile.js.map