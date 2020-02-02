
import { ctx, canvas } from "./graphics/Screen";
import { GameMap } from "./map/GameMap";
import { RelPoint, currLocation, HexPoint } from "./graphics/Point";
import { Tile } from "./map/Tile";
import { Settlement } from "./map/Settlement"
import { Config } from "./Config";
import { Player } from "./mechanics/Player";

var ls: GameMap;
export function main() {
    ls = new GameMap(Config.getN(), ctx);
    
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

ctx.fillStyle = 'black';
// ctx.fillRect(currLocation.x, currLocation.y, 10, 10);

ls.addSettlement(new Settlement(new HexPoint(1, 1), new Player('blue')));
