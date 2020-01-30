
const sectionLength: number = 50

export var x: number = 4;
export var y: number = 4;

export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

function hexGridToPx(row: number, col: number): Point {
    //  
    //  /--\
    //  \--/
    //  
    var x = col * (sectionLength + sectionLength * Math.sin(Math.PI/6));

    if (row % 2 == col % 2) {
        x = x + sectionLength * Math.sin(Math.PI/6);
    }

    var hexHeight = Math.cos(Math.PI/6) * sectionLength; // * 2;

    var y = hexHeight * row;

    return new Point(x, y);
}

export function drawHex(row: number, col: number, ctx: CanvasRenderingContext2D) {
    var p = hexGridToPx(row, col);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);

    p = hexGridToPx(row, col + 1);
    ctx.lineTo(p.x, p.y);

    p = hexGridToPx(row + 1, col + 1);
    ctx.lineTo(p.x, p.y);

    p = hexGridToPx(row + 2, col + 1);
    ctx.lineTo(p.x, p.y);

    p = hexGridToPx(row + 2, col);
    ctx.lineTo(p.x, p.y);

    p = hexGridToPx(row + 1, col);
    ctx.lineTo(p.x, p.y);

    p = hexGridToPx(row, col);
    ctx.lineTo(p.x, p.y);

    ctx.fill()
}

export function strokeHex(row: number, col: number, ctx: CanvasRenderingContext2D) {
    var p = hexGridToPx(row, col)
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);

    p = hexGridToPx(row, col + 1);
    ctx.lineTo(p.x, p.y);

    p = hexGridToPx(row + 1, col + 1);
    ctx.lineTo(p.x, p.y);

    p = hexGridToPx(row + 2, col + 1);
    ctx.lineTo(p.x, p.y);

    p = hexGridToPx(row + 2, col);
    ctx.lineTo(p.x, p.y);

    p = hexGridToPx(row + 1, col);
    ctx.lineTo(p.x, p.y);

    p = hexGridToPx(row, col);
    ctx.lineTo(p.x, p.y);

    ctx.stroke()
}

