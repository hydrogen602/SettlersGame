
import { ctx, canvas } from "./graphics/Screen";
import { GameMap } from "./map/GameMap";
import { RelPoint, HexPoint, currLocation, maxDistance, centerOfScreen } from "./graphics/Point";
import { Tile } from "./map/Tile";
import { Settlement } from "./map/Settlement"
import { Config } from "./Config";
import { Player } from "./mechanics/Player";
import { HexCorner } from "./mechanics/HexCorner";

var ls: GameMap;
export function main() {
    ls = new GameMap(Config.getN(), ctx, [new Player('blue')]);
    
    ls.drawMap();

    var lastTile: Tile = undefined;
    canvas.onmousemove = function(e: MouseEvent) {

        //console.log(e.clientX, e.clientY);
        var p = new RelPoint(e.clientX, e.clientY);

        // var currTile = ls.getTiles().filter(e => {
        //     return (e.isInside(p.toAbsPoint()))
        // });

        // if (currTile.length && currTile[0] != lastTile) {
        //     lastTile = currTile[0];
        //     ls.drawMap();
        //     ctx.strokeStyle = 'black';
        //     ctx.lineWidth = 3;
        //     lastTile.strokeTile(ctx);
        // }
        // if (currTile.length == 0) {
        //     lastTile = undefined;
        //     ls.drawMap();
        // }
    }
}

main();

ctx.fillStyle = 'black';
// ctx.fillRect(currLocation.x, currLocation.y, 10, 10);

document.addEventListener("wheel", function (e) {
    const limit = 5;

    currLocation.x -= Math.max(-limit, Math.min(e.deltaX, limit));
    currLocation.y -= Math.max(-limit, Math.min(e.deltaY, limit));

    currLocation.x = Math.max(-maxDistance, Math.min(currLocation.x - centerOfScreen.x, maxDistance)) + centerOfScreen.x;
    currLocation.y = Math.max(-maxDistance, Math.min(currLocation.y - centerOfScreen.y, maxDistance)) + centerOfScreen.y;

    ls.drawMap();
});

document.onmousedown = HexCorner.mouseHandler;

window.onkeypress = (e: KeyboardEvent) => {
    if (e.key == 'p') {
        console.log("Debug Players:")
        ls.debugPlayers();
    }
}

// ctx.fillStyle = 'black';
// var tmp = Hex.hexGridToPx(0, 0);
// ctx.fillRect(tmp.x, tmp.y, 10, 10);

