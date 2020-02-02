define(["require", "exports", "../util", "../graphics/StatusBar", "../graphics/Point"], function (require, exports, util_1, StatusBar_1, Point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameManager {
        constructor(map, players) {
            this.indexOfCurrentPlayer = -1; // -1 cause first thing 1 is added
            this.rounds = 1;
            // game states
            this.mayPlaceSettlement = false;
            this.mayPlaceCity = false;
            this.mayPlaceRoad = false;
            this.map = map;
            this.players = players;
            this.msgBoard = new StatusBar_1.StatusBar(map.getCtx(), 3);
            this.errBoard = new StatusBar_1.StatusBar(map.getCtx(), 1, new Point_1.RelPoint(10, 10 + 90));
            this.msgBoard.print("Press t for next turn");
            util_1.defined(this.map);
            util_1.defined(this.players);
            util_1.assert(this.players.length > 0, "Needs at least 1 player");
            util_1.defined(this.msgBoard);
        }
        getPlayers() {
            return this.players;
        }
        getMap() {
            return this.map;
        }
        getCurrentPlayer() {
            util_1.defined(this.players[this.indexOfCurrentPlayer]);
            return this.players[this.indexOfCurrentPlayer];
        }
        nextTurn() {
            this.indexOfCurrentPlayer += 1;
            if (this.indexOfCurrentPlayer >= this.players.length) {
                this.indexOfCurrentPlayer = 0;
                this.rounds += 1;
            }
        }
        playTurn() {
            this.nextTurn();
            const p = this.getCurrentPlayer();
            this.msgBoard.clear();
            this.errBoard.clear();
            this.msgBoard.print("New turn: " + p.getName());
            if (this.rounds <= 2) {
                // game start phase
                // each player places one settlement
                this.msgBoard.print("Place a settlement");
                this.msgBoard.print("Then place a road");
                this.mayPlaceSettlement = true;
                this.mayPlaceRoad = true;
            }
        }
        debugPlayers() {
            this.players.forEach(p => {
                p.debug();
            });
        }
        print(msg) {
            this.msgBoard.print(msg);
            this.errBoard.clear();
        }
        printErr(msg) {
            this.errBoard.print(msg);
        }
        draw() {
            this.map.draw();
            this.msgBoard.draw();
            this.errBoard.draw();
        }
    }
    exports.GameManager = GameManager;
});
//# sourceMappingURL=GameManager.js.map