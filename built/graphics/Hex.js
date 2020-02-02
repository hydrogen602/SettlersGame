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
        static pxUnshiftedToHexGrid(x, y) {
            var row = Math.round(y / Hex.apothem);
            // x has to be unshifted
            var col = x / (Hex.sectionLength * 1.5);
            // col = col - (1/6); // (1/3) * (1/2); offset is 0 or 1/3, so subtract middle and round
            // return new HexPoint(Math.round(col), Math.round(row));
            // new approach -> look for which one is closer
            var colR = Math.ceil(col);
            var colL = Math.floor(col);
            var pR = Hex.hexGridToPxUnshifted(row, colR).x;
            var pL = Hex.hexGridToPxUnshifted(row, colL).x;
            if (Math.abs(x - pR) < Math.abs(x - pL)) {
                // closer to right point than left
                return new Point_1.HexPoint(colR, row);
            }
            else {
                return new Point_1.HexPoint(colL, row);
            }
        }
        static pxUnshiftedToDualHexGrid(x, y) {
            var row = Math.round(y / Hex.apothem);
            // x has to be unshifted
            var col = x / (Hex.sectionLength * 1.5);
            var colR = Math.ceil(col);
            var colL = Math.floor(col);
            var rowErr = Math.abs((y / Hex.apothem) % 1);
            if (rowErr < 0.15 || rowErr > 0.85) {
                // horizontal mode
                var p1 = new Point_1.HexPoint(colL, row);
                var p2 = new Point_1.HexPoint(colR, row);
                if (p1.isNeighbor(p2)) {
                    return [p1, p2];
                }
                else {
                    return [];
                }
            }
            else if ((col % 1) > 0 && (col % 1) < 1 / 3) {
                // check for sloped lines
                var rowTop = Math.floor(y / Hex.apothem);
                var rowBottom = Math.ceil(y / Hex.apothem);
                var col = Hex.pxUnshiftedToHexGrid(x, y).x;
                var p1 = new Point_1.HexPoint(col, rowTop);
                var p2 = new Point_1.HexPoint(col, rowBottom);
                if (p1.isNeighbor(p2)) {
                    return [p1, p2];
                }
                else {
                    return [];
                }
            }
            return [];
        }
        static hexGridToPxUnshifted(row, col) {
            //
            //  /--\
            //  \--/
            //  
            // var x = col * (Hex.sectionLength + Hex.sectionLength * Math.sin(Math.PI/6));
            // Math.sin(Math.PI / 6) == 0.5 so...
            var x = col * Hex.sectionLength * 1.5;
            if (Math.abs(row % 2) == Math.abs(col % 2)) {
                x = x + Hex.sectionLength * 0.5; //Math.sin(Math.PI/6);
            }
            var y = Hex.apothem * row;
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