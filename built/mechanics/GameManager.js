define(["require", "exports", "../util"], function (require, exports, util_1) {
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
            util_1.defined(this.map);
            util_1.defined(this.players);
            util_1.assert(this.players.length > 0, "Needs at least 1 player");
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
            console.info("New turn: ", p.getName());
            if (this.rounds <= 2) {
                // game start phase
                // each player places one settlement
                console.info("Place a settlement");
                this.mayPlaceSettlement = true;
            }
        }
        debugPlayers() {
            this.players.forEach(p => {
                p.debug();
            });
        }
        drawMap() {
            this.map.drawMap();
        }
    }
    exports.GameManager = GameManager;
});
//# sourceMappingURL=GameManager.js.map