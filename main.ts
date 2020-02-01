
import { ctx, canvas } from "./graphics/Screen";
import { GameMap } from "./map/GameMap";
import { Hex } from "./graphics/Hex";

export function main() {
    var ls = new GameMap(3);
    
    ls.drawMap(ctx);
}

canvas.onmousedown = function(e: MouseEvent) {
    console.log(e.clientX, e.clientY);
}

main();

ctx.fillStyle = 'black';
Hex.fillHex(2, 2, ctx);
