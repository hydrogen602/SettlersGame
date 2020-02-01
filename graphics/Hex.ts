import { currLocation, RelPoint, AbsPoint } from "./Point";

export class Hex {

    private static sectionLength: number = 50

    static getSideLength() {
        return Hex.sectionLength;
    }

    //
    // apothem = s / 2 * tan(180/n)
    // where n is the number of sides (n=6)
    //
    // so apothem = s / 2 * tan(30) = s / (2 * (1 / sqrt(3)))
    // = s * sqrt(3) / 2
    //
    private static apothem: number = Hex.sectionLength * Math.sqrt(3) / 2;

    static getApothem() {
        return Hex.apothem;
    }

    private constructor() {}

    static hexGridToPxUnshifted(row: number, col: number): AbsPoint {
        //
        //  /--\
        //  \--/
        //  
        var x = col * (Hex.sectionLength + Hex.sectionLength * Math.sin(Math.PI/6));
    
        if (Math.abs(row % 2) == Math.abs(col % 2)) {
            x = x + Hex.sectionLength * Math.sin(Math.PI/6);
        }

        // if (row == 0) { console.log(row, col); console.log(row % 2 == col % 2) }
    
        var hexHeight = Math.cos(Math.PI/6) * Hex.sectionLength; // * 2;
    
        var y = hexHeight * row;
    
        return new AbsPoint(x, y);
    }

    static hexGridToPx(row: number, col: number): RelPoint {    
        return Hex.hexGridToPxUnshifted(row, col).toRelPoint();
    }

    static getCenterOfHex(row: number, col: number) {
        // assuming row, col is top left corner
        var p = Hex.hexGridToPxUnshifted(row, col);
        //  /--\
        //  \--/
        p.x += Hex.sectionLength / 2;
        p.y += Hex.apothem;
        return p;
    }

    static fillHex(row: number, col: number, ctx: CanvasRenderingContext2D) {
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
    
        ctx.fill()
    }
    
    static strokeHex(row: number, col: number, ctx: CanvasRenderingContext2D) {
        var p = Hex.hexGridToPx(row, col)
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
    
        ctx.stroke()
    }

}