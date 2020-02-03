define(["require", "exports", "../util", "../graphics/MessageBoard", "../graphics/Point"], function (require, exports, util_1, MessageBoard_1, Point_1) {
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
            this.msgBoard = new MessageBoard_1.MessageBoard(map.getCtx(), 3);
            this.errBoard = new MessageBoard_1.MessageBoard(map.getCtx(), 1, new Point_1.RelPoint(10, 10 + 90));
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
            if (this.mayPlaceCity || this.mayPlaceRoad || this.mayPlaceSettlement) {
                this.printErr("Unplaced Infrastructure");
                return;
            }
            this.nextTurn();
            const p = this.getCurrentPlayer();
            this.msgBoard.clear();
            this.errBoard.clear();
            this.map.getTiles().forEach(t => {
                t.deactivate();
            });
            this.msgBoard.print("New turn: " + p.getName());
            if (this.rounds <= 2) {
                // game start phase
                // each player places one settlement
                this.msgBoard.print("Place a settlement");
                this.msgBoard.print("Then place a road");
                this.mayPlaceSettlement = true;
                this.mayPlaceRoad = true;
            }
            else {
                // post init
                const dieRoll = util_1.rollTwoDice();
                this.msgBoard.print("Die Rolled: " + dieRoll);
                this.map.getTiles().forEach(t => {
                    t.activateIfDiceValueMatches(dieRoll, this.map.getSettlements());
                });
                this.draw();
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
            this.map.draw_SHOULD_ONLY_BE_CALLED_BY_GAME_MANAGER();
            this.msgBoard.draw();
            this.errBoard.draw();
            this.players.forEach(p => {
                p.draw();
            });
        }
    }
    exports.GameManager = GameManager;
});
//# sourceMappingURL=GameManager.js.map