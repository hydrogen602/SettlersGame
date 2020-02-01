
import { ctx, canvas } from "./graphics/Screen";
import { GameMap } from "./map/GameMap";
import { RelPoint } from "./graphics/Point";
import { Tile } from "./map/Tile";

export function main() {
    var ls = new GameMap(3, ctx);
    
    ls.drawMap();

    var lastTile: Tile = undefined;
    canvas.onmousemove = function(e: MouseEvent) {

        //console.log(e.clientX, e.clientY);
        var p = new RelPoint(e.clientX, e.clientY);

        var currTile = ls.getTiles().filter(e => {
            return (e.isInside(p.toAbsPoint()))
        });

        if (currTile.length && currTile[0] != lastTile) {
            lastTile = currTile[0];
            ls.drawMap();
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            lastTile.strokeTile(ctx);
        }
        if (currTile.length == 0) {
            lastTile = undefined;
            ls.drawMap();
        }
    }
}



main();

// ctx.fillStyle = 'black';
// Hex.fillHex(2, 2, ctx);
