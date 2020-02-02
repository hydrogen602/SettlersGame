import { Player } from "./Player";
import { GameMap } from "../map/GameMap";
import { defined, assert } from "../util";
import { StatusBar } from "../graphics/StatusBar";
import { RelPoint } from "../graphics/Point";

export class GameManager {

    private players: Array<Player>;
    private indexOfCurrentPlayer = -1; // -1 cause first thing 1 is added
    private map: GameMap;
    private rounds: number = 1;
    private msgBoard: StatusBar;
    private errBoard: StatusBar;

    static instance: GameManager;

    // game states
    mayPlaceSettlement = false;
    mayPlaceCity = false;
    mayPlaceRoad = false;

    constructor(map: GameMap, players: Array<Player>) {
        this.map = map;
        this.players = players;
        this.msgBoard = new StatusBar(map.getCtx(), 3);
        this.errBoard = new StatusBar(map.getCtx(), 1, new RelPoint(10, 10 + 90));

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

    private nextTurn() {
        this.indexOfCurrentPlayer += 1
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

    print(msg: string) {
        this.msgBoard.print(msg);
        this.errBoard.clear();
    }

    printErr(msg: string) {
        this.errBoard.print(msg);
    }

    draw() {
        this.map.draw();
        this.msgBoard.draw();
        this.errBoard.draw();
    }

}
