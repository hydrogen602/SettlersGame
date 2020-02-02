define(["require", "exports", "./graphics/Screen", "./map/GameMap", "./graphics/Point", "./Config", "./mechanics/Player", "./mechanics/HexCorner", "./mechanics/GameManager", "./map/Road"], function (require, exports, Screen_1, GameMap_1, Point_1, Config_1, Player_1, HexCorner_1, GameManager_1, Road_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function main() {
        var m = new GameMap_1.GameMap(Config_1.Config.getN(), Screen_1.ctx);
        GameManager_1.GameManager.instance = new GameManager_1.GameManager(m, [new Player_1.Player('blue', 'Blue Team'), new Player_1.Player('green', 'Green Team')]);
        GameManager_1.GameManager.instance.draw();
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
        GameManager_1.GameManager.instance.draw();
    });
    document.onmousedown = HexCorner_1.HexCorner.mouseHandler;
    document.onmousemove = HexCorner_1.HexCorner.mouseHoverHandler;
    window.onkeypress = (e) => {
        if (e.key == 'p') {
            console.log("Debug Players:");
            GameManager_1.GameManager.instance.debugPlayers();
        }
        if (e.key == 't') {
            GameManager_1.GameManager.instance.playTurn();
        }
    };
    GameManager_1.GameManager.instance.getMap().addRoad(new Road_1.Road(new Point_1.HexPoint(2, 0), new Point_1.HexPoint(2, 1), GameManager_1.GameManager.instance.getPlayers()[0]));
    GameManager_1.GameManager.instance.getMap().addRoad(new Road_1.Road(new Point_1.HexPoint(2, 1), new Point_1.HexPoint(2, 2), GameManager_1.GameManager.instance.getPlayers()[0]));
});
// ctx.fillStyle = 'black';
// var tmp = Hex.hexGridToPx(0, 0);
// ctx.fillRect(tmp.x, tmp.y, 10, 10);
//# sourceMappingURL=main.js.map