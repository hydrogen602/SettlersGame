define(["require", "exports", "../util", "../dataTypes", "../graphics/MessageBoard", "../graphics/Screen", "../graphics/Point", "./GameManager", "./Inventory"], function (require, exports, util_1, dataTypes_1, MessageBoard_1, Screen_1, Point_1, GameManager_1, Inventory_1) {
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
            this.inventory = new Inventory_1.Inventory();
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
            this.inventory.update(r, amount);
            this.updateInvBoard();
        }
        genericTrade(toPlayer, n, fromPlayer, m) {
            util_1.assertInt(n);
            util_1.assertInt(m);
            if (this.inventory.hasEnough(fromPlayer, m)) {
                // trade !!
                this.inventory.update(fromPlayer, -m);
                this.inventory.update(toPlayer, n);
                return true;
            }
            else {
                return false; // trade failed cause not enough resources
            }
        }
        bankTrade(toPlayer, fromPlayer) {
            return this.genericTrade(toPlayer, 1, fromPlayer, 4);
        }
        purchaseRoad() {
            if (GameManager_1.GameManager.instance.mayPlaceRoad) {
                GameManager_1.GameManager.instance.printErr("Place road before buying another");
                return;
            }
            if (GameManager_1.GameManager.instance.getCurrentPlayer() != this) {
                throw "Not this player's turn";
            }
            if (this.inventory.purchase([dataTypes_1.ResourceType.Brick, dataTypes_1.ResourceType.Lumber], [1, 1])) {
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
            if (this.inventory.purchase([dataTypes_1.ResourceType.Wheat, dataTypes_1.ResourceType.Ore], [2, 3])) {
                // new city!
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
            if (this.inventory.purchase([dataTypes_1.ResourceType.Brick, dataTypes_1.ResourceType.Lumber, dataTypes_1.ResourceType.Sheep, dataTypes_1.ResourceType.Wheat], [1, 1, 1, 1])) {
                // new settlement!
                GameManager_1.GameManager.instance.mayPlaceSettlement = true;
                GameManager_1.GameManager.instance.print("Place new settlement");
                this.updateInvBoard();
            }
            else {
                GameManager_1.GameManager.instance.printErr("Can't afford settlement");
            }
        }
        updateInvBoard() {
            this.invBoard.clear();
            this.invBoard.print(this.name);
            for (const k of this.inventory.keys()) {
                this.invBoard.print(dataTypes_1.ResourceType[k] + ": " + this.inventory.get(k));
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