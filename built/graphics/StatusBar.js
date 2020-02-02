define(["require", "exports", "./Point", "../util"], function (require, exports, Point_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StatusBar {
        constructor(ctx) {
            this.pos = new Point_1.RelPoint(10, 10);
            this.sz = new Point_1.AbsPoint(250, 90);
            this.board = [];
            this.ctx = ctx;
            util_1.defined(this.ctx);
        }
        print(msg) {
            this.board.push(msg);
            if (this.board.length > 3) {
                this.board.shift();
            }
            this.draw();
        }
        clear() {
            this.board = [];
        }
        draw() {
            this.ctx.fillStyle = "white";
            this.ctx.fillRect(this.pos.x, this.pos.y, this.sz.x, this.sz.y);
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(this.pos.x, this.pos.y, this.sz.x, this.sz.y);
            if (this.board.length == 0) {
                return;
            }
            this.ctx.font = "16px Arial";
            this.ctx.textAlign = "left";
            this.ctx.textBaseline = "top";
            this.ctx.fillStyle = "black";
            for (var i = 0; i < this.board.length; i++) {
                this.ctx.fillText(this.board[i], this.pos.x + 5, this.pos.y + 10 + 26 * i);
            }
        }
    }
    exports.StatusBar = StatusBar;
});
//# sourceMappingURL=StatusBar.js.map