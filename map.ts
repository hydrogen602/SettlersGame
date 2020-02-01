
import grid = require("./grid");
import screen = require("./screen");
import { Tile, Biomes, ResourceType } from "./dataTypes";
var ctx = screen.ctx;


class GameMap {
    sz: number;
    tilesArr: Array<Tile>;

    constructor(size: number) {
        this.sz = size;

        var nP: number = (size - 1) / 2;
        var nP2: number = (size - 2) / 2;

        var tiles = []
        
        ctx.strokeStyle = "red"
        for (var j = 0; j < size; j++) {

            var addition: number = - Math.abs(j - nP) + nP;
            
            for (var i = -addition; i < size + addition; i++) {
                tiles.push(new Tile(new grid.Point(2*j, 2*i), Biomes.Forest, 0));
            }
        }

        ctx.strokeStyle = "green"
        for (var j = 0; j < size - 1; j++) {

            var addition: number = - Math.abs(j - nP2) + nP2;

            for (var i = -addition; i <= size + addition; i++) {
                tiles.push(new Tile(new grid.Point(2*j + 1, 2*i - 1), Biomes.Quarry, 0));
            }
        }

        this.tilesArr = tiles;
    }

    drawMap(ctx: CanvasRenderingContext2D) {
        this.tilesArr.forEach(e => {
            e.strokeTile(ctx);
        });
    }
}

export function main() {
    var ls = new GameMap(3);
    
    ls.drawMap(ctx);
}
main();
