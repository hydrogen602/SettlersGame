import { Player } from "./Player";
import { GameMap } from "../map/GameMap";
import { defined, assert, rollTwoDice } from "../util";
import { MessageBoard } from "../graphics/MessageBoard";
import { RelPoint } from "../graphics/Point";

export class GameManager {

    private players: Array<Player>;
    private indexOfCurrentPlayer = -1; // -1 cause first thing 1 is added
    private map: GameMap;
    private rounds: number = 1;
    private msgBoard: MessageBoard;
    private errBoard: MessageBoard;

    static instance: GameManager;

    // game states
    mayPlaceSettlement = false;
    mayPlaceCity = false;
    mayPlaceRoad = false;

    constructor(map: GameMap, players: Array<Player>) {
        this.map = map;
        this.players = players;
        this.msgBoard = new MessageBoard(map.getCtx(), 3);
        this.errBoard = new MessageBoard(map.getCtx(), 1, new RelPoint(10, 10 + 90));

        this.msgBoard.print("Press t for next turn");

        defined(this.map);
        defined(this.players);
        assert(this.players.length > 0, "Needs at least 1 player");
        defined(this.msgBoard);
    }

    getPlayers() {
        return this.players;
    }

    getMap() {
        return this.map;
    }

    getCurrentPlayer() {
        defined(this.players[this.indexOfCurrentPlayer]);
        return this.players[this.indexOfCurrentPlayer];
    }

    isEarlyRound(): boolean {
        return this.rounds <= 2; // first two rounds are special initialization rounds
    }

    private nextTurn() {
        this.indexOfCurrentPlayer += 1
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
        if (this.isEarlyRound()) {
            // game start phase
            // each player places one settlement

            this.msgBoard.print("Place a settlement");
            this.msgBoard.print("Then place a road");

            this.mayPlaceSettlement = true;
            this.mayPlaceRoad = true;
        }
        else {
            // post init
            const dieRoll = rollTwoDice();
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

    print(msg: string) {
        this.msgBoard.print(msg);
        this.errBoard.clear();
    }

    printErr(msg: string) {
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
