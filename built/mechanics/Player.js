define(["require", "exports", "../util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player {
        constructor(color) {
            this.color = color;
            util_1.defined(color);
        }
        getColor() {
            return this.color;
        }
    }
    exports.Player = Player;
});
//# sourceMappingURL=Player.js.map