
import { ctx, canvas } from "./graphics/Screen";
import { GameMap } from "./map/GameMap";
import { currLocation, maxDistance, centerOfScreen } from "./graphics/Point";
import { Config } from "./Config";
import { Player } from "./mechanics/Player";
import { HexCorner } from "./mechanics/HexCorner";
import { GameManager } from "./mechanics/GameManager";

export function main() {
    var m = new GameMap(Config.getN(), ctx);

    GameManager.instance = new GameManager(m, [new Player('blue', 'Blue Team'), new Player('green', 'Green Team')]);
    
    m.drawMap();
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

    GameManager.instance.drawMap();
});

document.onmousedown = HexCorner.mouseHandler;

window.onkeypress = (e: KeyboardEvent) => {
    if (e.key == 'p') {
        console.log("Debug Players:")
        GameManager.instance.debugPlayers();
    }
    if (e.key == 't') {
        GameManager.instance.playTurn();
    }
}

// ctx.fillStyle = 'black';
// var tmp = Hex.hexGridToPx(0, 0);
// ctx.fillRect(tmp.x, tmp.y, 10, 10);

