import { HexPoint, RelPoint } from "../graphics/Point";
import { Tile } from "./Tile";
import { defined, assert } from "../util";
import { Settlement } from "./Settlement";
import { canvas } from "../graphics/Screen";
import { Player } from "../mechanics/Player";

export class GameMap {
    private sz: number;
    private tilesArr: Array<Tile>;
    private settlementsArr: Array<Settlement>;
    private ctx: CanvasRenderingContext2D;

    private players: Array<Player>;
    private indexOfCurrentPlayer = 0;

    // offset of map on screen in order to move around the map
    currLocation: RelPoint;

    constructor(size: number, ctx: CanvasRenderingContext2D, players: Array<Player>) {
        this.sz = size;
        this.ctx = ctx;
        this.players = players;

        defined(this.sz);
        defined(this.ctx);
        defined(this.players);
        assert(this.players.length > 0, "Needs at least 1 player")

        var nP: number = (size - 1) / 2;
        var nP2: number = (size - 2) / 2;

        var tiles: Array<Tile> = []
        
        for (var j = 0; j < size; j++) {

            var addition: number = - Math.abs(j - nP) + nP;
            
            for (var i = -addition; i < size + addition; i++) {
                tiles.push(new Tile(new HexPoint(2*j, 2*i)));
            }
        }

        for (var j = 0; j < size - 1; j++) {

            var addition: number = - Math.abs(j - nP2) + nP2;

            for (var i = -addition; i <= size + addition; i++) {
                tiles.push(new Tile(new HexPoint(2*j + 1, 2*i - 1)));
            }
        }

        this.tilesArr = tiles;
        defined(this.tilesArr);

        this.settlementsArr = [];
    }

    getTiles() {
        return this.tilesArr;
    }

    getSettlements() {
        return this.settlementsArr;
    }

    getPlayers() {
        return this.players;
    }

    getCurrentPlayer() {
        return this.players[this.indexOfCurrentPlayer];
    }

    nextTurn() {
        this.indexOfCurrentPlayer += 1
        if (this.indexOfCurrentPlayer >= this.players.length) {
            this.indexOfCurrentPlayer = 0;
        }
    }

    debugPlayers() {
        this.players.forEach(p => {
            p.debug();
        });
    }

    addSettlement(s: Settlement) {
        defined(s);
        this.settlementsArr.push(s);
    }

    drawMap() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        this.tilesArr.forEach(e => {
            e.fillTile(this.ctx);
        });

        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.tilesArr.forEach(e => {
            e.strokeTile(this.ctx);
        })

        this.settlementsArr.forEach(s => {
            s.draw(this.ctx);
        })
    }
}
