define(["require", "exports", "../util", "../dataTypes"], function (require, exports, util_1, dataTypes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player {
        constructor(color, name) {
            this.settlements = [];
            this.roads = [];
            this.color = color;
            this.name = name;
            this.settlements = [];
            util_1.defined(color);
            util_1.defined(name);
            this.inventory = new Map();
            for (let i in dataTypes_1.ResourceType) {
                if (Number(i).toString() == "NaN" && i != dataTypes_1.ResourceType[dataTypes_1.ResourceType.NoResource]) {
                    // js is retarded    /\
                    // for thinking that ||
                    // NaN == NaN is false
                    //
                    this.inventory.set(i, 0);
                }
            }
        }
        getColor() {
            return this.color;
        }
        getName() {
            return this.name;
        }
        addSettlement(s) {
            this.settlements.push(s);
        }
        addRoad(r) {
            this.roads.push(r);
        }
        giveResource(r, amount) {
            util_1.assertInt(amount);
            const name = dataTypes_1.ResourceType[r];
            const currAmount = this.inventory.get(name);
            util_1.defined(currAmount);
            this.inventory.set(name, amount + currAmount);
        }
        debug() {
            console.log(this);
            this.settlements.forEach(e => {
                console.log("  ", e);
            });
            console.log("  Inv:", this.inventory);
        }
    }
    exports.Player = Player;
});
//# sourceMappingURL=Player.js.map