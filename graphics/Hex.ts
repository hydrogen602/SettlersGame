import { Point, currLocation } from "./Point";

export class Hex {

    private static sectionLength: number = 50

    private constructor() {}

    static hexGridToPx(row: number, col: number): Point {
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
    
        return new Point(x + currLocation.x, y + currLocation.y);
    }

    static fillHex(row: number, col: number, ctx: CanvasRenderingContext2D) {
        var p = Hex.hexGridToPx(row, col);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        if (row == -1) {
            console.log(p)
        }

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
        if (row == -1) { console.log(p) }

    
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