
import { ctx, canvas } from "./screen";
import { GameMap } from "./map/GameMap";
import { fillHex } from "./grid";

export function main() {
    //var ls = new GameMap(3);
    
    //ls.drawMap(ctx);
}

canvas.onmousemove = function(e: MouseEvent) {
    console.log(e.clientX, e.clientY);
}

fillHex(2, 2, ctx);

main();
