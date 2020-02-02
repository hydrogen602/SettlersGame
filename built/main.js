define(["require", "exports", "./graphics/Screen", "./map/GameMap", "./graphics/Point", "./map/Settlement", "./Config", "./mechanics/Player"], function (require, exports, Screen_1, GameMap_1, Point_1, Settlement_1, Config_1, Player_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ls;
    function main() {
        ls = new GameMap_1.GameMap(Config_1.Config.getN(), Screen_1.ctx);
        ls.drawMap();
        var lastTile = undefined;
        Screen_1.canvas.onmousemove = function (e) {
            //console.log(e.clientX, e.clientY);
            var p = new Point_1.RelPoint(e.clientX, e.clientY);
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
        };
    }
    exports.main = main;
    main();
    Screen_1.ctx.fillStyle = 'black';
    // ctx.fillRect(currLocation.x, currLocation.y, 10, 10);
    ls.addSettlement(new Settlement_1.Settlement(new Point_1.HexPoint(1, 1), new Player_1.Player('blue')));
    document.addEventListener("wheel", function (e) {
        const limit = 5;
        Point_1.currLocation.x -= Math.max(-limit, Math.min(e.deltaX, limit));
        Point_1.currLocation.y -= Math.max(-limit, Math.min(e.deltaY, limit));
        ls.drawMap();
    });
});
//# sourceMappingURL=main.js.map