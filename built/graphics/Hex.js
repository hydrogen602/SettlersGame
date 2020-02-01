define(["require", "exports", "./Point"], function (require, exports, Point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hex {
        constructor() {
        }
        static getSideLength() {
            return Hex.sectionLength;
        }
        static getApothem() {
            return Hex.apothem;
        }
        static hexGridToPxUnshifted(row, col) {
            //
            //  /--\
            //  \--/
            //  
            var x = col * (Hex.sectionLength + Hex.sectionLength * Math.sin(Math.PI / 6));
            if (Math.abs(row % 2) == Math.abs(col % 2)) {
                x = x + Hex.sectionLength * Math.sin(Math.PI / 6);
            }
            // if (row == 0) { console.log(row, col); console.log(row % 2 == col % 2) }
            var hexHeight = Math.cos(Math.PI / 6) * Hex.sectionLength; // * 2;
            var y = hexHeight * row;
            return new Point_1.AbsPoint(x, y);
        }
        static hexGridToPx(row, col) {
            return Hex.hexGridToPxUnshifted(row, col).toRelPoint();
        }
        static getCenterOfHex(row, col) {
            // assuming row, col is top left corner
            var p = Hex.hexGridToPxUnshifted(row, col);
            //  /--\
            //  \--/
            p.x += Hex.sectionLength / 2;
            p.y += Hex.apothem;
            return p;
        }
        static fillHex(row, col, ctx) {
            var p = Hex.hexGridToPx(row, col);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            p = Hex.hexGridToPx(row, col + 1);
            ctx.lineTo(p.x, p.y);
            p = Hex.hexGridToPx(row + 1, col + 1);
            ctx.lineTo(p.x, p.y);
            p = Hex.hexGridToPx(row + 2, col + 1);
            ctx.lineTo(p.x, p.y);
            p = Hex.hexGridToPx(row + 2, col);
            ctx.lineTo(p.x, p.y);
            p = Hex.hexGridToPx(row + 1, col);
            ctx.lineTo(p.x, p.y);
            p = Hex.hexGridToPx(row, col);
            ctx.lineTo(p.x, p.y);
            ctx.fill();
        }
        static strokeHex(row, col, ctx) {
            var p = Hex.hexGridToPx(row, col);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            p = Hex.hexGridToPx(row, col + 1);
            ctx.lineTo(p.x, p.y);
            p = Hex.hexGridToPx(row + 1, col + 1);
            ctx.lineTo(p.x, p.y);
            p = Hex.hexGridToPx(row + 2, col + 1);
            ctx.lineTo(p.x, p.y);
            p = Hex.hexGridToPx(row + 2, col);
            ctx.lineTo(p.x, p.y);
            p = Hex.hexGridToPx(row + 1, col);
            ctx.lineTo(p.x, p.y);
            p = Hex.hexGridToPx(row, col);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
        }
    }
    exports.Hex = Hex;
    Hex.sectionLength = 50;
    //
    // apothem = s / 2 * tan(180/n)
    // where n is the number of sides (n=6)
    //
    // so apothem = s / 2 * tan(30) = s / (2 * (1 / sqrt(3)))
    // = s * sqrt(3) / 2
    //
    Hex.apothem = Hex.sectionLength * Math.sqrt(3) / 2;
});
//# sourceMappingURL=Hex.js.map