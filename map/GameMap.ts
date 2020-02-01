import { HexPoint } from "../graphics/Point";
import { Tile } from "./Tile";
import { defined } from "../util";

export class GameMap {
    private sz: number;
    private tilesArr: Array<Tile>;
    private ctx: CanvasRenderingContext2D;

    constructor(size: number, ctx: CanvasRenderingContext2D) {
        this.sz = size;
        this.ctx = ctx;

        defined(this.sz);
        defined(this.ctx);

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
    }

    getTiles() {
        return this.tilesArr;
    }

    drawMap() {
        this.tilesArr.forEach(e => {
            e.fillTile(this.ctx);
        });

        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.tilesArr.forEach(e => {
            e.strokeTile(this.ctx);
        })
    }
}
