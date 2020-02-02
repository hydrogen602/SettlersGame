define(["require", "exports", "./graphics/Screen", "./map/GameMap", "./graphics/Point", "./Config", "./mechanics/Player", "./mechanics/HexCorner", "./mechanics/GameManager"], function (require, exports, Screen_1, GameMap_1, Point_1, Config_1, Player_1, HexCorner_1, GameManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var g;
    function main() {
        var m = new GameMap_1.GameMap(Config_1.Config.getN(), Screen_1.ctx);
        g = new GameManager_1.GameManager(m, [new Player_1.Player('blue', 'Blue Team'), new Player_1.Player('green', 'Green Team')]);
        m.drawMap();
    }
    exports.main = main;
    main();
    Screen_1.ctx.fillStyle = 'black';
    // ctx.fillRect(currLocation.x, currLocation.y, 10, 10);
    document.addEventListener("wheel", function (e) {
        const limit = 5;
        Point_1.currLocation.x -= Math.max(-limit, Math.min(e.deltaX, limit));
        Point_1.currLocation.y -= Math.max(-limit, Math.min(e.deltaY, limit));
        Point_1.currLocation.x = Math.max(-Point_1.maxDistance, Math.min(Point_1.currLocation.x - Point_1.centerOfScreen.x, Point_1.maxDistance)) + Point_1.centerOfScreen.x;
        Point_1.currLocation.y = Math.max(-Point_1.maxDistance, Math.min(Point_1.currLocation.y - Point_1.centerOfScreen.y, Point_1.maxDistance)) + Point_1.centerOfScreen.y;
        g.drawMap();
    });
    document.onmousedown = HexCorner_1.HexCorner.mouseHandler;
    window.onkeypress = (e) => {
        if (e.key == 'p') {
            console.log("Debug Players:");
            g.debugPlayers();
        }
        if (e.key == 't') {
            g.playTurn();
        }
    };
});
// ctx.fillStyle = 'black';
// var tmp = Hex.hexGridToPx(0, 0);
// ctx.fillRect(tmp.x, tmp.y, 10, 10);
//# sourceMappingURL=Main.js.map