define(["require", "exports", "./Point"], function (require, exports, Point_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hex {
        constructor() { }
        static getSideLength() {
            return Hex.sectionLength;
        }
        static getApothem() {
            return Hex.apothem;
        }
        static pxUnshiftedToHexGrid(x, y) {
            const row = Math.round(y / Hex.apothem);
            // x has to be unshifted
            const col = x / (Hex.sectionLength * 1.5);
            // col = col - (1/6); // (1/3) * (1/2); offset is 0 or 1/3, so subtract middle and round
            // return new HexPoint(Math.round(col), Math.round(row));
            // new approach -> look for which one is closer
            const colR = Math.ceil(col);
            const colL = Math.floor(col);
            const pR = Hex.hexGridToPxUnshifted(row, colR).x;
            const pL = Hex.hexGridToPxUnshifted(row, colL).x;
            if (Math.abs(x - pR) < Math.abs(x - pL)) {
                // closer to right point than left
                return new Point_1.HexPoint(colR, row);
            }
            else {
                return new Point_1.HexPoint(colL, row);
            }
        }
        static pxUnshiftedToDualHexGrid(x, y) {
            const row = Math.round(y / Hex.apothem);
            // x has to be unshifted
            const col = x / (Hex.sectionLength * 1.5);
            const colR = Math.ceil(col);
            const colL = Math.floor(col);
            const rowErr = Math.abs((y / Hex.apothem) % 1);
            if (rowErr < 0.15 || rowErr > 0.85) {
                // horizontal mode
                const p1 = new Point_1.HexPoint(colL, row);
                const p2 = new Point_1.HexPoint(colR, row);
                if (p1.isNeighbor(p2)) {
                    return [p1, p2];
                }
                else {
                    return [];
                }
            }
            else if ((col % 1) > 0 && (col % 1) < 1 / 3) {
                // check for sloped lines
                const rowTop = Math.floor(y / Hex.apothem);
                const rowBottom = Math.ceil(y / Hex.apothem);
                let col = Hex.pxUnshiftedToHexGrid(x, y).x;
                const p1 = new Point_1.HexPoint(col, rowTop);
                const p2 = new Point_1.HexPoint(col, rowBottom);
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
            // let x = col * (Hex.sectionLength + Hex.sectionLength * Math.sin(Math.PI/6));
            // Math.sin(Math.PI / 6) == 0.5 so...
            let x = col * Hex.sectionLength * 1.5;
            if (Math.abs(row % 2) == Math.abs(col % 2)) {
                x = x + Hex.sectionLength * 0.5; //Math.sin(Math.PI/6);
            }
            const y = Hex.apothem * row;
            return new Point_1.AbsPoint(x, y);
        }
        static hexGridToPx(row, col) {
            return Hex.hexGridToPxUnshifted(row, col).toRelPoint();
        }
        static getCenterOfHex(row, col) {
            // assuming row, col is top left corner
            const p = Hex.hexGridToPxUnshifted(row, col);
            //  /--\
            //  \--/
            p.x += Hex.sectionLength / 2;
            p.y += Hex.apothem;
            return p;
        }
        static getHexCorners(row, col) {
            return [
                new Point_1.HexPoint(col, row),
                new Point_1.HexPoint(col + 1, row),
                new Point_1.HexPoint(col + 1, row + 1),
                new Point_1.HexPoint(col + 1, row + 2),
                new Point_1.HexPoint(col, row + 2),
                new Point_1.HexPoint(col, row + 1)
            ];
        }
        static fillHex(row, col, ctx) {
            let p = Hex.hexGridToPx(row, col);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            // const ls = this.getHexCorners(row, col);
            // ls.forEach(p => {
            //     var tmp = p.toRelPoint();
            //     ctx.lineTo(tmp.x, tmp.y);
            // });
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
            let p = Hex.hexGridToPx(row, col);
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