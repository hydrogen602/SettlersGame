
import grid = require("./grid");
import screen = require("./screen");
var ctx = screen.ctx;

//import { strokeHex } from "./grid"
//import { ctx } from "./screen"

function strokeMap(n: number, ctx: CanvasRenderingContext2D) {
    var x = 4;
    var y = 4;

    // assume n = 3
    n = 4;

    var nP: number = (n - 1) / 2;
    var nP2: number = (n - 2) / 2;
    
    ctx.strokeStyle = "red"
    for (var j = 0; j < n; j++) {

        var addition: number = - Math.abs(j - nP) + nP;
        
        for (var i = -addition; i < n + addition; i++) {
            grid.strokeHex(2*i + y, 2*j + x, ctx);
        }
    }

    ctx.strokeStyle = "green"
    for (var j = 0; j < n - 1; j++) {

        var addition: number = - Math.abs(j - nP2) + nP2;
        console.log(j);
        for (var i = -addition; i <= n + addition; i++) {
            grid.strokeHex(2*i - 1 + y, 2*j + 1 + x, ctx);
        }
    }


    
}

export function main() {
    strokeMap(3, ctx);
    //ctx.fillStyle = 'rgb(255, 0, 0)'
    //grid.strokeHex(1, 4, ctx);
    
}
main();