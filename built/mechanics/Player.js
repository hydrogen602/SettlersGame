define(["require", "exports", "../util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player {
        constructor(color) {
            this.color = color;
            this.settlements = [];
            util_1.defined(color);
        }
        getColor() {
            return this.color;
        }
        addSettlement(s) {
            this.settlements.push(s);
        }
        debug() {
            console.log(this);
            this.settlements.forEach(e => {
                console.log("  ", e);
            });
        }
    }
    exports.Player = Player;
});
//# sourceMappingURL=Player.js.map