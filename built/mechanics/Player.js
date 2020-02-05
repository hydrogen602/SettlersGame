define(["require", "exports", "../util", "../dataTypes", "../graphics/MessageBoard", "../graphics/Screen", "../graphics/Point", "./GameManager"], function (require, exports, util_1, dataTypes_1, MessageBoard_1, Screen_1, Point_1, GameManager_1) {
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
                if (Number(i).toString() != "NaN" && i != '0') { // '0' is Desert -> NoResource
                    // js is retarded    /\
                    // for thinking that ||
                    // NaN == NaN is false
                    //
                    this.inventory.set(Number(i), 0);
                }
            }
            this.invBoard = new MessageBoard_1.MessageBoard(Screen_1.ctx, 6, new Point_1.RelPoint(window.innerWidth - 250 - 5, 5 + 6 * 30 * Player.playerCount));
            Player.playerCount += 1;
            util_1.defined(this.invBoard);
            this.updateInvBoard();
        }
        getRoads() {
            return this.roads;
        }
        getSettlements() {
            return this.settlements;
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
            const currAmount = this.inventory.get(r);
            util_1.defined(currAmount);
            this.inventory.set(r, amount + currAmount);
            this.updateInvBoard();
        }
        purchaseRoad() {
            if (GameManager_1.GameManager.instance.mayPlaceRoad) {
                GameManager_1.GameManager.instance.printErr("Place road before buying another");
                return;
            }
            if (GameManager_1.GameManager.instance.getCurrentPlayer() != this) {
                throw "Not this player's turn";
            }
            // requires brick and lumber
            const brick = this.getFromInv(dataTypes_1.ResourceType.Brick);
            const lumber = this.getFromInv(dataTypes_1.ResourceType.Lumber);
            if (brick >= 1 && lumber >= 1) {
                // new road!
                this.inventory.set(dataTypes_1.ResourceType.Brick, brick - 1);
                this.inventory.set(dataTypes_1.ResourceType.Lumber, lumber - 1);
                GameManager_1.GameManager.instance.mayPlaceRoad = true;
                GameManager_1.GameManager.instance.print("Place new road");
                this.updateInvBoard();
            }
            else {
                GameManager_1.GameManager.instance.printErr("Can't afford road");
            }
        }
        purchaseCity() {
            if (GameManager_1.GameManager.instance.mayPlaceCity) {
                GameManager_1.GameManager.instance.printErr("Place city before buying another");
                return;
            }
            if (GameManager_1.GameManager.instance.getCurrentPlayer() != this) {
                throw "Not this player's turn";
            }
            // requires 3 ore and 2 wheat
            const wheat = this.getFromInv(dataTypes_1.ResourceType.Wheat);
            const ore = this.getFromInv(dataTypes_1.ResourceType.Ore);
            if (wheat >= 2 && ore >= 3) {
                // new city!
                this.inventory.set(dataTypes_1.ResourceType.Wheat, wheat - 2);
                this.inventory.set(dataTypes_1.ResourceType.Ore, ore - 3);
                GameManager_1.GameManager.instance.mayPlaceCity = true;
                GameManager_1.GameManager.instance.print("Place new city");
                this.updateInvBoard();
            }
            else {
                GameManager_1.GameManager.instance.printErr("Can't afford city");
            }
        }
        purchaseSettlement() {
            if (GameManager_1.GameManager.instance.mayPlaceSettlement) {
                GameManager_1.GameManager.instance.printErr("Place settlement before buying another");
                return;
            }
            if (GameManager_1.GameManager.instance.getCurrentPlayer() != this) {
                throw "Not this player's turn";
            }
            // requires brick and lumber
            const brick = this.getFromInv(dataTypes_1.ResourceType.Brick);
            const lumber = this.getFromInv(dataTypes_1.ResourceType.Lumber);
            const sheep = this.getFromInv(dataTypes_1.ResourceType.Sheep);
            const wheat = this.getFromInv(dataTypes_1.ResourceType.Wheat);
            if (brick >= 1 && lumber >= 1 && sheep >= 1 && wheat >= 1) {
                // new settlement!
                this.inventory.set(dataTypes_1.ResourceType.Brick, brick - 1);
                this.inventory.set(dataTypes_1.ResourceType.Lumber, lumber - 1);
                this.inventory.set(dataTypes_1.ResourceType.Sheep, sheep - 1);
                this.inventory.set(dataTypes_1.ResourceType.Wheat, wheat - 1);
                GameManager_1.GameManager.instance.mayPlaceSettlement = true;
                GameManager_1.GameManager.instance.print("Place new settlement");
                this.updateInvBoard();
            }
            else {
                GameManager_1.GameManager.instance.printErr("Can't afford settlement");
            }
        }
        getFromInv(r) {
            const x = this.inventory.get(r);
            util_1.defined(x);
            return x;
        }
        updateInvBoard() {
            this.invBoard.clear();
            this.invBoard.print(this.name);
            const iterator = this.inventory.keys();
            let k;
            while ((x => { k = x.next(); return !k.done; })(iterator)) {
                // console.log(k.value);
                this.invBoard.print(dataTypes_1.ResourceType[k.value] + ": " + this.inventory.get(k.value));
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