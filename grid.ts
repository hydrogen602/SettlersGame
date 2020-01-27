
const sectionLength: number = 50

function Point(x: number, y: number) {
    var ob = Object()
    ob.x = x;
    ob.y = y;
    return ob
}

function hexGridToPx(row: number, col: number) {
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

    return Point(x, y);
}

function drawHex(row: number, col: number, ctx: CanvasRenderingContext2D) {
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

    p = hexGridToPx(row + 1, col - 1);
    ctx.lineTo(p.x, p.y);

    p = hexGridToPx(row, col);
    ctx.lineTo(p.x, p.y);

    ctx.fill()
}

