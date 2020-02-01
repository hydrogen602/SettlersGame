define(["require", "exports", "./graphics/Screen", "./map/GameMap", "./graphics/Point", "./Config"], function (require, exports, Screen_1, GameMap_1, Point_1, Config_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function main() {
        var ls = new GameMap_1.GameMap(Config_1.Config.getN(), Screen_1.ctx);
        ls.drawMap();
        var lastTile = undefined;
        Screen_1.canvas.onmousemove = function (e) {
            //console.log(e.clientX, e.clientY);
            var p = new Point_1.RelPoint(e.clientX, e.clientY);
            var currTile = ls.getTiles().filter(e => {
                return (e.isInside(p.toAbsPoint()));
            });
            if (currTile.length && currTile[0] != lastTile) {
                lastTile = currTile[0];
                ls.drawMap();
                Screen_1.ctx.strokeStyle = 'black';
                Screen_1.ctx.lineWidth = 3;
                lastTile.strokeTile(Screen_1.ctx);
            }
            if (currTile.length == 0) {
                lastTile = undefined;
                ls.drawMap();
            }
        };
    }
    exports.main = main;
    main();
});
// ctx.fillStyle = 'black';
// Hex.fillHex(2, 2, ctx);
//# sourceMappingURL=main.js.map