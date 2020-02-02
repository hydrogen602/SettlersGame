define(["require", "exports", "../util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player {
        constructor(color, name) {
            this.color = color;
            this.name = name;
            this.settlements = [];
            util_1.defined(color);
            util_1.defined(name);
        }
        getColor() {
            return this.color;
        }
        getName() {
            return this.name;
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