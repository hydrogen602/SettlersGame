define(["require", "exports", "../util", "../dataTypes", "../graphics/StatusBar", "../graphics/Screen", "../graphics/Point"], function (require, exports, util_1, dataTypes_1, StatusBar_1, Screen_1, Point_1) {
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
            this.invBoard = new StatusBar_1.StatusBar(Screen_1.ctx, 6, new Point_1.RelPoint(window.innerWidth - 250 - 5, 5 + 6 * 30 * Player.playerCount));
            Player.playerCount += 1;
            util_1.defined(this.invBoard);
            this.updateInvBoard();
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
            this.updateInvBoard();
        }
        updateInvBoard() {
            this.invBoard.clear();
            this.invBoard.print(this.name);
            const iterator = this.inventory.keys();
            let k;
            while ((x => { k = x.next(); return !k.done; })(iterator)) {
                console.log(k.value);
                this.invBoard.print(k.value + ": " + this.inventory.get(k.value));
            }
        }
        draw() {
            this.invBoard.draw();
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
    Player.playerCount = 0;
});
//# sourceMappingURL=Player.js.map