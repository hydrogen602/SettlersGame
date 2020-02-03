define(["require", "exports", "./graphics/Screen", "./map/GameMap", "./graphics/Point", "./Config", "./mechanics/Player", "./mechanics/EventManager", "./mechanics/GameManager"], function (require, exports, Screen_1, GameMap_1, Point_1, Config_1, Player_1, EventManager_1, GameManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function main() {
        const m = new GameMap_1.GameMap(Config_1.Config.getN(), Screen_1.ctx);
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
    document.onmousedown = EventManager_1.EventManager.mouseHandler;
    document.onmousemove = EventManager_1.EventManager.mouseHoverHandler;
    window.onkeypress = (e) => {
        if (e.key == 'p') {
            console.log("Debug Players:");
            GameManager_1.GameManager.instance.debugPlayers();
        }
        if (e.key == 't') {
            GameManager_1.GameManager.instance.playTurn();
        }
    };
    console.info("Starting Game");
    GameManager_1.GameManager.instance.playTurn();
});
//# sourceMappingURL=main.js.map